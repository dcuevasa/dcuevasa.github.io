// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Automatically detect user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "David Cuevas": "Hi i'm David!",
          home: "Home",
          about: "About",
          aboutMe: "About Me",
          aboutMeDescription:
            "Systems and Computer Engineering Masters student (MISIS) at Universidad de los Andes, Colombia. Specialized in robotics, embodied agentic AI, and human-robot interaction. Leader of SinfonIA Uniandes and RoboCup 2024 winner in the RoboCup@Home SSPL league.",
          technicalSkills: "Technical Skills",
          robotics: "Robotics",
          webDevelopment: "Web Development",
          xrDevelopment: "XR Development",
          aiAndCloud: "AI & Cloud",
          researchLines: "Research Lines",
          roboticsLine:
            "Robotics: Embodied agentic AI, social robotics, VLAs and ACTs",
          aiLine: "AI: NLP, Vision (YOLO)",
          mobileLine: "Mobile: Android and WearOS Apps for robotics",
          roboticsDescription_long:
            "Focus on developing intelligent behaviors for robots in social environments. Currently working with vision-language-action models (VLAs) and Action Chunking with Transformers (ACTs) for manipulation and social navigation.",
          aiDescription_long:
            "Expertise in Natural Language Processing (summarization, RAG) and Computer Vision using YOLO for real-time object detection and segmentation in robotics contexts.",
          mobileDescription_long:
            "Development of native Android and WearOS applications designed as control and monitoring interfaces for robotic systems using ROS2.",
          social_robotics: "Social Robotics",
          embodied_agentic_ai: "Embodied Agentic AI",
          vlas_and_acts: "VLAs and ACTs",
          nlp: "NLP",
          vision: "Vision (YOLO)",
          android: "Android Apps",
          wearos: "WearOS Apps",
          education: "Education",
          MastersTitle: "MSc in Systems and Computer Engineering (MISIS)",
          bscTitle: "BSc in Systems and Computer Engineering",
          technicalTitle: "Software Programming Technician",
          present: "Present",
          experience: "Experience",
          projects: "Projects",
          project1Title: "Project 1",
          project1Description: "Description of your first major project.",
          project2Title: "Project 2",
          project2Description: "Description of your second major project.",
          researchAssistant: "Graduate Research Assistant - Robotics Lab",
          researchAssistantDates: "July 2025 - Present",
          teachingAssistant: "Teaching Assistant - Mobile Robotics",
          teachingAssistantDates: "Feb 2026 - June 2026",
          roboticsMonitor: "Robotics Research Monitor",
          roboticsMonitorDates: "Jan 2025 - July 2025",
          viewProject: "View Project",
          contact: "Contact",
          detailedAbout: "Detailed About",
          roboticsExperience: "Robotics Experience",
          roboticsDescription:
            "Specialized in ROS1, ROS2, and NAOqi for designing and implementing systems for perception, TTS, STT, and autonomous navigation. Currently focused on Embodied Agentic AI, VLAs (Vision-Language-Action models), and ACTs (Action Chunking with Transformers). Experience with Unitree's G1, SoftBank Robotics' Pepper and NAO, and leading SinfonIA Uniandes to victory at RoboCup 2024.",
          developmentExperience: "Development Experience",
          developmentDescription:
            "Extensive experience in web development with modern frameworks. Specialized in Android and WearOS applications for robotics interfaces, as well as cloud services and business intelligence tools.",
          certifications: "Certifications",
          cert1: "Fundamentals of Deep Learning (NVIDIA, October 2024)",
          cert2: "Generative AI with Diffusion Models (NVIDIA, October 2024)",
          cert3:
            "Building Transformer-Based Natural Language Processing Applications (NVIDIA, April 2025)",
          cert4:
            "Building LLM Applications with Prompt Engineering (NVIDIA, April 2025)",
          cert5:
            "Rapid Application Development with Large Language Models (LLM) (NVIDIA, May 2025)",
          cert6:
            "Efficient Large Language Model (LLM) Customization (NVIDIA, May 2025)",
          cert7: "Applications of AI for Anomaly Detection (NVIDIA, September 2025)",
          publications: "Research Publications",
          publicationsLink: "https://orcid.org/0009-0001-1391-953X",
          paper1Title: "Evaluating LLM-Based Autonomous Agent Architectures for Task Execution with Social Robots",
          paper1Authors: "Cuevas, D. and Manrique, R.",
          paper1Venue: "Applied Informatics, Springer Nature Switzerland, 2025",
          paper1Url: "http://dx.doi.org/10.1007/978-3-032-07175-0_26",
          paper2Title: "Combining Extractive and Generative Methods for Legal Summarization: Tayronas Trigrams at JUST-NLP 2025",
          paper2Authors: "Parada, E. G. S., Almeida, C. M. M., and Alba, D. C.",
          paper2Venue: "Proceedings of the 1st Workshop on NLP for Empowering Justice (JUST-NLP 2025)",
          paper2Url: "https://aclanthology.org/2025.justnlp-main.17/",
          paper3Title: "SinfonIA Uniandes: Winning Team of the RoboCup@Home Social Standard Platform League 2024",
          paper3Authors: "Cuevas, D. and Rojas, L.",
          paper3Venue: "RoboCup 2024: Robot World Cup XXVII, Springer Nature Switzerland, 2025",
          paper3Url: "http://dx.doi.org/10.1007/978-3-031-85859-8_46",
          interests: "Personal Interests",
          interestsDescription:
            "Passionate about advancing the integration of robotics in society, bridging the gap between humans and machines through innovative AI solutions. Strong focus on teamwork and collaborative environments.",
          regionalImpact: "Regional Impact",
          regionalImpactDescription:
            "Committed to advancing technological innovation in Colombia and Latin America. Working to bridge the technological gap by bringing cutting-edge robotics and AI solutions to the region, fostering local talent, and contributing to the growth of the tech ecosystem in Latin America. The success at RoboCup 2024 demonstrates that our region can compete and excel at a global level in robotics and AI development.",
          chatbot: {
            buttonText: "Chat with Nova",
            inputPlaceholder: "Write a message...",
            sendButton: "Send",
            headerTitle: "Nova - Pepper Robot",
            responses: {
              greeting:
                "Hi! I'm Nova, a Pepper robot from Universidad de los Andes. How can I help you?",
              introduction:
                "I'm Nova, a Pepper robot from the SinfonIA research group at Universidad de los Andes. I was built by SoftBank Robotics in 2014 and I've been at the university since 2020.",
              capabilities:
                "I can do many things! I can guide people, answer questions, recognize objects and faces, play guitar and dance. I love interacting with people!",
              aboutSinfonia:
                "SinfonIA is my team! We are a research group at Universidad de los Andes. You can follow us on Instagram @sinfonia_uniandes",
              default:
                "Interesting! As a social robot, I love learning from interactions with humans. Is there anything specific you'd like to know about me or SinfonIA?",
            },
          },
          rights: "David Cuevas. All rights reserved",
          love: "Made with ❤️ by David Cuevas",
          viewAllProjects: "View All Projects",
          projectsDescription: "Discover all my projects and work done",
          myProjects: "My Projects",
          all: "All",
          ai: "AI",
          web: "Web",
          mobile: "Mixed / Others",
          mixed: "Mixed / Others",
          "projects-list": {
            robocup: {
              title: "RoboCup@Home",
              description:
                "Development of systems for international service robotics competition",
            },
            pepperNLP: {
              title: "Pepper NLP",
              description:
                "Natural language processing system for Pepper robot",
            },
            pepperSTT: {
              title: "Pepper Speech-to-Text",
              description: "Real-time speech recognition system",
            },
            pepperControl: {
              title: "Pepper Controller",
              description: "Remote control system for Pepper robot movements",
            },
            llmRobotAgents: {
              title: "LLM-Robot-Agents",
              description:
                "Researching LLM-based autonomous agent architectures for social robots",
            },
            naoqiBringup2: {
              title: "naoqi_bringup2",
              description:
                "Comprehensive ROS2 interface for SoftBank Robotics' NAO and Pepper",
            },
            lerobotMujoco: {
              title: "LeRobot Mujoco",
              description:
                "Integration of MuJoCo simulation with LeRobot interfaces for ACT/VLA research",
            },
            bertraco: {
              title: "BERTraco",
              description:
                "NLP project for extractive and generative legal summarization",
            },
            wearos2: {
              title: "WeaROS2",
              description:
                "WearOS application for robotics interaction via ROS2",
            },
            jros2Cellphone: {
              title: "jros2 Interface",
              description:
                "Android interface for ROS2 using the jros2 library",
            },
            vision_utilities: {
              title: "Vision Utilities",
              description:
                "Computer vision tools for robotics using YOLO and other models",
            },
            unitreeG1: {
              title: "Unitree G1 Humanoid Research",
              description:
                "Exploring voice synthesis and reinforcement learning for the Tree G1 humanoid robot",
            },
            oasisVR: {
              title: "Oasis VR Teleoperation",
              description:
                "ROS-based teleoperation system for Pepper and NAO robots using Meta Quest 3 and Unity 6",
            },
            familyFestAR: {
              title: "Family Fest AR",
              description:
                "Augmented reality application developed for the university's Family Fest showcase",
            },
            sinfoniaBlog: {
              title: "SinfonIA Blog",
              description:
                "Creative blog where we share research and interests in social robotics and AI",
            },
            presidentialRAG: {
              title: "Presidential RAG API",
              description:
                "RAG-based API for analyzing presidential discourse and documents",
            },
            p3dx: {
              title: "P3DX Navigation",
              description:
                "Autonomous navigation system for P3DX robot using ROS and laser rangefinders",
            },
            serviceFinder: {
              title: "Service Finder",
              description:
                "Web application to find services in your area using AI and modern web technologies",
            },
            sustainU: {
              title: "SustainU",
              description:
                "Mobile application for recycling and environmental sustainability using AI",
            },
            freeBird: {
              title: "FreeBird",
              description:
                "Full-stack web platform for trip planning and social interaction",
            },
            inputRedirection: {
              title: "3DS Input Redirection",
              description:
                "Android client for 3DS input redirection, allowing game control via smartphone",
            },
            pasaporteAR: {
              title: "Pasaporte AR",
              description:
                "Augmented reality application for cultural and institutional discovery",
            },
            digitalTwinML340: {
              title: "Digital Twin ML340",
              description: "Virtual replica of the ML340 laboratory for robotics simulation",
            },
            controller3dsTouch: {
              title: "3DS Touch Controller",
              description: "Controller interface utilizing the 3DS touch screen",
            },
            codEdit3DS: {
              title: "3DS Code Editor",
              description: "On-device code editing tool for the 3DS platform",
            },
            bopToolkit: {
              title: "BOP Toolkit Images",
              description: "Vision dataset and toolkit for 6D object pose estimation",
            },
            cemuhookMotion: {
              title: "Cemuhook Motion",
              description: "Motion sensing and touchpad client for CemuHook protocol",
            },
            dsu2ps4: {
              title: "DSU to PS4 Bridge",
              description: "Interface to use DSU controllers with PS4 systems",
            },
            dsuCellphone: {
              title: "DSU Cellphone Controller",
              description: "Mobile app to use smartphone sensors as a DSU controller",
            },
            naoGazebo: {
              title: "NAO Gazebo Simulation",
              description: "Simulation of the NAO robot in the Gazebo environment using ROS Noetic",
            },
            pepperGazebo: {
              title: "Pepper Gazebo Simulation",
              description: "Simulation of the Pepper robot in the Gazebo environment using ROS Noetic",
            },
            lerobotIK: {
              title: "LeRobot Teleop IK",
              description: "New teleoperation interface for the SO101 robot using Inverse Kinematics",
            },
            lerobotHaptic: {
              title: "LeRobot Teleop Haptic",
              description: "Teleoperation interface for the SO101 robot using haptic devices",
            },
            lerobotMujocoSinfonia: {
              title: "LeRobot Mujoco SO101",
              description: "Integration of MuJoCo simulation for the SO101 robot with LeRobot interfaces",
            },
            wearWalker: {
              title: "WearWalker",
              description: "WearOS application for robotics and gait assistance",
            },
            gemeloVirtualVR: {
              title: "Network Virtual Twin VR",
              description: "VR visualization of network systems and digital twins",
            },
            pico8Games: {
              title: "Pico-8 Games",
              description:
                "Collection of retro-style games developed for the Pico-8 virtual console",
            },
            unityGame: {
              title: "Unity Video Game",
              description: "3D adventure game developed with Unity and C#",
            },
            navigationUtils: {
              title: "Navigation Utilities",
              description:
                "ROS packages providing advanced tools for robot navigation and mapping",
            },
            perceptionUtils: {
              title: "Perception Utilities",
              description:
                "Computer vision and sensor fusion tools for robot environment understanding",
            },
            others: {
              title: "Other Projects",
              description: "Miscellaneous web, mobile, and tool projects",
            },
          },
          GitHub: "View on Github",
          viewOnOrcid: "View on ORCID",
          SocialHub: "At the Social Hub during RoboCup 2024",
          ROSMeetupPresentation: "ROS Meetup Presentation",
          ROSMeetupTeam: "SinfonIA Team at ROS Meetup",
          SabanaHerons: "SinfonIA with the Sabana Herons at the RoboCup",
          SinfonIANova: "SinfonIA Team with Nova",
          RoboCup2024: "RoboCup 2024",
          Nova: "Nova",
        },
      },
      es: {
        translation: {
          "David Cuevas": "¡Hola soy David!",
          home: "Inicio",
          about: "Sobre Mí",
          aboutMe: "Sobre Mí",
          aboutMeDescription:
            "Estudiante de Maestría en Ingeniería de Sistemas y Computación (MISIS) en la Universidad de los Andes, Colombia. Especializado en robótica, IA agéntica incorporada (embodied) e interacción humano-robot. Líder de SinfonIA Uniandes y ganador de RoboCup 2024 en la liga RoboCup@Home SSPL.",
          technicalSkills: "Habilidades Técnicas",
          robotics: "Robótica",
          webDevelopment: "Desarrollo Web",
          xrDevelopment: "Desarrollo XR",
          aiAndCloud: "IA y Cloud",
          researchLines: "Líneas de Investigación",
          roboticsLine: "Robótica: Embodied agentic AI, robótica social, VLAs y ACTs",
          roboticsDescription_long:
            "Enfoque en el desarrollo de comportamientos inteligentes para robots en entornos sociales. Actualmente trabajando con modelos de visión-lenguaje-acción (VLAs) y Action Chunking con Transformers (ACTs) para manipulación y navegación social.",
          aiLine: "IA: NLP, Visión (YOLO)",
          aiDescription_long:
            "Experiencia en Procesamiento de Lenguaje Natural (resumen, RAG) y Visión Computacional usando YOLO para detección de objetos y segmentación en tiempo real en contextos robóticos.",
          mobileLine: "Móvil: Aplicaciones Android y WearOS para robótica",
          mobileDescription_long:
            "Desarrollo de aplicaciones nativas para Android y WearOS diseñadas como interfaces de control y monitoreo para sistemas robóticos utilizando ROS2.",
          social_robotics: "Robótica Social",
          embodied_agentic_ai: "IA Agéntica incorporada (embodied)",
          vlas_and_acts: "VLAs y ACTs",
          nlp: "NLP",
          vision: "Visión (YOLO)",
          android: "Apps Android",
          wearos: "Apps WearOS",
          education: "Educación",
          MastersTitle:
            "Maestría en Ingeniería de Sistemas y Computación (MISIS)",
          bscTitle: "Ingeniería de Sistemas y Computación",
          technicalTitle: "Técnico en Programación de Software",
          present: "Presente",
          experience: "Experiencia",
          projects: "Proyectos",
          project1Title: "Proyecto 1",
          project1Description: "Descripción de tu primer proyecto importante.",
          project2Title: "Proyecto 2",
          project2Description: "Descripción de tu segundo proyecto importante.",
          researchAssistant:
            "Asistente de Investigación Graduado - Laboratorio de Robótica",
          researchAssistantDates: "Julio 2025 - Presente",
          teachingAssistant: "Asistente de Docencia - Robótica Móvil",
          teachingAssistantDates: "Feb 2026 - Junio 2026",
          roboticsMonitor: "Monitor de Investigación en Robótica",
          roboticsMonitorDates: "Ene 2025 - Julio 2025",
          viewProject: "Ver Proyecto",
          contact: "Contacto",
          detailedAbout: "Información Detallada",
          roboticsExperience: "Experiencia en Robótica",
          roboticsDescription:
            "Especializado en ROS1, ROS2 y NAOqi para el diseño e implementación de sistemas de percepción, TTS, STT y navegación autónoma. Actualmente enfocado en IA Agéntica Incorporada, VLAs (Vision-Language-Action models) y ACTs (Action Chunking with Transformers). Experiencia con G1 de Unitree, Pepper y NAO de SoftBank Robotics, y liderando SinfonIA Uniandes a la victoria en RoboCup 2024.",
          developmentExperience: "Experiencia en Desarrollo",
          developmentDescription:
            "Amplia experiencia en desarrollo web con frameworks modernos. Especializado en aplicaciones Android y WearOS para interfaces robóticas, así como servicios en la nube y herramientas de business intelligence.",
          certifications: "Certificaciones",
          cert1: "Fundamentos de Deep Learning (NVIDIA, Octubre 2024)",
          cert2: "IA Generativa con Modelos de Difusión (NVIDIA, Octubre 2024)",
          cert3:
            "Construcción de Aplicaciones de Procesamiento de Lenguaje Natural basadas en Transformer (NVIDIA, Abril 2025)",
          cert4:
            "Construcción de Aplicaciones LLM con Ingeniería de Prompts (NVIDIA, Abril 2025)",
          cert5:
            "Desarrollo Rápido de Aplicaciones con Modelos de Lenguaje Grande (LLM) (NVIDIA, Mayo 2025)",
          cert6:
            "Personalización Eficiente de Modelos de Lenguaje Grande (LLM) (NVIDIA, Mayo 2025)",
          cert7:
            "Aplicaciones de IA para la Detección de Anomalías (NVIDIA, Septiembre 2025)",
          publications: "Publicaciones de Investigación",
          publicationsLink: "https://orcid.org/0009-0001-1391-953X",
          paper1Title: "Evaluating LLM-Based Autonomous Agent Architectures for Task Execution with Social Robots",
          paper1Authors: "Cuevas, D. y Manrique, R.",
          paper1Venue: "Applied Informatics, Springer Nature Switzerland, 2025",
          paper1Url: "http://dx.doi.org/10.1007/978-3-032-07175-0_26",
          paper2Title: "Combining Extractive and Generative Methods for Legal Summarization: Tayronas Trigrams at JUST-NLP 2025",
          paper2Authors: "Parada, E. G. S., Almeida, C. M. M., y Alba, D. C.",
          paper2Venue: "Proceedings of the 1st Workshop on NLP for Empowering Justice (JUST-NLP 2025)",
          paper2Url: "https://aclanthology.org/2025.justnlp-main.17/",
          paper3Title: "SinfonIA Uniandes: Winning Team of the RoboCup@Home Social Standard Platform League 2024",
          paper3Authors: "Cuevas, D. y Rojas, L.",
          paper3Venue: "RoboCup 2024: Robot World Cup XXVII, Springer Nature Switzerland, 2025",
          paper3Url: "http://dx.doi.org/10.1007/978-3-031-85859-8_46",
          interests: "Intereses Personales",
          interestsDescription:
            "Apasionado por avanzar en la integración de la robótica en la sociedad, cerrando la brecha entre humanos y máquinas a través de soluciones innovadoras de IA. Fuerte enfoque en el trabajo en equipo y entornos colaborativos.",
          regionalImpact: "Impacto Regional",
          regionalImpactDescription:
            "Comprometido con el avance de la innovación tecnológica en Colombia y América Latina. Trabajando para cerrar la brecha tecnológica mediante la introducción de soluciones robóticas y de IA de vanguardia en la región, fomentando el talento local y contribuyendo al crecimiento del ecosistema tecnológico en América Latina. El éxito en RoboCup 2024 demuestra que nuestra región puede competir y destacar a nivel global en el desarrollo de robótica e IA.",
          chatbot: {
            buttonText: "Chat con Nova",
            inputPlaceholder: "Escribe un mensaje...",
            sendButton: "Enviar",
            headerTitle: "Nova - Robot Pepper",
            responses: {
              greeting:
                "¡Hola! Soy Nova, un robot Pepper de la Universidad de los Andes. ¿En qué puedo ayudarte?",
              introduction:
                "Soy Nova, un robot Pepper que forma parte del grupo de investigación SinfonIA en la Universidad de los Andes. Fui construida por SoftBank Robotics en 2014 y estoy en la universidad desde 2020.",
              capabilities:
                "¡Puedo hacer muchas cosas! Soy capaz de guiar personas, responder preguntas, reconocer objetos y caras, tocar la guitarra y bailar. ¡Me encanta interactuar con las personas!",
              aboutSinfonia:
                "¡SinfonIA es mi equipo! Somos un grupo de investigación en la Universidad de los Andes. Puedes seguirnos en Instagram como @sinfonia_uniandes",
              default:
                "¡Interesante! Como robot social, me encanta aprender de las interacciones con humanos. ¿Hay algo específico que quieras saber sobre mí o sobre SinfonIA?",
            },
          },
          rights: "David Cuevas. Todos los derechos reservados",
          love: "Hecho con ❤️ por David Cuevas",
          viewAllProjects: "Ver Todos los Proyectos",
          projectsDescription:
            "Descubre todos mis proyectos y trabajos realizados",
          myProjects: "Mis Proyectos",
          all: "Todos",
          ai: "IA",
          web: "Web",
          mobile: "Mixto / Otros",
          mixed: "Mixto / Otros",
          "projects-list": {
            robocup: {
              title: "RoboCup@Home",
              description:
                "Desarrollo de sistemas para competencia internacional de robótica de servicio",
            },
            pepperNLP: {
              title: "Pepper NLP",
              description:
                "Sistema de procesamiento de lenguaje natural para el robot Pepper",
            },
            pepperSTT: {
              title: "Pepper Speech-to-Text",
              description: "Sistema de reconocimiento de voz en tiempo real",
            },
            pepperControl: {
              title: "Controlador Pepper",
              description:
                "Sistema de control remoto para movimientos del robot Pepper",
            },
            llmRobotAgents: {
              title: "LLM-Robot-Agents",
              description:
                "Investigación de arquitecturas de agentes autónomos basados en LLM para robótica social",
            },
            naoqiBringup2: {
              title: "naoqi_bringup2",
              description:
                "Interfaz integral de ROS2 para los robots NAO y Pepper de SoftBank Robotics",
            },
            lerobotMujoco: {
              title: "LeRobot Mujoco",
              description:
                "Integración de simulación MuJoCo con interfaces LeRobot para investigación en ACT/VLA",
            },
            bertraco: {
              title: "BERTraco",
              description:
                "Proyecto de NLP para resumen legal extractivo y generativo",
            },
            wearos2: {
              title: "WeaROS2",
              description:
                "Aplicación WearOS para interacción robótica vía ROS2",
            },
            jros2Cellphone: {
              title: "Interfaz jros2",
              description:
                "Interfaz de Android para ROS2 utilizando la librería jros2",
            },
            vision_utilities: {
              title: "Utilidades de Visión",
              description:
                "Herramientas de visión computacional para robótica usando YOLO y otros modelos",
            },
            unitreeG1: {
              title: "Investigación Humanoides Unitree G1",
              description:
                "Exploración de síntesis de voz y aprendizaje por refuerzo para el robot humanoide Unitree G1",
            },
            oasisVR: {
              title: "Teleoperación VR Oasis",
              description:
                "Sistema de teleoperación basado en ROS para robots Pepper y NAO utilizando Meta Quest 3 y Unity 6",
            },
            familyFestAR: {
              title: "AR Family Fest",
              description:
                "Aplicación de realidad aumentada desarrollada para la muestra del Family Fest de la universidad",
            },
            sinfoniaBlog: {
              title: "Blog SinfonIA",
              description:
                "Blog creativo donde compartimos investigaciones e intereses en robótica social e IA",
            },
            presidentialRAG: {
              title: "API RAG Presidencial",
              description:
                "API basada en RAG para el análisis del discurso y documentos presidenciales",
            },
            p3dx: {
              title: "Navegación P3DX",
              description:
                "Sistema de navegación autónoma para el robot P3DX utilizando ROS y telémetros láser",
            },
            serviceFinder: {
              title: "Service Finder",
              description:
                "Aplicación web para encontrar servicios en tu área utilizando IA y tecnologías web modernas",
            },
            sustainU: {
              title: "SustainU",
              description:
                "Aplicación móvil para reciclaje y sostenibilidad ambiental utilizando IA",
            },
            freeBird: {
              title: "FreeBird",
              description:
                "Plataforma web full-stack para planificación de viajes e interacción social",
            },
            inputRedirection: {
              title: "3DS Input Redirection",
              description:
                "Cliente Android para redirección de entrada de 3DS, permitiendo controlar juegos mediante smartphone",
            },
            pasaporteAR: {
              title: "Pasaporte AR",
              description:
                "Aplicación de realidad aumentada para el descubrimiento cultural e institucional",
            },
            digitalTwinML340: {
              title: "Gemelo Virtual ML340",
              description: "Réplica virtual del laboratorio ML340 para simulación robótica",
            },
            controller3dsTouch: {
              title: "Controlador Táctil 3DS",
              description: "Interfaz de control utilizando la pantalla táctil de la 3DS",
            },
            codEdit3DS: {
              title: "Editor de Código 3DS",
              description: "Herramienta de edición de código directamente en la consola 3DS",
            },
            bopToolkit: {
              title: "Imágenes BOP Toolkit",
              description: "Dataset de visión y herramientas para estimación de pose 6D de objetos",
            },
            cemuhookMotion: {
              title: "Cemuhook Motion",
              description: "Cliente de sensores de movimiento y panel táctil para el protocolo CemuHook",
            },
            dsu2ps4: {
              title: "Puente DSU a PS4",
              description: "Interfaz para usar controladores DSU con sistemas PS4",
            },
            dsuCellphone: {
              title: "Controlador Celular DSU",
              description: "Aplicación móvil para usar sensores del smartphone como controlador DSU",
            },
            naoGazebo: {
              title: "NAO Simulación Gazebo",
              description: "Simulación del robot NAO en el entorno Gazebo utilizando ROS Noetic",
            },
            pepperGazebo: {
              title: "Pepper Simulación Gazebo",
              description: "Simulación del robot Pepper en el entorno Gazebo utilizando ROS Noetic",
            },
            lerobotIK: {
              title: "LeRobot Teleop IK",
              description: "Nueva interfaz de teleoperación para el robot SO101 utilizando cinemática inversa (IK)",
            },
            lerobotHaptic: {
              title: "LeRobot Teleop Háptico",
              description: "Interfaz de teleoperación para el robot SO101 utilizando dispositivos hápticos",
            },
            lerobotMujocoSinfonia: {
              title: "LeRobot Mujoco SO101",
              description: "Integración de simulación MuJoCo para el robot SO101 con interfaces LeRobot",
            },
            wearWalker: {
              title: "WearWalker",
              description: "Aplicación WearOS para asistencia en la marcha y robótica",
            },
            gemeloVirtualVR: {
              title: "Gemelo Virtual de Redes VR",
              description: "Visualización en VR de sistemas de red y gemelos digitales",
            },
            pico8Games: {
              title: "Juegos Pico-8",
              description:
                "Colección de juegos estilo retro desarrollados para la consola virtual Pico-8",
            },
            unityGame: {
              title: "Videojuego Unity",
              description: "Juego de aventura 3D desarrollado con Unity y C#",
            },
            navigationUtils: {
              title: "Utilidades de Navegación",
              description:
                "Paquetes de ROS que proporcionan herramientas avanzadas para navegación y mapeo de robots",
            },
            perceptionUtils: {
              title: "Utilidades de Percepción",
              description:
                "Herramientas de visión artificial y fusión de sensores para la comprensión del entorno robótico",
            },
            others: {
              title: "Otros Proyectos",
              description: "Proyectos diversos, web, móviles y herramientas",
            },
          },
          GitHub: "Ver en Github",
          viewOnOrcid: "Ver en ORCID",
          SocialHub: "En el Social Hub durante RoboCup 2024",
          ROSMeetupPresentation: "Presentación en ROS Meetup",
          ROSMeetupTeam: "Equipo SinfonIA en ROS Meetup",
          SabanaHerons: "SinfonIA con los Sabana Herons en la RoboCup",
          SinfonIANova: "Equipo SinfonIA con Nova",
          RoboCup2024: "RoboCup 2024",
          Nova: "Nova",
        },
      },
    },
    fallbackLng: "en", // Use English as the fallback language
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    detection: {
      // Customize the order of detection methods
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
    },
  });

export default i18n;
