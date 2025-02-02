import React from 'react';
import './project.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-external-link-alt"></i> Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> Code
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application...",
      image: "/project1.jpg",
      tags: ["React", "Node.js", "MongoDB"],
      demo: "https://demo.com",
      github: "https://github.com"
    },
    {
      title: "Project 2",
      description: "A mobile-responsive website...",
      image: "/project2.jpg",
      tags: ["React", "Tailwind", "Firebase"],
      demo: "https://demo.com",
      github: "https://github.com"
    },
    {
      title: "Project 3",
      description: "An e-commerce platform...",
      image: "/project3.jpg",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      demo: "https://demo.com",
      github: "https://github.com"
    },
    {
      title: "Project 3",
      description: "An e-commerce platform...",
      image: "/project3.jpg",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      demo: "https://demo.com",
      github: "https://github.com"
    }
   
    // Add more projects as needed
  ];

  return (
    <section id="projects" className="projects-section">
      <h2>My Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;