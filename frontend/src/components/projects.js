import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCarousel = ({ darkMode = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [dragStart, setDragStart] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const carouselRef = useRef(null);

  const projects = [
    {
      title: "Dev-Stack — Full Stack Collaboration Platform",
      description: "Built a full-stack academic and hackathon management platform using React, Node.js, Express, and MongoDB. Implemented role-based dashboards for students, mentors, and admins with secure authentication.",
      image: "/devstack.png",
      tags: ["React", "Node.js", "Express", "MongoDB", "Authentication"],
      demo: "https://dev-orbit-1.vercel.app/",
      github: "https://github.com/Aravindswamymajjuri/Dev-Orbit"
    },
    {
      title: "Music Streaming & Real-Time Collaboration App",
      description: "Built a full-stack music streaming platform with JWT authentication, song upload and streaming via MongoDB GridFS. Implemented real-time collaboration using Socket.io shared rooms, live updates, and a responsive React.",
      image: "/app.jpeg",
      tags: ["React", "MongoDB", "JWT", "Socket.io", "GridFS"],
      demo: "https://musicapp-red.vercel.app/login",
      github: "https://github.com/Aravindswamymajjuri/Musicapp"
    },
    {
      title: "Alarm — Full Stack PWA",
      description: "Built a full-stack PWA for task scheduling with authentication, CRUD operations, and recurring job scheduling. Designed a responsive experience for managing tasks, reminders, and daily workflows.",
      image: "/task.jpeg",
      tags: ["PWA", "React", "Node.js", "Authentication", "CRUD"],
      demo: "https://tasknotification.vercel.app/login",
      github: "https://github.com/Aravindswamymajjuri/Alaram"
    }
  ];

  const totalProjects = projects.length;
  const [radius, setRadius] = useState(450);
  const centerCardIndex = currentIndex % totalProjects;

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth <= 480) {
        setRadius(280);
      } else if (window.innerWidth <= 768) {
        setRadius(350);
      } else if (window.innerWidth <= 1024) {
        setRadius(400);
      } else {
        setRadius(450);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoRotating) {
      interval = setInterval(() => {
        setCurrentIndex(prev => prev + 1);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleMouseDown = (e) => {
    setDragStart(e.clientX || e.touches[0].clientX);
  };

  const handleMouseUp = (e) => {
    if (dragStart !== null) {
      const dragEnd = e.clientX || e.changedTouches[0].clientX;
      const diff = dragStart - dragEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      setDragStart(null);
    }
  };

  const getCardStyle = (index) => {
    const totalCards = projects.length;
    const angle = ((index - currentIndex) * 360) / totalCards;
    const isCenter = index % totalCards === centerCardIndex;
    
    return {
      transform: `rotateY(${angle}deg) translateZ(${radius}px) ${isCenter ? 'scale(1.15)' : 'scale(0.85)'}`,
      opacity: isCenter ? 1 : 0.5,
      zIndex: isCenter ? 10 : 1,
      filter: isCenter ? 'brightness(1.1)' : 'brightness(0.6)',
      pointerEvents: isCenter ? 'auto' : 'none'
    };
  };

  return (
    <div className={`carousel-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <div className="carousel-header">
        <h2 className="carousel-title">
          <span className="title-decoration">My</span> Projects
        </h2>
        <button 
          className="view-all-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Carousel' : 'View All'}
        </button>
      </div>

      {!showAll ? (
      <>
      <div 
        className="carousel-container"
        onMouseEnter={() => setIsAutoRotating(false)}
        onMouseLeave={() => setIsAutoRotating(true)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        ref={carouselRef}
      >
        <div className="carousel-scene">
          <div className="carousel-track">
            {projects.map((project, index) => {
              const actualIndex = ((index - centerCardIndex + totalProjects) % totalProjects);
              const isActive = actualIndex === 0;
              
              return (
                <motion.div
                  key={`${project.title}-${index}`}
                  className={`project-card-3d ${isActive ? 'active' : ''}`}
                  style={getCardStyle(index)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="card-inner">
                    <div className="card-image">
                      <img src={project.image} alt={project.title} />
                      <div className={`card-glow ${isActive ? 'active-glow' : ''}`}></div>
                    </div>
                    <div className="card-content">
                      <div className="card-main">
                        <h3 className="card-title">{project.title}</h3>
                        <p className="card-description">{project.description}</p>
                        <div className="card-tags">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="card-links">
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="card-link">
                            <ExternalLink size={16} />
                            <span>Demo</span>
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-link">
                            <Github size={16} />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <button className="nav-btn prev-btn" onClick={handlePrev} aria-label="Previous">
          <ChevronLeft size={32} />
        </button>
        <button className="nav-btn next-btn" onClick={handleNext} aria-label="Next">
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="carousel-indicators">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === centerCardIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
      </>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-grid-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="grid-card-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="grid-card-content">
                <h3 className="grid-card-title">{project.title}</h3>
                <p className="grid-card-description">{project.description}</p>
                <div className="grid-card-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="grid-card-links">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="card-link">
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-link">
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .carousel-wrapper {
          min-height: 100vh;
          padding: 3rem 1rem;
          background: #ffff
          color: #0f172a;
          overflow: hidden;
          width: 100%;
          transition: all 0.3s ease;
        }

        .carousel-wrapper.dark-mode {
          background: #0f172a;
          color: #e2e8f0;
        }

        .carousel-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          
        }

        .view-all-btn {
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 2px solid rgba(96, 165, 250, 0.4);
          border-radius: 25px;
          color: #2563eb;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .dark-mode .view-all-btn {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          border: 2px solid rgba(96, 165, 250, 0.3);
          color: #60a5fa;
        }

        .view-all-btn:hover {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border-color: #60a5fa;
          transform: translateY(-50%) scale(1.05);
          box-shadow: 0 5px 20px rgba(96, 165, 250, 0.3);
        }

        .dark-mode .view-all-btn:hover {
          box-shadow: 0 5px 20px rgba(96, 165, 250, 0.4);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .project-grid-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(96, 165, 250, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .dark-mode .project-grid-card {
          background: linear-gradient(135deg, #1a1f35 0%, #0a0e1a 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .project-grid-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(96, 165, 250, 0.2);
        }

        .dark-mode .project-grid-card:hover {
          box-shadow: 0 20px 40px rgba(96, 165, 250, 0.3);
        }

        .grid-card-image {
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .grid-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-grid-card:hover .grid-card-image img {
          transform: scale(1.1);
        }

        .grid-card-content {
          padding: 1.5rem;
        }

        .grid-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }

        .dark-mode .grid-card-title {
          color: #f1f5f9;
        }

        .grid-card-description {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .dark-mode .grid-card-description {
          color: #cbd5e1;
        }

        .grid-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .grid-card-links {
          display: flex;
          gap: 0.75rem;
        }


        .carousel-title {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .title-gradient {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-content::-webkit-scrollbar {
          width: 4px;
        }

        .card-content::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.5);
          border-radius: 10px;
        }

        .dark-mode .card-content::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
        }

        .card-content::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.6);
          border-radius: 10px;
        }

        .dark-mode .card-content::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.5);
        }

        .card-content::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.8);
        }

        .dark-mode .card-content::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.7);
        }

        .carousel-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          font-weight: 400;
        }

        .dark-mode .carousel-subtitle {
          color: #94a3b8;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 1100px;
          height: 500px;
          margin: 0 auto;
          cursor: grab;
          user-select: none;
          overflow: hidden;
        }

        .carousel-container:active {
          cursor: grabbing;
        }

        .carousel-scene {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 2000px;
          perspective-origin: 50% 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-track {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card-3d {
          position: absolute;
          width: 320px;
          height: 420px;
          left: 50%;
          top: 50%;
          margin-left: -160px;
          margin-top: -210px;
          transform-style: preserve-3d;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          backface-visibility: hidden;
        }

        .project-card-3d.active {
          filter: brightness(1.1) drop-shadow(0 0 30px rgba(96, 165, 250, 0.5));
        }

        .card-inner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(96, 165, 250, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          backface-visibility: hidden;
        }

        .dark-mode .card-inner {
          background: linear-gradient(135deg, #1a1f35 0%, #0a0e1a 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .project-card-3d:hover .card-inner {
          box-shadow: 0 25px 70px rgba(96, 165, 250, 0.25);
        }

        .dark-mode .project-card-3d:hover .card-inner {
          box-shadow: 0 25px 70px rgba(96, 165, 250, 0.3);
        }

        .card-image {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
        }

        .card-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

       

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          // background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.8) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dark-mode .card-glow {
          background: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.8) 100%);
        }

        .card-glow.active-glow {
          opacity: 1;
          // background: linear-gradient(180deg, rgba(96, 165, 250, 0.15) 0%, rgba(255, 255, 255, 0.9) 100%);
        }

        .dark-mode .card-glow.active-glow {
          background: linear-gradient(180deg, rgba(96, 165, 250, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%);
        }

        .card-content {
          position: relative;
          padding: 0.9rem 0.9rem 0.7rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          box-sizing: border-box;
        }

        .card-main {
          flex: 1;
          min-height: 0;
          max-height: calc(100% - 4.5rem);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-right: 0.25rem;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 0.15rem;
        }

        .dark-mode .card-title {
          color: #f1f5f9;
        }

        .card-description {
          font-size: 0.8rem;
          color: #475569;
          line-height: 1.5;
          overflow: visible;
        }

        .dark-mode .card-description {
          color: #cbd5e1;
        }

        .card-main::-webkit-scrollbar {
          width: 4px;
        }

        .card-main::-webkit-scrollbar-track {
          background: rgba(148, 163, 184, 0.10);
          border-radius: 9999px;
        }

        .card-main::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.55);
          border-radius: 9999px;
        }

        .dark-mode .card-main::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.75);
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.2rem;
        }

        .tag {
          padding: 0.24rem 0.65rem;
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          border: 1px solid rgba(96, 165, 250, 0.4);
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 600;
          color: #2563eb;
          transition: all 0.3s ease;
        }

        .dark-mode .tag {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border: 1px solid rgba(96, 165, 250, 0.3);
          color: #93c5fd;
        }

        .tag:hover {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%);
          transform: translateY(-2px);
        }

        .dark-mode .tag:hover {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%);
        }

        .card-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          // margin-top: auto;
          // padding-top: 0.25rem;
        }

        .card-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background: rgba(96, 165, 250, 0.22);
          border: 1px solid rgba(96, 165, 250, 0.7);
          border-radius: 10px;
          color: #1d4ed8;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.82rem;
          transition: all 0.3s ease;
        }

        .dark-mode .card-link {
          background: rgba(96, 165, 250, 0.15);
          border: 1px solid rgba(96, 165, 250, 0.3);
          color: #60a5fa;
        }

        .card-link:hover {
          background: rgba(96, 165, 250, 0.2);
          border-color: rgba(96, 165, 250, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(96, 165, 250, 0.25);
        }

        .dark-mode .card-link:hover {
          background: rgba(96, 165, 250, 0.25);
          border-color: rgba(96, 165, 250, 0.5);
          box-shadow: 0 5px 15px rgba(96, 165, 250, 0.3);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(248, 250, 252, 0.95);
          border: 2px solid rgba(96, 165, 250, 0.4);
          color: #2563eb;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .dark-mode .nav-btn {
          background: rgba(30, 41, 59, 0.9);
          border: 2px solid rgba(96, 165, 250, 0.3);
          color: #60a5fa;
        }

        .nav-btn:hover {
          background: rgba(96, 165, 250, 0.2);
          border-color: #60a5fa;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.4);
        }

        .dark-mode .nav-btn:hover {
          background: rgba(96, 165, 250, 0.2);
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }

        .prev-btn {
          left: 5%;
        }

        .next-btn {
          right: 5%;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 3rem;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(148, 163, 184, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.6);
        }

        .indicator:hover:not(.active) {
          background: rgba(148, 163, 184, 0.6);
          transform: scale(1.2);
        }

        @media (max-width: 1200px) {
          .carousel-container {
            height: 500px;
            max-width: 1000px;
          }
          .project-card-3d {
            width: 320px;
            height: 420px;
            margin-left: -160px;
            margin-top: -210px;
          }
          .carousel-wrapper {
            padding: 2.5rem 1rem;
          }
          .card-image {
            height: 170px;
          }
          .card-content {
            padding: 0.9rem;
            gap: 0.45rem;
          }
          .card-title {
            font-size: 1.15rem;
          }
          .card-description {
            font-size: 0.83rem;
          }
          .tag {
            padding: 0.26rem 0.68rem;
            font-size: 0.68rem;
          }
          .card-link {
            padding: 0.5rem 0.95rem;
            font-size: 0.83rem;
          }
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.75rem;
          }
          .carousel-container {
            height: 480px;
            max-width: 900px;
          }
          .project-card-3d {
            width: 300px;
            height: 400px;
            margin-left: -150px;
            margin-top: -200px;
          }
          .card-image {
            height: 160px;
          }
          .card-content {
            padding: 0.85rem;
            gap: 0.4rem;
          }
          .card-title {
            font-size: 1.1rem;
          }
          .card-description {
            font-size: 0.8rem;
          }
          .tag {
            padding: 0.25rem 0.65rem;
            font-size: 0.66rem;
          }
          .card-link {
            padding: 0.48rem 0.9rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 768px) {
          .carousel-wrapper {
            padding: 2rem 0.5rem;
            min-height: auto;
          }
          .view-all-btn {
            position: static;
            transform: none;
            margin: 1rem auto 0;
            display: block;
            padding: 0.65rem 1.3rem;
            font-size: 0.9rem;
          }
          .view-all-btn:hover {
            transform: scale(1.05);
          }
          .carousel-header {
            margin-bottom: 2.5rem;
            
          }
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1rem;
          }
          .grid-card-image {
            height: 180px;
          }
          .carousel-container {
            height: 450px;
            max-width: 100%;
          }
          .project-card-3d {
            width: 280px;
            height: 380px;
            margin-left: -140px;
            margin-top: -190px;
          }
          .nav-btn {
            width: 50px;
            height: 50px;
          }
          .prev-btn {
            left: 1%;
          }
          .next-btn {
            right: 1%;
          }
          .card-image {
            height: 145px;
          }
          .card-content {
            padding: 0.8rem;
            gap: 0.4rem;
          }
          .card-title {
            font-size: 1.05rem;
          }
          .card-description {
            font-size: 0.78rem;
            -webkit-line-clamp: 2;
          }
          .tag {
            padding: 0.24rem 0.62rem;
            font-size: 0.65rem;
          }
          .card-tags {
            gap: 0.35rem;
            margin-top: 0.2rem;
          }
          .card-link {
            padding: 0.45rem 0.85rem;
            font-size: 0.78rem;
            gap: 0.35rem;
          }
          .card-links {
            gap: 0.5rem;
            margin-top: 0.35rem;
          }
          .carousel-header {
            margin-bottom: 2.5rem;
          }
          .carousel-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 640px) {
          .projects-grid {
            padding: 0.75rem;
          }
          .grid-card-content {
            padding: 1.2rem;
          }
          .grid-card-title {
            font-size: 1.2rem;
          }
          .grid-card-description {
            font-size: 0.88rem;
          }
          .carousel-container {
            height: 420px;
          }
          .project-card-3d {
            width: 260px;
            height: 360px;
            margin-left: -130px;
            margin-top: -180px;
          }
          .card-content {
            padding: 0.75rem;
            gap: 0.38rem;
          }
          .card-image {
            height: 135px;
          }
          .card-title {
            font-size: 1rem;
          }
          .card-description {
            font-size: 0.75rem;
          }
          .tag {
            font-size: 0.63rem;
            padding: 0.23rem 0.6rem;
          }
          .card-tags {
            gap: 0.32rem;
          }
          .card-link {
            padding: 0.42rem 0.8rem;
            font-size: 0.76rem;
          }
          .card-links {
            gap: 0.48rem;
          }
        }

        @media (max-width: 480px) {
          .carousel-wrapper {
            padding: 1.5rem 0.5rem;
          }
          .carousel-container {
            height: 400px;
          }
          .project-card-3d {
            width: 240px;
            height: 340px;
            margin-left: -120px;
            margin-top: -170px;
          }
          .card-content {
            padding: 0.7rem;
            gap: 0.35rem;
          }
          .card-image {
            height: 125px;
          }
          .nav-btn {
            width: 45px;
            height: 45px;
          }
          .carousel-header {
            margin-bottom: 2rem;
          }
          .carousel-title {
            font-size: 1.8rem;
          }
          .carousel-subtitle {
            font-size: 0.95rem;
          }
          .card-title {
            font-size: 0.95rem;
          }
          .card-description {
            font-size: 0.72rem;
            -webkit-line-clamp: 2;
          }
          .card-tags {
            gap: 0.3rem;
            margin-top: 0.2rem;
          }
          .tag {
            padding: 0.22rem 0.58rem;
            font-size: 0.62rem;
          }
          .card-link {
            padding: 0.4rem 0.75rem;
            font-size: 0.74rem;
            gap: 0.3rem;
          }
          .card-links {
            gap: 0.45rem;
            margin-top: 0.3rem;
          }
          .prev-btn {
            left: 0.5%;
          }
          .next-btn {
            right: 0.5%;
          }
        }

        @media (max-width: 375px) {
          .carousel-container {
            height: 380px;
          }
          .project-card-3d {
            width: 220px;
            height: 320px;
            margin-left: -110px;
            margin-top: -160px;
          }
          .card-image {
            height: 110px;
          }
          .card-content {
            padding: 0.65rem;
            gap: 0.32rem;
          }
          .nav-btn {
            width: 40px;
            height: 40px;
          }
          .carousel-title {
            font-size: 1.5rem;
          }
          .card-title {
            font-size: 0.9rem;
          }
          .card-description {
            font-size: 0.7rem;
          }
          .tag {
            padding: 0.2rem 0.55rem;
            font-size: 0.6rem;
          }
          .card-link {
            padding: 0.38rem 0.7rem;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectCarousel;