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
            className="profile-card"
            variants={imageVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="profile-image-container">
              <motion.img 
                src={profileImage} 
                alt="Aravind Swamy Majjuri Profile" 
                className="profile-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="image-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {/* <div className="social-links">
                  <motion.a 
                    href="https://github.com/Aravindswamymajjuri" 
                    className="social-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="fab fa-github"></i>
                  </motion.a>
                  <motion.a 
                    href="https://linkedin.com/in/aravind-swamy-majjuri" 
                    className="social-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="fab fa-linkedin"></i>
                  </motion.a>
                  <motion.a 
                    href="mailto:aravindswamymajjuri143@gmail.com" 
                    className="social-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Email"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="fas fa-envelope"></i>
                  </motion.a>
                </div> */}
              </motion.div>
              
              <motion.div 
                className="profile-info"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3>Aravind Swamy Majjuri</h3>
                <p className="title">AI & Data Science Student | Full Stack Developer</p>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i> Kakinada, Andhra Pradesh, India
                </p>
              </motion.div>
            </div>
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