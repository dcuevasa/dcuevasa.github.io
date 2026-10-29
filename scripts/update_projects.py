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

EXCLUDED_REPOS = {
    "dcuevasa/dcuevasa",
    "dcuevasa/dcuevasa.github.io",
    "dcuevasa/github-exporter",
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
                # Only include org repos if they belong to the main user or are already tracked
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
        print(f"Error fetching README for {owner}/{repo_name}: {response.status_code}")
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
            # Convert github.com/.../blob/... image links to raw.githubusercontent.com
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

    # Deduplicate while preserving order
    seen = set()
    unique = []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            unique.append(c)
    return unique[:5]


def parse_i18n_projects_list(i18n_content):
    """Extract existing EN and ES project titles and descriptions from src/i18n.js."""
    translations = {"en": {}, "es": {}}

    # Split roughly at 'es: {' to separate English and Spanish blocks
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


def build_style_examples(projects, i18n_translations, max_examples=10):
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
                "image": proj.get("image"),
                "tags": proj.get("tags"),
                "github": proj.get("github"),
                "title_en": en_entry.get("title", ""),
                "description_en": en_entry.get("description", ""),
                "title_es": es_entry.get("title", ""),
                "description_es": es_entry.get("description", ""),
            }
        )
    return examples


def call_github_models_ai(repo_info, style_examples, existing_keys, existing_entry=None):
    """Call GitHub Models chat completions API to generate a project entry matching the site style."""
    if not MODELS_TOKEN:
        raise ValueError("MODELS_TOKEN or GITHUB_TOKEN is required to call GitHub Models API.")

    system_prompt = (
        "You are an expert portfolio curator for David Cuevas's personal website (dcuevasa.github.io). "
        "David is an MSc in Systems and Computer Engineering student and robotics/AI researcher "
        "(SinfonIA Uniandes, RoboCup@Home winner, working on social robotics, embodied agentic AI, "
        "VLAs/ACTs, NLP, computer vision, simulation, and mobile/XR interfaces).\n\n"
        "Your job is to generate or update a project entry for `src/components/projects.json` and "
        "its bilingual translations (English and Spanish) for `src/i18n.js`, strictly sticking to "
        "the style, tone, categorization, and conciseness of the existing projects.\n\n"
        "STRICT STYLE RULES:\n"
        f"1. `area` MUST be one of: {json.dumps(VALID_AREAS)}\n"
        f"2. `research_line` MUST be one of: {json.dumps(VALID_RESEARCH_LINES)}\n"
        "   - Use `social_robotics`, `embodied_agentic_ai`, or `vlas_and_acts` for `robotics` projects.\n"
        "   - Use `nlp` or `vision` for `ai` projects.\n"
        "   - Use `simulation` for Gazebo / Digital Twin / VR simulation projects (with `area`: `others` or `robotics`).\n"
        "   - Use `others` for `mobile`, web, 3DS, controller, or general software projects.\n"
        "3. `tags` MUST be an array of 3 concise technology/domain strings matching existing style "
        "(e.g. [\"ROS2\", \"Python\", \"Robotics\"], [\"LeRobot\", \"MuJoCo\", \"Robotics\"], [\"NLP\", \"BERT\", \"AI\"]).\n"
        "4. `key` MUST be a concise camelCase identifier (e.g. `lerobotMujoco`, `presidentialRAG`, `naoGazebo`).\n"
        "5. `title_en` and `title_es`: Short, clean project title (2 to 4 words).\n"
        "6. `description_en` and `description_es`: A single concise sentence (8 to 18 words) WITHOUT a trailing period, "
        "matching the exact style of existing entries.\n"
        "7. `image`: Prefer one of the `readme_images` URLs if available and relevant; otherwise if a local asset key "
        f"from {json.dumps(LOCAL_IMAGE_KEYS)} clearly matches the topic (e.g., Pepper, NLP, navigation), use that key; "
        "otherwise use `\"\"`.\n"
        "8. Set `skip` to `true` ONLY if the repository is a trivial config/test repo, fork without original work, "
        "or empty boilerplate that does not belong on a portfolio. If `existing_entry` is provided, `skip` MUST be `false`.\n\n"
        "Respond ONLY with a valid JSON object matching this schema:\n"
        "{\n"
        '  "skip": false,\n'
        '  "key": "camelCaseKey",\n'
        '  "area": "robotics | ai | mobile | others",\n'
        '  "research_line": "social_robotics | embodied_agentic_ai | vlas_and_acts | nlp | vision | simulation | others",\n'
        '  "image": "url_or_local_key_or_empty",\n'
        '  "tags": ["Tag1", "Tag2", "Tag3"],\n'
        '  "title_en": "English Title",\n'
        '  "description_en": "Concise English description without trailing period",\n'
        '  "title_es": "Spanish Title",\n'
        '  "description_es": "Concise Spanish description without trailing period"\n'
        "}"
    )

    readme_excerpt = (repo_info.get("readme") or "")[:4000]
    user_payload = {
        "style_examples": style_examples,
        "existing_keys_to_avoid_collision": sorted(list(existing_keys)),
        "existing_entry": existing_entry,
        "repository": {
            "name": repo_info["name"],
            "full_name": repo_info["full_name"],
            "owner": repo_info["owner"],
            "html_url": repo_info["html_url"],
            "description": repo_info.get("description"),
            "language": repo_info.get("language"),
            "topics": repo_info.get("topics", []),
            "readme_images": repo_info.get("readme_images", []),
            "readme_excerpt": readme_excerpt,
        },
    }

    endpoints = [
        ("https://models.github.ai/inference/chat/completions", AI_MODEL),
        (
            "https://models.inference.ai.azure.com/chat/completions",
            AI_MODEL.split("/")[-1],
        ),
    ]

    last_error = None
    for endpoint_url, model_name in endpoints:
        for attempt in range(3):
            try:
                response = requests.post(
                    endpoint_url,
                    headers={
                        "Authorization": f"Bearer {MODELS_TOKEN}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": model_name,
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": json.dumps(user_payload, ensure_ascii=False)},
                        ],
                        "temperature": 0.2,
                        "response_format": {"type": "json_object"},
                    },
                    timeout=60,
                )

                if response.status_code == 429:
                    wait_seconds = 10 * (attempt + 1)
                    print(f"Rate limited (429) on {endpoint_url}. Waiting {wait_seconds}s...")
                    time.sleep(wait_seconds)
                    continue

                if response.status_code != 200:
                    last_error = f"HTTP {response.status_code}: {response.text[:300]}"
                    break

                data = response.json()
                content = data["choices"][0]["message"]["content"]
                # Strip markdown code fences if present
                content = re.sub(r"^```(?:json)?\s*", "", content.strip())
                content = re.sub(r"\s*```$", "", content.strip())
                return json.loads(content)

            except Exception as exc:
                last_error = str(exc)
                time.sleep(2)

    raise RuntimeError(f"Failed to call GitHub Models API: {last_error}")


def sanitize_ai_result(ai_result, existing_keys, existing_entry=None):
    """Validate and sanitize the AI output so it strictly conforms to the schema."""
    key = re.sub(r"[^a-zA-Z0-9_]", "", str(ai_result.get("key", "project")))
    if not key:
        key = "project"
    if key[0].isupper():
        key = key[0].lower() + key[1:]

    if existing_entry:
        title_field = existing_entry.get("title", "")
        if title_field.startswith("projects-list."):
            key = title_field.split(".")[1]
    else:
        base_key = key
        counter = 2
        while key in existing_keys:
            key = f"{base_key}{counter}"
            counter += 1

    area = ai_result.get("area", "others")
    if area not in VALID_AREAS:
        area = "others"

    research_line = ai_result.get("research_line", "others")
    if research_line not in VALID_RESEARCH_LINES:
        research_line = "others"

    tags = ai_result.get("tags", [])
    if not isinstance(tags, list) or not tags:
        tags = ["Software"]
    tags = [str(t).strip() for t in tags if str(t).strip()][:4]

    image = str(ai_result.get("image") or "").strip()
    if existing_entry and existing_entry.get("image"):
        old_img = existing_entry["image"]
        # Keep existing local asset key or non-expired URL unless AI found a clean replacement for an expired JWT URL
        if not ("jwt=" in old_img and image):
            image = old_img

    title_en = str(ai_result.get("title_en") or key).strip()
    desc_en = str(ai_result.get("description_en") or "").strip().rstrip(".")
    title_es = str(ai_result.get("title_es") or title_en).strip()
    desc_es = str(ai_result.get("description_es") or desc_en).strip().rstrip(".")

    return {
        "skip": bool(ai_result.get("skip", False)) and existing_entry is None,
        "key": key,
        "area": area,
        "research_line": research_line,
        "image": image,
        "tags": tags,
        "title_en": title_en,
        "description_en": desc_en,
        "title_es": title_es,
        "description_es": desc_es,
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
                # Insert right before `others: {` inside `"projects-list"`
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
    print(f"Found {len(raw_repos)} repositories.")

    export_data = []
    candidates_to_process = []

    for index, repo in enumerate(raw_repos):
        owner = repo["owner"]["login"]
        name = repo["name"]
        full_name = repo["full_name"]
        html_url = repo["html_url"]
        norm_url = normalize_github_url(html_url)
        default_branch = repo.get("default_branch", "main")

        is_existing = norm_url in existing_by_url

        if not is_existing:
            if full_name.lower() in EXCLUDED_REPOS:
                continue
            if repo.get("private") and not INCLUDE_PRIVATE:
                continue
            if repo.get("fork") or repo.get("archived") or repo.get("disabled"):
                continue
            # Only automatically add new repos owned by GITHUB_OWNER or orgs already in projects.json
            known_owners = {
                GITHUB_OWNER.lower(),
                "sinfoniauniandes",
                "oasis-uniandes",
            }
            if owner.lower() not in known_owners:
                continue

        if is_existing and not UPDATE_EXISTING:
            continue

        print(f"Fetching README ({index + 1}/{len(raw_repos)}): {full_name}")
        readme_text = get_repository_readme(owner, name)

        # Skip brand-new empty repositories without description and without README
        if not is_existing and not readme_text and not repo.get("description"):
            print(f"  Skipping {full_name} (no README or description).")
            continue

        readme_images = extract_readme_images(readme_text, owner, name, default_branch)

        repo_info = {
            "name": name,
            "full_name": full_name,
            "owner": owner,
            "private": repo.get("private", False),
            "html_url": html_url,
            "description": repo.get("description"),
            "language": repo.get("language"),
            "topics": repo.get("topics", []),
            "created_at": repo.get("created_at"),
            "updated_at": repo.get("updated_at"),
            "readme": readme_text,
            "readme_images": readme_images,
        }
        export_data.append(repo_info)
        candidates_to_process.append((repo_info, existing_by_url.get(norm_url)))

    # Save export JSON artifact (matching export_readmes.py behavior)
    with open(EXPORT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(export_data, f, ensure_ascii=False, indent=4)
    print(f"Saved GitHub export data ({len(export_data)} repos) to {EXPORT_JSON_PATH}")

    if not candidates_to_process:
        print("No new or updated repositories to process.")
        return

    next_id = max((p.get("id", 0) for p in projects), default=0) + 1
    i18n_updates = {}
    added_count = 0
    updated_count = 0

    for repo_info, existing_entry in candidates_to_process:
        full_name = repo_info["full_name"]
        print(f"Analyzing {full_name} with AI model ({AI_MODEL})...")
        try:
            raw_ai = call_github_models_ai(
                repo_info=repo_info,
                style_examples=style_examples,
                existing_keys=existing_keys,
                existing_entry=existing_entry,
            )
            result = sanitize_ai_result(raw_ai, existing_keys, existing_entry)
        except Exception as exc:
            print(f"  Warning: AI generation failed for {full_name}: {exc}")
            continue

        if result["skip"]:
            print(f"  AI marked {full_name} as skip (not a portfolio project).")
            continue

        key = result["key"]
        existing_keys.add(key)

        if existing_entry is not None:
            existing_entry["area"] = result["area"]
            existing_entry["research_line"] = result["research_line"]
            existing_entry["image"] = result["image"]
            existing_entry["tags"] = result["tags"]
            updated_count += 1
            print(f"  Updated existing project: {key} ({full_name})")
        else:
            new_project = {
                "id": next_id,
                "title": f"projects-list.{key}.title",
                "description": f"projects-list.{key}.description",
                "area": result["area"],
                "research_line": result["research_line"],
                "image": result["image"],
                "tags": result["tags"],
                "github": repo_info["html_url"],
            }
            projects.append(new_project)
            next_id += 1
            added_count += 1
            print(f"  Added new project #{new_project['id']}: {key} ({full_name})")

        i18n_updates[key] = {
            "title_en": result["title_en"],
            "description_en": result["description_en"],
            "title_es": result["title_es"],
            "description_es": result["description_es"],
        }

        # Gentle pause between AI requests to respect free-tier rate limits
        time.sleep(2)

    if added_count > 0 or updated_count > 0:
        with open(PROJECTS_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(projects, f, ensure_ascii=False, indent=2)
            f.write("\n")

        update_i18n_file(I18N_JS_PATH, i18n_updates)
        print(
            f"\nCompleted! Added {added_count} new project(s) and updated {updated_count} project(s)."
        )
    else:
        print("\nNo changes were needed for projects.json or i18n.js.")


if __name__ == "__main__":
    main()
