import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Projects.css";

import projectsData from "./projects.json";

import imgRoboCupTeam from "../assets/SinfonIA-RoboCup-Team.jpeg";
import freeBird from "../assets/logo.svg";
import NLP from "../assets/NLP.jpg";
import pepperListen from "../assets/Pepper-hi-high-res.png";
import pepperController from "../assets/pepper-gamepad-header.jpg";
import sustaniU from "../assets/sustainu.png";
import serviceFinder from "../assets/serviceFinder.png";
import defaultProjectLogo from "../assets/logopepper.svg";
import geomagicTouch from "../assets/geomagic-touch.png";
import pepperNavigation from "../assets/navigation.png";

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const imageMap = {
    imgRoboCupTeam,
    freeBird,
    NLP,
    pepperListen,
    pepperController,
    sustaniU,
    serviceFinder,
    geomagicTouch,
    pepperNavigation,
  };

  const defaultLogo = defaultProjectLogo;

  const projects = projectsData.map((project) => ({
    ...project,
    title: t(project.title),
    description: t(project.description),
    image:
      project.image && project.image !== ""
        ? project.image.includes("http")
          ? project.image
          : imageMap[project.image] || defaultLogo
        : defaultLogo,
  }));

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultLogo;
  };

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.area === filter);

  // Group projects by Research Line
  const groupedProjects = filteredProjects.reduce((acc, project) => {
    const line = project.research_line || "others";
    if (!acc[line]) acc[line] = [];
    acc[line].push(project);
    return acc;
  }, {});

  return (
    <div className="projects-container">
      <h1 className="projects-title text-center mb-5">{t("myProjects")}</h1>

      <div className="filters mb-5">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          {t("all")}
        </button>
        <button
          className={`filter-btn ${filter === "robotics" ? "active" : ""}`}
          onClick={() => setFilter("robotics")}
        >
          {t("robotics")}
        </button>
        <button
          className={`filter-btn ${filter === "ai" ? "active" : ""}`}
          onClick={() => setFilter("ai")}
        >
          {t("ai")}
        </button>
        <button
          className={`filter-btn ${filter === "mobile" ? "active" : ""}`}
          onClick={() => setFilter("mobile")}
        >
          {t("mobile")}
        </button>
      </div>

      {Object.keys(groupedProjects).map((line) => (
        <div key={line} className="research-line-group mb-5">
          <h2 className="research-line-title mb-4">
            <span className="badge bg-secondary">{t(line)}</span>
          </h2>
          <div className="projects-grid">
            {groupedProjects[line].map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={handleImageError}
                  />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link"
                    >
                      <i className="fab fa-github"></i> {t("GitHub")}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
