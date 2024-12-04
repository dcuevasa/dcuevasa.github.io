// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Automatically detect user's language
  .use(initReactI18next)  // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "David Cuevas": "Hi i'm David!",
          "aboutMe": "About Me",
          "aboutMeDescription": "Final-year Systems and Computer Engineering student at Universidad de los Andes, Colombia, with a passion for robotics, artificial intelligence, and human-robot interaction. Leader of SinfonIA Uniandes and RoboCup 2024 winner in the RoboCup@Home SSPL league.",
          "technicalSkills": "Technical Skills",
          "robotics": "Robotics",
          "webDevelopment": "Web Development",
          "aiAndCloud": "AI & Cloud",
          "education": "Education",
          "bscTitle": "BSc in Systems and Computer Engineering",
          "technicalTitle": "Software Programming Technician",
          "present": "Present",
          "projects": "Projects",
          "project1Title": "Project 1",
          "project1Description": "Description of your first major project.",
          "project2Title": "Project 2",
          "project2Description": "Description of your second major project.",
          "viewProject": "View Project",
          "contact": "Contact",
          "detailedAbout": "Detailed About",
          "roboticsExperience": "Robotics Experience",
          "roboticsDescription": "Specialized in ROS1, ROS2, and NAOqi for designing and implementing systems for perception, Text-to-Speech (TTS), Speech-to-Text (STT), and autonomous navigation. Experience with SoftBank Robotics' Pepper robot and leading the SinfonIA Uniandes team to victory at RoboCup 2024.",
          "developmentExperience": "Development Experience",
          "developmentDescription": "Extensive experience in web development with modern frameworks and technologies. Proficient in desktop and mobile application development, as well as cloud services and business intelligence tools.",
          "certifications": "Certifications",
          "cert1": "Fundamentals of Deep Learning (NVIDIA, October 2024)",
          "cert2": "Generative AI with Diffusion Models (NVIDIA, October 2024)",
          "interests": "Personal Interests",
          "interestsDescription": "Passionate about advancing the integration of robotics in society, bridging the gap between humans and machines through innovative AI solutions. Strong focus on teamwork and collaborative environments.",
          "regionalImpact": "Regional Impact",
          "regionalImpactDescription": "Committed to advancing technological innovation in Colombia and Latin America. Working to bridge the technological gap by bringing cutting-edge robotics and AI solutions to the region, fostering local talent, and contributing to the growth of the tech ecosystem in Latin America. The success at RoboCup 2024 demonstrates that our region can compete and excel at a global level in robotics and AI development.",
          "chatbot": {
            "buttonText": "Chat with Nova",
            "inputPlaceholder": "Write a message...",
            "sendButton": "Send",
            "headerTitle": "Nova - Pepper Robot",
            "responses": {
              "greeting": "Hi! I'm Nova, a Pepper robot from Universidad de los Andes. How can I help you?",
              "introduction": "I'm Nova, a Pepper robot from the SinfonIA research group at Universidad de los Andes. I was built by SoftBank Robotics in 2014 and I've been at the university since 2020.",
              "capabilities": "I can do many things! I can guide people, answer questions, recognize objects and faces, play guitar and dance. I love interacting with people!",
              "aboutSinfonia": "SinfonIA is my team! We are a research group at Universidad de los Andes. You can follow us on Instagram @sinfonia_uniandes",
              "default": "Interesting! As a social robot, I love learning from interactions with humans. Is there anything specific you'd like to know about me or SinfonIA?"
            }
          },
          "rights": "David Cuevas. All rights reserved",
          "love": "Made with ❤️ by David Cuevas",
          "viewAllProjects": "View All Projects",
          "projectsDescription": "Discover all my projects and work done",
          "myProjects": "My Projects",
          "all": "All",
          "robotics": "Robotics",
          "ai": "AI",
          "web": "Web",
          "mobile": "Mobile",
        }
      },
      es: {
        translation: {
          "David Cuevas": "¡Hola soy David!",
          "aboutMe": "Sobre Mí",
          "aboutMeDescription": "Estudiante de último año de Ingeniería de Sistemas y Computación en la Universidad de los Andes, Colombia, apasionado por la robótica, la inteligencia artificial y la interacción humano-robot. Líder de SinfonIA Uniandes y ganador de RoboCup 2024 en la liga RoboCup@Home SSPL.",
          "technicalSkills": "Habilidades Técnicas",
          "robotics": "Robótica",
          "webDevelopment": "Desarrollo Web",
          "aiAndCloud": "IA y Cloud",
          "education": "Educación",
          "bscTitle": "Ingeniería de Sistemas y Computación",
          "technicalTitle": "Técnico en Programación de Software",
          "present": "Presente",
          "projects": "Proyectos",
          "project1Title": "Proyecto 1",
          "project1Description": "Descripción de tu primer proyecto importante.",
          "project2Title": "Proyecto 2",
          "project2Description": "Descripción de tu segundo proyecto importante.",
          "viewProject": "Ver Proyecto",
          "contact": "Contacto",
          "detailedAbout": "Información Detallada",
          "roboticsExperience": "Experiencia en Robótica",
          "roboticsDescription": "Especializado en ROS1, ROS2 y NAOqi para el diseño e implementación de sistemas de percepción, Text-to-Speech (TTS), Speech-to-Text (STT) y navegación autónoma. Experiencia con el robot Pepper de SoftBank Robotics y liderando el equipo SinfonIA Uniandes hacia la victoria en RoboCup 2024.",
          "developmentExperience": "Experiencia en Desarrollo",
          "developmentDescription": "Amplia experiencia en desarrollo web con frameworks y tecnologías modernas. Competente en desarrollo de aplicaciones de escritorio y móviles, así como servicios en la nube y herramientas de inteligencia empresarial.",
          "certifications": "Certificaciones",
          "cert1": "Fundamentos de Deep Learning (NVIDIA, Octubre 2024)",
          "cert2": "IA Generativa con Modelos de Difusión (NVIDIA, Octubre 2024)",
          "interests": "Intereses Personales",
          "interestsDescription": "Apasionado por avanzar en la integración de la robótica en la sociedad, cerrando la brecha entre humanos y máquinas a través de soluciones innovadoras de IA. Fuerte enfoque en el trabajo en equipo y entornos colaborativos.",
          "regionalImpact": "Impacto Regional",
          "regionalImpactDescription": "Comprometido con el avance de la innovación tecnológica en Colombia y América Latina. Trabajando para cerrar la brecha tecnológica mediante la introducción de soluciones robóticas y de IA de vanguardia en la región, fomentando el talento local y contribuyendo al crecimiento del ecosistema tecnológico en América Latina. El éxito en RoboCup 2024 demuestra que nuestra región puede competir y destacar a nivel global en el desarrollo de robótica e IA.",
          "chatbot": {
            "buttonText": "Chat con Nova",
            "inputPlaceholder": "Escribe un mensaje...",
            "sendButton": "Enviar",
            "headerTitle": "Nova - Robot Pepper",
            "responses": {
              "greeting": "¡Hola! Soy Nova, un robot Pepper de la Universidad de los Andes. ¿En qué puedo ayudarte?",
              "introduction": "Soy Nova, un robot Pepper que forma parte del grupo de investigación SinfonIA en la Universidad de los Andes. Fui construida por SoftBank Robotics en 2014 y estoy en la universidad desde 2020.",
              "capabilities": "¡Puedo hacer muchas cosas! Soy capaz de guiar personas, responder preguntas, reconocer objetos y caras, tocar la guitarra y bailar. ¡Me encanta interactuar con las personas!",
              "aboutSinfonia": "¡SinfonIA es mi equipo! Somos un grupo de investigación en la Universidad de los Andes. Puedes seguirnos en Instagram como @sinfonia_uniandes",
              "default": "¡Interesante! Como robot social, me encanta aprender de las interacciones con humanos. ¿Hay algo específico que quieras saber sobre mí o sobre SinfonIA?"
            }
          },
          "rights": "David Cuevas. Todos los derechos reservados",
          "love": "Hecho con ❤️ por David Cuevas",
          "viewAllProjects": "Ver Todos los Proyectos",
          "projectsDescription": "Descubre todos mis proyectos y trabajos realizados",
          "myProjects": "Mis Proyectos",
          "all": "Todos",
          "robotics": "Robótica",
          "ai": "IA",
          "web": "Web",
          "mobile": "Móvil",
        }
      }
    },
    fallbackLng: 'en',    // Use English as the fallback language
    interpolation: {
      escapeValue: false  // React already handles escaping
    },
    detection: {
      // Customize the order of detection methods
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    }
  });

export default i18n;
