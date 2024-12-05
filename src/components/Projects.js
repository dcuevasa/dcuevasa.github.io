import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Projects.css';

import imgRoboCupTeam from '../assets/SinfonIA-RoboCup-Team.jpeg';
import freeBird from '../assets/logo.svg';
import NLP from '../assets/NLP.jpg';
import pepperListen from '../assets/Pepper-hi-high-res.png'
import pepperController from '../assets/pepper-gamepad-header.jpg';
import sustaniU from '../assets/sustainu.png'

const Projects = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('all');
    const projects = [
        {
            id: 1,
            title: 'RoboCup@Home',
            description: t('projects-list.robocup.description'),
            category: 'robotics',
            image: imgRoboCupTeam,
            tags: ['ROS', 'Python', 'Robotics'],
            github: "https://github.com/SinfonIAUniandes/task_utilities"
        },
        {
            id: 2,
            title: 'Pepper NLP',
            description: t('projects-list.pepperNLP.description'),
            category: 'ai',
            image: NLP,
            tags: ['NLP', 'Python', 'AI'],
            github: "https://github.com/SinfonIAUniandes/speech_utilities"
        },
        {
            id: 3,
            title: 'Pepper Speech-to-Text',
            description: t('projects-list.pepperSTT.description'),
            category: 'ai',
            image: pepperListen,
            tags: ['Speech Recognition', 'Real-time', 'Python'],
            github: "https://github.com/SinfonIAUniandes/speech_utilities"
        },
        {
            id: 4,
            title: 'Pepper Web Controller',
            description: t('projects-list.pepperControl.description'),
            category: 'web',
            image: pepperController,
            tags: ['React', 'ROS', 'WebSockets'],
            github: "https://github.com/SinfonIAUniandes/web-remote-controller"
        },
        {
            id: 5,
            title: 'SustainU',
            description: t('projects-list.sustainU.description'),
            category: 'mobile',
            image: sustaniU,
            tags: ['Flutter', 'AI', 'Mobile'],
            github: 'https://github.com/ISIS3510-Team14/Flutter'
        },
        {
            id: 6,
            title: 'FreeBird',
            description: t('projects-list.freeBird.description'),
            category: 'web',
            image: freeBird,
            tags: ['React', 'Node.js', 'Full Stack'],
            github: 'https://github.com/dcuevasa/ISIS3710_202420_S2_E2_Front'
        },
        {
            id: 7,
            title: 'P3DX Navigation',
            description: t('projects-list.p3dx.description'),
            category: 'robotics',
            image: "https://www.researchgate.net/profile/Fernando-De-La-Rosa/publication/236013145/figure/fig2/AS:380488092012546@1467726838739/P3DX-mobile-robot-equipped-with-an-URG-laser-rangefinder.png",
            tags: ['ROS', 'Python', 'Robotics'],
            github: "https://github.com/dcuevasa/P3DX-Navigation"
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