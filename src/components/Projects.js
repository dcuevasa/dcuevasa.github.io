import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Projects.css';

import projectsData from './projects.json';

import imgRoboCupTeam from '../assets/SinfonIA-RoboCup-Team.jpeg';
import freeBird from '../assets/logo.svg';
import NLP from '../assets/NLP.jpg';
import pepperListen from '../assets/Pepper-hi-high-res.png'
import pepperController from '../assets/pepper-gamepad-header.jpg';
import sustaniU from '../assets/sustainu.png'
import serviceFinder from '../assets/serviceFinder.png'

const Projects = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('all');

    const imageMap = {
        imgRoboCupTeam,
        freeBird,
        NLP,
        pepperListen,
        pepperController,
        sustaniU,
        serviceFinder
    };
    
    const projects = projectsData.map(project => ({
        ...project,
        description: t(project.description),
        image: project.image.includes('http') ? project.image : imageMap[project.image]
    }));

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
                                    <i className="fab fa-github"></i> {t('GitHub')}
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