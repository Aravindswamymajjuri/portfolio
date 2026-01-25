// About.js
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './about.css';
import profileImage from '../components/portfolio.jpg'; 

const About = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const stats = [
    { number: "5", label: "Internships" },
    { number: "10+", label: "Projects" },
    { number: "12+", label: "Tech Skills" }
  ];

  return (
    <section id="about" className={`about-section ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <motion.div 
        ref={ref}
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="section-title"
          variants={itemVariants}
        >
          <span className="title-decoration">About</span> Me
        </motion.h2>
        
        <div className="about-content">
          <motion.div 
            className="profile-card-wrapper"
            variants={imageVariants}
          >
            <motion.div 
              className="profile-card-modern"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image container */}
              <div className="profile-image-wrapper">
                <motion.div 
                  className="profile-image-container-modern"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={profileImage} 
                    alt="Aravind Swamy Majjuri Profile" 
                    className="profile-image-modern"
                  />
                  
                  {/* Overlay gradient */}
                  <motion.div 
                    className="profile-overlay-gradient"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              
                
              </div>
              
              {/* Profile info card */}
              <motion.div 
                className="profile-info-modern"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="profile-name">Aravind Swamy Majjuri</h3>
                <p className="profile-title">AI & Data Science Student</p>
                <p className="profile-subtitle">Full Stack Developer</p>
                <div className="profile-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>Kakinada, Andhra Pradesh</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="about-text"
            variants={itemVariants}
          >
            <div className="text-content">
              <motion.p 
                className="bio"
                variants={itemVariants}
              >
                I'm an AI & Data Science undergraduate passionate about building intelligent web applications. 
                With hands-on experience in Machine Learning, MERN stack development, and REST APIs, I love 
                turning complex problems into elegant, scalable solutions. I've completed 5 technical internships 
                and actively contribute to open-source projects.
              </motion.p>
              
              <div className="experience-cards">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="exp-card"
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 20px 40px rgba(96, 165, 250, 0.3)"
                    }}
                  >
                    <motion.span 
                      className="exp-icon"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatDelay: index * 0.5
                      }}
                    >
                      {stat.icon}
                    </motion.span>
                    <motion.span 
                      className="exp-number"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                    >
                      {stat.number}
                    </motion.span>
                    <span className="exp-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;