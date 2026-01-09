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

const Projects = ({ darkMode }) => {
  const projects = [
    {
      title: "ClassLog - AI Classroom Assistant",
      description: "AI-powered classroom assistant using Computer Vision, NLP, and OpenCV for student engagement analysis with real-time audio processing and generative AI integration.",
      image: "/project1.jpg",
      tags: ["Python", "OpenCV", "Flask", "Transformers", "Google AI", "Bootstrap"],
      demo: "https://demo.com",
      github: "https://github.com/Aravindswamymajjuri"
    },
    {
      title: "MERN Full Stack Application",
      description: "Full-stack web application with JWT authentication, secure CRUD operations, REST APIs, and WebSocket-based real-time features built using Agile methodology.",
      image: "/project2.jpg",
      tags: ["React", "Node.js", "MongoDB", "Express", "JWT", "WebSocket"],
      demo: "https://demo.com",
      github: "https://github.com/Aravindswamymajjuri"
    },
    {
      title: "Sentiment Analysis ML Model",
      description: "Machine Learning model for sentiment analysis achieving 92% accuracy using TF-IDF vectorization and RandomForest classifier with production-ready ML pipeline.",
      image: "/project3.jpg",
      tags: ["Python", "Scikit-learn", "TF-IDF", "RandomForest", "NLP"],
      demo: "https://demo.com",
      github: "https://github.com/Aravindswamymajjuri"
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with React featuring dark/light mode, smooth animations, and mobile-first design approach.",
      image: "/project4.jpg",
      tags: ["React", "CSS3", "Framer Motion", "Responsive Design"],
      demo: "https://demo.com",
      github: "https://github.com/Aravindswamymajjuri"
    }
  ];

  return (
    <section id="projects" className={`projects-section ${darkMode ? 'dark-mode' : 'light-mode'}`}>
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