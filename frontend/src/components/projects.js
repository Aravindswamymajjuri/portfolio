import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import './project.css';

const ProjectCard = ({ project, index }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="project-card"
      variants={cardVariants}
      whileHover={{ 
        y: -15,
        boxShadow: "0 25px 50px rgba(96, 165, 250, 0.25)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-image-container">
        <motion.img 
          src={project.image} 
          alt={project.title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div 
          className="project-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div 
            className="overlay-content"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
          >
            <span className="view-project">View Project <ArrowRight size={16} /></span>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        className="project-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, tagIndex) => (
            <motion.span 
              key={tagIndex} 
              className="tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + tagIndex * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <div className="project-links">
          <motion.a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} /> Live Demo
          </motion.a>
          <motion.a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} /> Code
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

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
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <span className="title-highlight">My</span> Projects
      </motion.h2>
      <motion.div 
        ref={ref}
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;