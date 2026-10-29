import base64
import json
import os
import re
import time
from urllib.parse import urlparse

import requests

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN") or os.getenv("MY_GHP_TOKEN")
MODELS_TOKEN = os.getenv("MODELS_TOKEN") or GITHUB_TOKEN
AI_MODEL = os.getenv("AI_MODEL", "openai/gpt-4o-mini")
UPDATE_EXISTING = os.getenv("UPDATE_EXISTING", "false").lower() == "true"
INCLUDE_PRIVATE = os.getenv("INCLUDE_PRIVATE", "false").lower() == "true"
MAX_NEW_PROJECTS = int(os.getenv("MAX_NEW_PROJECTS", "5"))
GITHUB_OWNER = os.getenv("GITHUB_REPOSITORY_OWNER", "dcuevasa")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECTS_JSON_PATH = os.path.join(BASE_DIR, "src", "components", "projects.json")
I18N_JS_PATH = os.path.join(BASE_DIR, "src", "i18n.js")
EXPORT_JSON_PATH = os.path.join(BASE_DIR, "github_export_with_readmes.json")

VALID_AREAS = ["robotics", "ai", "mobile", "others"]
VALID_RESEARCH_LINES = [
    "social_robotics",
    "embodied_agentic_ai",
    "vlas_and_acts",
    "nlp",
    "vision",
    "simulation",
    "others",
]
LOCAL_IMAGE_KEYS = [
    "imgRoboCupTeam",
    "freeBird",
    "NLP",
    "pepperListen",
    "pepperController",
    "sustaniU",
    "serviceFinder",
    "geomagicTouch",
    "pepperNavigation",
]

EXCLUDED_NAMES = {
    "-",
    ".",
    "dcuevasa",
    "dcuevasa.github.io",
    "github-exporter",
}

COURSEWORK_PATTERNS = re.compile(
    r"^(caso|taller|lab|infracomp|dalgo|isis\d+|hw|tarea|parcial|test|exam|ejercicio|tutorial)",
    re.IGNORECASE,
)

DATA_OR_DUMP_NAMES = {
    "imagenes",
    "datos",
    "dataset",
    "datasets",
    "measurements",
    "places",
    "assets",
}


def get_github_headers(token):
    headers = {
        "Accept": "application/vnd.github+json",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def normalize_github_url(url):
    if not url:
        return ""
    cleaned = url.strip().rstrip("/")
    if cleaned.endswith(".git"):
        cleaned = cleaned[:-4]
    return cleaned.lower()


def get_all_repos():
    """Fetch all repositories for the authenticated user, with fallback to public user/org repos."""
    headers = get_github_headers(GITHUB_TOKEN)
    repos = []
    page = 1

    while True:
        url = (
            f"https://api.github.com/user/repos"
            f"?per_page=100&page={page}&affiliation=owner,collaborator&sort=updated"
        )
        response = requests.get(url, headers=headers, timeout=30)

        if response.status_code != 200:
            if page == 1:
                print(
                    f"Authenticated /user/repos returned {response.status_code}. "
                    f"Falling back to public repositories for {GITHUB_OWNER}..."
                )
                return get_public_repos_fallback(headers)
            break

        data = response.json()
        if not data:
            break

        repos.extend(data)
        page += 1

    return repos


def get_public_repos_fallback(headers):
    """Fallback when using a repository-scoped token instead of a PAT."""
    repos_by_full_name = {}
    owners = [
        GITHUB_OWNER,
        "SinfonIAUniandes",
        "Oasis-Uniandes",
        "Ai-For-Good-Bogota",
        "imagine-uniandes",
        "ComitNetLab",
    ]
    for owner in owners:
        page = 1
        while True:
            url = f"https://api.github.com/users/{owner}/repos?per_page=100&page={page}&sort=updated"
            response = requests.get(url, headers=headers, timeout=30)
            if response.status_code != 200:
                break
            data = response.json()
            if not data:
                break
            for repo in data:
                if owner.lower() == GITHUB_OWNER.lower() or not repo.get("fork"):
                    repos_by_full_name[repo["full_name"].lower()] = repo
            page += 1

    return list(repos_by_full_name.values())


def get_repository_readme(owner, repo_name):
    """Fetch and decode the README content for a repository."""
    url = f"https://api.github.com/repos/{owner}/{repo_name}/readme"
    response = requests.get(url, headers=get_github_headers(GITHUB_TOKEN), timeout=30)

    if response.status_code == 404:
        return None

    if response.status_code != 200:
        return None

    payload = response.json()
    content = payload.get("content")
    if not content:
        return None

    try:
        return base64.b64decode(content).decode("utf-8")
    except (ValueError, UnicodeDecodeError):
        return None


def extract_readme_images(readme_text, owner, repo_name, default_branch="main"):
    """Extract non-badge image URLs from README markdown or HTML."""
    if not readme_text:
        return []

    candidates = []
    md_images = re.findall(r"!\[[^\]]*\]\(([^)\s]+)(?:\s+[\"'][^\"']*[\"'])?\)", readme_text)
    html_images = re.findall(r"<img[^>]+src=[\"']([^\"']+)[\"']", readme_text, flags=re.IGNORECASE)

    for raw_url in md_images + html_images:
        url = raw_url.strip()
        if not url or url.startswith("data:"):
            continue

        lower_url = url.lower()
        if any(
            badge in lower_url
            for badge in [
                "shields.io",
                "badge",
                "travis-ci",
                "codecov.io",
                "coveralls.io",
                "github.com/workflows",
                "actions/workflows",
            ]
        ):
            continue

        if url.startswith("http://") or url.startswith("https://"):
            blob_match = re.match(
                r"^https?://github\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)$", url
            )
            if blob_match:
                b_owner, b_repo, b_branch, b_path = blob_match.groups()
                url = f"https://raw.githubusercontent.com/{b_owner}/{b_repo}/{b_branch}/{b_path}"
            candidates.append(url)
        else:
            clean_path = url.lstrip("./").lstrip("/")
            raw_gh_url = (
                f"https://raw.githubusercontent.com/{owner}/{repo_name}/{default_branch}/{clean_path}"
            )
            candidates.append(raw_gh_url)

    seen = set()
    unique = []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            unique.append(c)
    return unique[:5]


def is_candidate_important(repo, existing_by_url):
    """
    Fast heuristic pre-filtering to skim away trivial, coursework, or irrelevant repos
    BEFORE passing candidates to the AI model.
    """
    name = repo["name"]
    full_name = repo["full_name"].lower()
    html_url = repo["html_url"]
    norm_url = normalize_github_url(html_url)

    # 1. Skip if already in projects.json (unless UPDATE_EXISTING is active)
    if norm_url in existing_by_url and not UPDATE_EXISTING:
        return False, "Already present in projects.json"

    # 2. Skip explicit excluded names
    if name.lower() in EXCLUDED_NAMES:
        return False, "Excluded system or profile repository"

    # 3. Skip private repos unless explicitly enabled
    if repo.get("private") and not INCLUDE_PRIVATE:
        return False, "Private repository (INCLUDE_PRIVATE=false)"

    # 4. Skip archived or disabled repos
    if repo.get("archived") or repo.get("disabled"):
        return False, "Repository is archived or disabled"

    # 5. Skip unstarred forks
    if repo.get("fork") and repo.get("stargazers_count", 0) == 0:
        return False, "Fork repository without stars"

    # 6. Skip empty or near-empty repos (size < 30 KB)
    if repo.get("size", 0) < 30:
        return False, f"Trivial repository size ({repo.get('size', 0)} KB)"

    # 7. Skip obvious university coursework / lab assignments
    if COURSEWORK_PATTERNS.search(name) and repo.get("stargazers_count", 0) == 0:
        return False, "Coursework or assignment pattern"

    # 8. Skip simple data dumps / asset collections
    if name.lower() in DATA_OR_DUMP_NAMES and not repo.get("description"):
        return False, "Data or asset dump without description"

    # 9. Skip repos with zero description, zero topics, and zero stars
    if not repo.get("description") and not repo.get("topics") and repo.get("stargazers_count", 0) == 0:
        # We allow it only if it has a substantial size (> 500 KB) and is not coursework
        if repo.get("size", 0) < 300:
            return False, "No description, topics, or stars"

    return True, "Passed initial screening"


def parse_i18n_projects_list(i18n_content):
    """Extract existing EN and ES project titles and descriptions from src/i18n.js."""
    translations = {"en": {}, "es": {}}

    es_split = re.search(r"\n\s*es:\s*\{\s*\n\s*translation:\s*\{", i18n_content)
    if not es_split:
        return translations

    en_part = i18n_content[: es_split.start()]
    es_part = i18n_content[es_split.start() :]

    entry_pattern = re.compile(
        r"(\w+):\s*\{\s*title:\s*\"([^\"]*)\",\s*description:\s*\"([^\"]*)\",?\s*\}",
        re.DOTALL,
    )

    for lang, part in [("en", en_part), ("es", es_part)]:
        pl_match = re.search(r"\"projects-list\":\s*\{", part)
        if not pl_match:
            continue
        pl_sub = part[pl_match.end() :]
        for match in entry_pattern.finditer(pl_sub):
            key, title, desc = match.groups()
            translations[lang][key] = {"title": title, "description": desc}

    return translations


def build_style_examples(projects, i18n_translations, max_examples=8):
    """Build representative examples from existing projects.json + i18n.js for the AI prompt."""
    examples = []
    for proj in projects[:max_examples]:
        title_field = proj.get("title", "")
        key = title_field.split(".")[1] if title_field.startswith("projects-list.") else title_field
        en_entry = i18n_translations.get("en", {}).get(key, {})
        es_entry = i18n_translations.get("es", {}).get(key, {})
        examples.append(
            {
                "key": key,
                "area": proj.get("area"),
                "research_line": proj.get("research_line"),
                "tags": proj.get("tags"),
                "title_en": en_entry.get("title", ""),
                "description_en": en_entry.get("description", ""),
                "title_es": es_entry.get("title", ""),
                "description_es": es_entry.get("description", ""),
            }
        )
    return examples


def parse_models_response(response):
    """
    Parse model response robustly:
    1. First attempts normal JSON parsing.
    2. Falls back to parsing SSE-style data: lines.
    3. Supports both message.content and accumulated delta.content.
    4. Raises a clear parse error with body prefix context when payloads are unusable.
    """
    try:
        data = response.json()
        if isinstance(data, dict):
            return data
    except Exception:
        pass

    text = (response.text or "").strip()
    if not text:
        raise ValueError("Model response body was empty.")

    accumulated_content = []
    message_content = None
    has_sse_data = False

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        if line.startswith("data:"):
            has_sse_data = True
            line_data = line[5:].strip()
            if line_data == "[DONE]":
                continue
            try:
                chunk = json.loads(line_data)
            except Exception:
                continue

            choices = chunk.get("choices") or []
            if not choices:
                continue
            choice = choices[0]

            msg = choice.get("message")
            if msg and isinstance(msg, dict) and msg.get("content"):
                message_content = msg["content"]

            delta = choice.get("delta")
            if delta and isinstance(delta, dict) and delta.get("content"):
                accumulated_content.append(delta["content"])

    if has_sse_data:
        final_content = message_content or "".join(accumulated_content)
        if final_content:
            return {
                "choices": [
                    {
                        "message": {
                            "content": final_content
                        }
                    }
                ]
            }

    body_prefix = text[:300].replace("\n", " ")
    raise ValueError(f"Failed to parse model response payload. Body prefix: {body_prefix!r}")


def skim_and_curate_with_ai(candidate_repos, style_examples, existing_keys, max_projects=5):
    """
    Skim through all candidate repositories in a SINGLE AI call, selecting ONLY
    the most important, portfolio-worthy showcase projects and generating their metadata.
    """
    if not MODELS_TOKEN:
        raise ValueError("MODELS_TOKEN or GITHUB_TOKEN is required to call GitHub Models API.")

    system_prompt = (
        "You are an expert editorial curator for David Cuevas's personal portfolio website (dcuevasa.github.io).\n"
        "David is an MSc Systems & Computer Engineering student and AI/Robotics researcher at Universidad de los Andes "
        "(RoboCup@Home champion, working on embodied agentic AI, VLAs/ACTs, social robotics, NLP, computer vision, simulation, and mobile/XR systems).\n\n"
        "TASK:\n"
        "1. SKIM through all candidate repositories in the provided list.\n"
        "2. FILTER OUT unimportant repositories: Skip school exercises, course labs, basic tutorials, data/image dumps, "
        "minor scratchpads, duplicates, or trivial utilities.\n"
        f"3. SELECT ONLY THE TOP {max_projects} MOST IMPORTANT, SHOWCASE-WORTHY PROJECTS that truly demonstrate "
        "engineering depth, research innovation, or notable capability for a professional portfolio.\n"
        "4. For each selected project, generate its portfolio entry and EN/ES translations strictly adhering to these style rules:\n"
        f"   - `area`: MUST be one of: {json.dumps(VALID_AREAS)}\n"
        f"   - `research_line`: MUST be one of: {json.dumps(VALID_RESEARCH_LINES)}\n"
        "   - `tags`: exactly 3 concise tags matching existing capitalization (e.g. [\"LeRobot\", \"MuJoCo\", \"Robotics\"]).\n"
        "   - `key`: unique camelCase identifier (e.g. `lerobotVisionDetector`, `unitreeG1Virtual`).\n"
        "   - `title_en` & `title_es`: short, clean title (2 to 4 words).\n"
        "   - `description_en` & `description_es`: single concise sentence (8 to 18 words) WITHOUT a trailing period.\n"
        f"   - `image`: choose the best URL from candidate's `candidate_images` if present; otherwise a local asset key from {json.dumps(LOCAL_IMAGE_KEYS)} if strongly relevant; otherwise \"\".\n"
        "   - `selection_reason`: 1 short sentence explaining why this repository was selected as important.\n\n"
        "Return ONLY a valid JSON object matching this schema:\n"
        "{\n"
        '  "selected_projects": [\n'
        "    {\n"
        '      "name": "repository-name",\n'
        '      "github": "https://github.com/...",\n'
        '      "key": "camelCaseKey",\n'
        '      "area": "robotics | ai | mobile | others",\n'
        '      "research_line": "social_robotics | embodied_agentic_ai | vlas_and_acts | nlp | vision | simulation | others",\n'
        '      "image": "url_or_key_or_empty",\n'
        '      "tags": ["Tag1", "Tag2", "Tag3"],\n'
        '      "title_en": "English Title",\n'
        '      "description_en": "Concise English description without trailing period",\n'
        '      "title_es": "Spanish Title",\n'
        '      "description_es": "Concise Spanish description without trailing period",\n'
        '      "selection_reason": "Why this is an important portfolio project"\n'
        "    }\n"
        "  ],\n"
        '  "skipped_summary": "Brief explanation of why other candidates were rejected"\n'
        "}"
    )

    user_payload = {
        "style_examples": style_examples,
        "existing_keys_to_avoid": sorted(list(existing_keys)),
        "candidate_repositories": candidate_repos,
    }

    endpoints = []
    short_model = AI_MODEL.split("/")[-1] if "/" in AI_MODEL else AI_MODEL

    # 1. Free-tier external providers if configured in GitHub Secrets
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if gemini_key:
        endpoints.append(
            (
                "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
                "gemini-2.5-flash",
                [gemini_key],
            )
        )

    groq_key = os.getenv("GROQ_API_KEY")
    if groq_key:
        endpoints.append(
            (
                "https://api.groq.com/openai/v1/chat/completions",
                "llama-3.3-70b-versatile",
                [groq_key],
            )
        )

    openrouter_key = os.getenv("OPENROUTER_API_KEY")
    if openrouter_key:
        endpoints.append(
            (
                "https://openrouter.ai/api/v1/chat/completions",
                "meta-llama/llama-3.3-70b-instruct:free",
                [openrouter_key],
            )
        )

    # 2. GitHub Models / Azure AI Inference endpoints
    gh_tokens = [t for t in [MODELS_TOKEN, GITHUB_TOKEN] if t]
    seen_tokens = set()
    unique_gh_tokens = [t for t in gh_tokens if not (t in seen_tokens or seen_tokens.add(t))]
    if unique_gh_tokens:
        endpoints.append(
            ("https://models.inference.ai.azure.com/chat/completions", short_model, unique_gh_tokens)
        )
        endpoints.append(
            ("https://models.github.ai/inference/chat/completions", AI_MODEL, unique_gh_tokens)
        )

    last_error = None
    for endpoint_url, model_name, tokens_to_try in endpoints:
        endpoint_broken = False
        for token in tokens_to_try:
            if endpoint_broken:
                break
            for attempt in range(3):
                try:
                    response = requests.post(
                        endpoint_url,
                        headers={
                            "Authorization": f"Bearer {token}",
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": system_prompt},
                                {"role": "user", "content": json.dumps(user_payload, ensure_ascii=False)},
                            ],
                            "temperature": 0.2,
                            "stream": False,
                            "response_format": {"type": "json_object"},
                        },
                        timeout=60,
                    )

                    if response.status_code == 429:
                        wait_seconds = 8 * (attempt + 1)
                        print(f"Rate limited (429) on {endpoint_url}. Waiting {wait_seconds}s...")
                        time.sleep(wait_seconds)
                        continue

                    if response.status_code in (401, 403) and token != tokens_to_try[-1]:
                        print(f"Token rejected ({response.status_code}) on {endpoint_url}. Trying alternate token...")
                        break

                    if response.status_code != 200:
                        last_error = f"HTTP {response.status_code} from {endpoint_url}: {response.text[:300]}"
                        break

                    # If the endpoint returns a static plain-text 'OK' stub (retired models.github.ai), skip immediately
                    if (response.text or "").strip() == "OK":
                        last_error = (
                            f"{endpoint_url} returned static 'OK' text stub instead of inference JSON "
                            "(GitHub Models endpoint retired/unavailable)."
                        )
                        endpoint_broken = True
                        break

                    data = parse_models_response(response)
                    content = (data.get("choices") or [{}])[0].get("message", {}).get("content", "")
                    if not content:
                        raise ValueError("Model response did not include message content.")
                    content = re.sub(r"^```(?:json)?\s*", "", content.strip())
                    content = re.sub(r"\s*```$", "", content.strip())
                    return json.loads(content)

                except Exception as exc:
                    last_error = f"{endpoint_url}: {exc}"
                    time.sleep(2)

    print(
        f"Notice: Remote AI endpoints unavailable ({last_error}). "
        "Running built-in smart curation engine to select top showcase projects..."
    )
    return curate_with_smart_fallback(candidate_repos, existing_keys, max_projects=max_projects)


ACRONYM_MAP = {
    "ros": "ROS",
    "ros2": "ROS2",
    "vla": "VLA",
    "act": "ACT",
    "llm": "LLM",
    "llms": "LLMs",
    "nlp": "NLP",
    "rag": "RAG",
    "ai": "AI",
    "g1": "G1",
    "3ds": "3DS",
    "vr": "VR",
    "ar": "AR",
    "xr": "XR",
    "ik": "IK",
    "so101": "SO101",
    "lerobot": "LeRobot",
    "mujoco": "MuJoCo",
    "api": "API",
    "noetic": "Noetic",
    "unitree": "Unitree",
    "nao": "NAO",
    "naoqi": "NAOqi",
    "wearos": "WearOS",
    "dsu": "DSU",
    "ps4": "PS4",
    "bop": "BOP",
    "yolo": "YOLO",
    "bert": "BERT",
}


def curate_with_smart_fallback(candidate_repos, existing_keys, max_projects=5):
    """
    Deterministic smart curator when remote AI endpoints are retired or unreachable.
    Scores candidate repositories by domain relevance, documentation quality, and stars,
    and produces portfolio entries matching the exact style of projects.json and src/i18n.js.
    """
    scored = []
    for c in candidate_repos:
        name = c.get("name", "")
        desc = (c.get("description") or "").strip()
        readme = (c.get("readme_snippet") or "").strip()
        topics = [t.lower() for t in (c.get("topics") or [])]
        stars = c.get("stars", 0)
        text_blob = f"{name} {desc} {' '.join(topics)} {readme[:400]}".lower()

        score = 0
        if desc:
            score += 4
        if len(readme) > 200:
            score += 3
        if c.get("candidate_images"):
            score += 2
        score += min(stars * 2, 10)

        robotics_kw = [
            "lerobot", "robot", "ros", "ros2", "vla", "act", "mujoco", "gazebo",
            "unitree", "g1", "pepper", "nao", "so101", "teleop", "kinematics", "navigation",
        ]
        ai_kw = [
            "llm", "rag", "bert", "yolo", "vision", "agent", "langgraph", "nlp",
            "detection", "segmentation", "latex", "research", "transformer",
        ]
        mobile_kw = ["android", "wearos", "kotlin", "flutter", "3ds", "quest", "unity", "vr", "ar"]

        if any(k in text_blob for k in robotics_kw):
            score += 6
        if any(k in text_blob for k in ai_kw):
            score += 5
        if any(k in text_blob for k in mobile_kw):
            score += 3

        # Require a meaningful description or rich README + domain match
        if score < 7 or (not desc and len(readme) < 300):
            continue

        scored.append((score, c, text_blob))

    scored.sort(key=lambda x: x[0], reverse=True)
    top_items = scored[:max_projects]

    selected = []
    for score, c, text_blob in top_items:
        name = c["name"]
        words = [w for w in re.split(r"[-_ ]+", name) if w]
        if not words:
            continue

        # Build camelCase key (always valid JS identifier starting with [a-z])
        first_w = words[0].lower()
        rest_w = "".join(ACRONYM_MAP.get(w.lower(), w.capitalize()) for w in words[1:])
        key = ensure_valid_js_key(first_w + rest_w)

        # Build clean title (2-4 words)
        title_words = [ACRONYM_MAP.get(w.lower(), w.capitalize()) for w in words[:4]]
        title_en = " ".join(title_words)
        title_es = title_en

        # Classify area & research_line
        if any(k in text_blob for k in ["lerobot", "vla", "act", "so101", "policy"]):
            area = "robotics"
            research_line = "vlas_and_acts"
        elif any(k in text_blob for k in ["langgraph", "agent", "llm"]) and "ros" in text_blob:
            area = "robotics"
            research_line = "embodied_agentic_ai"
        elif any(k in text_blob for k in ["unitree", "g1", "pepper", "nao", "ros", "ros2", "robot"]):
            area = "robotics"
            research_line = "social_robotics"
        elif any(k in text_blob for k in ["vision", "yolo", "detector", "pose", "segmentation"]):
            area = "ai"
            research_line = "vision"
        elif any(k in text_blob for k in ["llm", "rag", "bert", "nlp", "research", "latex"]):
            area = "ai"
            research_line = "nlp"
        elif any(k in text_blob for k in ["gazebo", "mujoco", "simulation", "virtual"]):
            area = "others"
            research_line = "simulation"
        else:
            area = "mobile"
            research_line = "others"

        # Build 3 concise tags
        tags = []
        tag_rules = [
            ("lerobot", "LeRobot"),
            ("ros2", "ROS2"),
            ("ros", "ROS"),
            ("vla", "VLA"),
            ("mujoco", "MuJoCo"),
            ("unitree", "Unitree G1"),
            ("vision", "Vision"),
            ("yolo", "YOLO"),
            ("llm", "LLMs"),
            ("langgraph", "LangGraph"),
            ("nlp", "NLP"),
            ("android", "Android"),
            ("wearos", "WearOS"),
            ("kotlin", "Kotlin"),
            ("3ds", "3DS"),
        ]
        for kw, label in tag_rules:
            if kw in text_blob and label not in tags:
                tags.append(label)
            if len(tags) >= 3:
                break
        if c.get("language") and len(tags) < 3 and c["language"] not in tags:
            tags.append(c["language"])
        if area == "robotics" and len(tags) < 3 and "Robotics" not in tags:
            tags.append("Robotics")
        elif area == "ai" and len(tags) < 3 and "AI" not in tags:
            tags.append("AI")
        if not tags:
            tags = ["Software"]

        # Clean concise description (1 sentence, no trailing period)
        raw_desc = (c.get("description") or "").strip()
        if not raw_desc:
            # Extract first non-heading line from README
            for rline in (c.get("readme_snippet") or "").splitlines():
                sline = rline.strip()
                if sline and not sline.startswith("#") and not sline.startswith("!") and len(sline) > 25:
                    raw_desc = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", sline)
                    break
        if not raw_desc:
            raw_desc = f"Development of {title_en} for {area} applications"

        first_sentence = re.split(r"\.\s+", raw_desc)[0].strip().rstrip(".")
        if len(first_sentence) > 140:
            first_sentence = first_sentence[:137].rsplit(" ", 1)[0]

        desc_en = first_sentence
        desc_es = first_sentence

        # Select image
        candidate_imgs = c.get("candidate_images") or []
        image = candidate_imgs[0] if candidate_imgs else ""

        selected.append(
            {
                "name": name,
                "github": c.get("html_url", ""),
                "key": key,
                "area": area,
                "research_line": research_line,
                "image": image,
                "tags": tags[:3],
                "title_en": title_en,
                "description_en": desc_en,
                "title_es": title_es,
                "description_es": desc_es,
                "selection_reason": f"High domain relevance score ({score}) in {area}/{research_line}",
            }
        )

    return {
        "selected_projects": selected,
        "skipped_summary": (
            f"Evaluated {len(candidate_repos)} candidates via smart domain curator; "
            f"selected top {len(selected)} showcase projects."
        ),
    }


def ensure_valid_js_key(raw_key):
    """Ensure a translation key is a valid unquoted JS camelCase identifier starting with [a-z]."""
    key = re.sub(r"[^a-zA-Z0-9_]", "", str(raw_key or "project"))
    m = re.match(r"^(\d+[a-zA-Z]?)(.+)$", key)
    if m and re.match(r"^[a-zA-Z]", m.group(2)):
        prefix, rest = m.groups()
        key = rest[0].lower() + rest[1:] + prefix.upper()
    elif re.match(r"^\d", key):
        key = f"project{key}"
    if not key or not key[0].isalpha():
        key = f"project{key}"
    return key[0].lower() + key[1:]


def repair_invalid_js_keys(projects_path, i18n_path):
    """
    Scan projects.json and src/i18n.js for any project keys starting with a digit
    (which cause ESLint/Babel 'Identifier directly after number' syntax errors)
    and repair them in place.
    """
    with open(projects_path, "r", encoding="utf-8") as f:
        projects = json.load(f)
    with open(i18n_path, "r", encoding="utf-8") as f:
        i18n_content = f.read()

    repaired_map = {}

    for proj in projects:
        for field in ("title", "description"):
            val = proj.get(field, "")
            if val.startswith("projects-list."):
                parts = val.split(".")
                if len(parts) >= 3 and re.match(r"^\d", parts[1]):
                    bad_key = parts[1]
                    good_key = ensure_valid_js_key(bad_key)
                    repaired_map[bad_key] = good_key
                    proj[field] = f"projects-list.{good_key}.{parts[2]}"

    for m in re.finditer(r"^([ \t]+)(\d+[a-zA-Z0-9_]*)(:\s*\{)", i18n_content, flags=re.MULTILINE):
        bad_key = m.group(2)
        if bad_key not in repaired_map:
            repaired_map[bad_key] = ensure_valid_js_key(bad_key)

    if repaired_map:
        for bad_key, good_key in repaired_map.items():
            i18n_content = re.sub(
                rf"^([ \t]*){re.escape(bad_key)}(:\s*\{{)",
                rf"\1{good_key}\2",
                i18n_content,
                flags=re.MULTILINE,
            )
        with open(projects_path, "w", encoding="utf-8") as f:
            json.dump(projects, f, ensure_ascii=False, indent=2)
            f.write("\n")
        with open(i18n_path, "w", encoding="utf-8") as f:
            f.write(i18n_content)
        print(f"Repaired invalid JS identifier key(s) in projects.json and i18n.js: {repaired_map}")


def sanitize_project_entry(entry, existing_keys):
    """Ensure each selected project entry strictly conforms to the schema."""
    key = ensure_valid_js_key(entry.get("key", "project"))

    base_key = key
    counter = 2
    while key in existing_keys:
        key = f"{base_key}{counter}"
        counter += 1

    area = entry.get("area", "others")
    if area not in VALID_AREAS:
        area = "others"

    research_line = entry.get("research_line", "others")
    if research_line not in VALID_RESEARCH_LINES:
        research_line = "others"

    tags = entry.get("tags", [])
    if not isinstance(tags, list) or not tags:
        tags = ["Software"]
    tags = [str(t).strip() for t in tags if str(t).strip()][:4]

    image = str(entry.get("image") or "").strip()
    title_en = str(entry.get("title_en") or key).strip()
    desc_en = str(entry.get("description_en") or "").strip().rstrip(".")
    title_es = str(entry.get("title_es") or title_en).strip()
    desc_es = str(entry.get("description_es") or desc_en).strip().rstrip(".")

    return {
        "key": key,
        "area": area,
        "research_line": research_line,
        "image": image,
        "tags": tags,
        "title_en": title_en,
        "description_en": desc_en,
        "title_es": title_es,
        "description_es": desc_es,
        "github": entry.get("github", ""),
        "selection_reason": entry.get("selection_reason", ""),
    }


def update_i18n_file(i18n_path, new_translations):
    """
    Insert or update project translation keys inside both `en` and `es` `"projects-list"`
    blocks in `src/i18n.js` while preserving all existing code and comments.
    """
    if not new_translations:
        return

    with open(i18n_path, "r", encoding="utf-8") as f:
        content = f.read()

    es_split = re.search(r"\n\s*es:\s*\{\s*\n\s*translation:\s*\{", content)
    if not es_split:
        raise RuntimeError("Could not locate `es: { translation: {` section in src/i18n.js")

    en_section = content[: es_split.start()]
    es_section = content[es_split.start() :]

    def upsert_in_section(section_text, lang_key):
        for key, vals in new_translations.items():
            title_val = vals[f"title_{lang_key}"].replace("\\", "\\\\").replace('"', '\\"')
            desc_val = vals[f"description_{lang_key}"].replace("\\", "\\\\").replace('"', '\\"')

            new_block = (
                f"            {key}: {{\n"
                f'              title: "{title_val}",\n'
                f'              description: "{desc_val}",\n'
                f"            }},"
            )

            existing_pattern = re.compile(
                rf"(^[ \t]*{re.escape(key)}:\s*\{{\s*title:\s*\"[^\"]*\",\s*description:\s*\n?[ \t]*\"[^\"]*\",?\s*\}},?)",
                re.MULTILINE,
            )
            if existing_pattern.search(section_text):
                section_text = existing_pattern.sub(new_block, section_text, count=1)
            else:
                others_pattern = re.compile(
                    r"(^[ \t]*others:\s*\{\s*\n[ \t]*title:)",
                    re.MULTILINE,
                )
                if others_pattern.search(section_text):
                    section_text = others_pattern.sub(f"{new_block}\n\\1", section_text, count=1)
                else:
                    raise RuntimeError(
                        f"Could not find insertion point in `projects-list` ({lang_key}) in src/i18n.js"
                    )
        return section_text

    updated_en = upsert_in_section(en_section, "en")
    updated_es = upsert_in_section(es_section, "es")

    with open(i18n_path, "w", encoding="utf-8") as f:
        f.write(updated_en + updated_es)


def main():
    print("Loading existing projects and translations...")
    repair_invalid_js_keys(PROJECTS_JSON_PATH, I18N_JS_PATH)
    with open(PROJECTS_JSON_PATH, "r", encoding="utf-8") as f:
        projects = json.load(f)

    with open(I18N_JS_PATH, "r", encoding="utf-8") as f:
        i18n_content = f.read()

    i18n_translations = parse_i18n_projects_list(i18n_content)
    style_examples = build_style_examples(projects, i18n_translations)

    existing_by_url = {}
    existing_keys = set(i18n_translations.get("en", {}).keys()) | set(
        i18n_translations.get("es", {}).keys()
    )
    for proj in projects:
        norm_url = normalize_github_url(proj.get("github", ""))
        if norm_url:
            existing_by_url[norm_url] = proj
        title_field = proj.get("title", "")
        if title_field.startswith("projects-list."):
            existing_keys.add(title_field.split(".")[1])

    print("Fetching repositories from GitHub...")
    raw_repos = get_all_repos()
    print(f"Total repositories fetched: {len(raw_repos)}")

    # 1. Fast heuristic screening
    screened_candidates = []
    skipped_screen_count = 0

    for repo in raw_repos:
        is_candidate, reason = is_candidate_important(repo, existing_by_url)
        if is_candidate:
            screened_candidates.append(repo)
        else:
            skipped_screen_count += 1

    print(
        f"Pre-screening complete: {len(screened_candidates)} candidates passed "
        f"({skipped_screen_count} trivial/existing/coursework repositories excluded)."
    )

    if not screened_candidates:
        print("No eligible candidate repositories to evaluate.")
        return

    # 2. Gather compact summaries & README intros for candidates
    print(f"Extracting README previews for {len(screened_candidates)} candidates...")
    ai_candidates_payload = []
    export_data = []

    for idx, repo in enumerate(screened_candidates):
        owner = repo["owner"]["login"]
        name = repo["name"]
        full_name = repo["full_name"]
        default_branch = repo.get("default_branch", "main")

        readme_text = get_repository_readme(owner, name)
        readme_images = extract_readme_images(readme_text, owner, name, default_branch)
        readme_snippet = (readme_text or "")[:1000]

        export_data.append(
            {
                "name": name,
                "full_name": full_name,
                "owner": owner,
                "html_url": repo["html_url"],
                "description": repo.get("description"),
                "language": repo.get("language"),
                "stars": repo.get("stargazers_count", 0),
                "topics": repo.get("topics", []),
                "readme": readme_text,
            }
        )

        ai_candidates_payload.append(
            {
                "name": name,
                "full_name": full_name,
                "html_url": repo["html_url"],
                "description": repo.get("description"),
                "language": repo.get("language"),
                "stars": repo.get("stargazers_count", 0),
                "size_kb": repo.get("size", 0),
                "topics": repo.get("topics", []),
                "candidate_images": readme_images,
                "readme_snippet": readme_snippet,
            }
        )

    # Save artifact
    with open(EXPORT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(export_data, f, ensure_ascii=False, indent=4)

    # 3. Skim and curate in a SINGLE AI request!
    print(
        f"\nSending {len(ai_candidates_payload)} candidates to AI model ({AI_MODEL}) "
        f"to skim and select up to {MAX_NEW_PROJECTS} important projects in ONE pass..."
    )
    ai_response = skim_and_curate_with_ai(
        candidate_repos=ai_candidates_payload,
        style_examples=style_examples,
        existing_keys=existing_keys,
        max_projects=MAX_NEW_PROJECTS,
    )

    selected_raw = ai_response.get("selected_projects", [])
    skipped_summary = ai_response.get("skipped_summary", "")

    print(f"\nAI Curation Decision: Selected {len(selected_raw)} project(s).")
    if skipped_summary:
        print(f"Summary of skipped items: {skipped_summary}")

    if not selected_raw:
        print("No new projects were deemed significant enough for the portfolio.")
        return

    next_id = max((p.get("id", 0) for p in projects), default=0) + 1
    i18n_updates = {}
    added_projects = []

    for item in selected_raw:
        clean = sanitize_project_entry(item, existing_keys)
        key = clean["key"]
        existing_keys.add(key)

        new_proj = {
            "id": next_id,
            "title": f"projects-list.{key}.title",
            "description": f"projects-list.{key}.description",
            "area": clean["area"],
            "research_line": clean["research_line"],
            "image": clean["image"],
            "tags": clean["tags"],
            "github": clean["github"],
        }
        projects.append(new_proj)
        next_id += 1
        added_projects.append(new_proj)

        i18n_updates[key] = {
            "title_en": clean["title_en"],
            "description_en": clean["description_en"],
            "title_es": clean["title_es"],
            "description_es": clean["description_es"],
        }

        print(
            f"  + Added #{new_proj['id']} [{clean['area']} / {clean['research_line']}]: "
            f"\"{clean['title_en']}\" ({clean['github']})"
        )
        if clean.get("selection_reason"):
            print(f"    Reason: {clean['selection_reason']}")

    # 4. Save updated files
    with open(PROJECTS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(projects, f, ensure_ascii=False, indent=2)
        f.write("\n")

    update_i18n_file(I18N_JS_PATH, i18n_updates)
    print(f"\nSuccessfully added {len(added_projects)} important project(s) to projects.json and i18n.js!")


if __name__ == "__main__":
    main()
