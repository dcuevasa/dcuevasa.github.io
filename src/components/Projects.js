import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Projects.css';

import imgRoboCupTeam from '../assets/SinfonIA-RoboCup-Team.jpeg';
import freeBird from '../assets/logo.svg';
import NLP from '../assets/NLP.jpg';
import pepperListen from '../assets/Pepper-hi-high-res.png'
import pepperController from '../assets/pepper-gamepad-header.jpg';

const Projects = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('all');
    const projects = [
        {
            id: 1,
            title: 'RoboCup@Home',
            description: 'Desarrollo de sistemas para competencia internacional de robótica de servicio',
            category: 'robotics',
            image: imgRoboCupTeam,
            tags: ['ROS', 'Python', 'Robotics'],
            github: null
        },
        {
            id: 2,
            title: 'Pepper NLP',
            description: 'Sistema de procesamiento de lenguaje natural para el robot Pepper',
            category: 'ai',
            image: NLP,
            tags: ['NLP', 'Python', 'AI'],
            github: null
        },
        {
            id: 3,
            title: 'Pepper Speech-to-Text',
            description: 'Sistema de reconocimiento de voz en tiempo real',
            category: 'ai',
            image: pepperListen,
            tags: ['Speech Recognition', 'Real-time', 'Python'],
            github: null
        },
        {
            id: 4,
            title: 'Pepper Web Controller',
            description: 'Interfaz web para control remoto del robot Pepper',
            category: 'web',
            image: pepperController,
            tags: ['React', 'ROS', 'WebSockets'],
            github: null
        },
        {
            id: 5,
            title: 'SustainU',
            description: 'Aplicación móvil para reciclaje con Inteligencia Artificial',
            category: 'mobile',
            image: 'https://private-user-images.githubusercontent.com/88736581/365496060-a86f06de-727b-4a93-83be-21ee35cbeee3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMzMzI2ODMsIm5iZiI6MTczMzMzMjM4MywicGF0aCI6Ii84ODczNjU4MS8zNjU0OTYwNjAtYTg2ZjA2ZGUtNzI3Yi00YTkzLTgzYmUtMjFlZTM1Y2JlZWUzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjA0VDE3MTMwM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTAzNTU4ZjM4NzM5ZDExZmM3M2NjZTkyOTM0ZGRmZDRiNDNkZWQ3NDc3NzhmMzA3ZTc4Yzk1NjRkOTFhYTA1YTImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.HOzbQl-SZmyTFu15MUmztj8lFlMQ0y0Xhq25CcJAK6c',
            tags: ['Flutter', 'AI', 'Mobile'],
            github: 'https://github.com/ISIS3510-Team14/Flutter'
        },
        {
            id: 6,
            title: 'FreeBird',
            description: 'Plataforma web para planificación de viajes',
            category: 'web',
            image: freeBird,
            tags: ['React', 'Node.js', 'Full Stack'],
            github: 'https://github.com/dcuevasa/ISIS3710_202420_S2_E2_Front'
        }
    ];

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);

    return (
        <div className="projects-container">
            <h1 className="projects-title">{t('myProjects')}</h1>
            
            <div className="filters">
                <button 
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    {t('all')}
                </button>
                <button 
                    className={`filter-btn ${filter === 'robotics' ? 'active' : ''}`}
                    onClick={() => setFilter('robotics')}
                >
                    {t('robotics')}
                </button>
                <button 
                    className={`filter-btn ${filter === 'ai' ? 'active' : ''}`}
                    onClick={() => setFilter('ai')}
                >
                    {t('ai')}
                </button>
                <button 
                    className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
                    onClick={() => setFilter('web')}
                >
                    {t('web')}
                </button>
                <button 
                    className={`filter-btn ${filter === 'mobile' ? 'active' : ''}`}
                    onClick={() => setFilter('mobile')}
                >
                    {t('mobile')}
                </button>
            </div>

            <div className="projects-grid">
                {filteredProjects.map(project => (
                    <div key={project.id} className="project-card">
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tags">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                            {project.github && (
                                <a 
                                    href={project.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="github-link"
                                >
                                    <i className="fab fa-github"></i> Ver en GitHub
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;