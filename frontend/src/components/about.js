// About.js
import React from 'react';
import './about.css';
import profileImage from '../components/portfolio.jpg'; 

const About = ({ darkMode }) => {
  return (
    <section id="about" className={`about-section ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="profile-card">
            <div className="profile-image-container">
              <img 
                src={profileImage} 
                alt="Aravind Swamy Majjuri Profile" 
                className="profile-image"
              />
              <div className="image-overlay">
                <div className="social-links">
                  <a 
                    href="https://github.com/Aravindswamymajjuri" 
                    className="social-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a 
                    href="https://linkedin.com/in/aravind-swamy-majjuri" 
                    className="social-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a 
                    href="mailto:aravindswamymajjuri143@gmail.com" 
                    className="social-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Email"
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
              
              <div className="profile-info">
                <h3>Aravind Swamy Majjuri</h3>
                <p className="title">AI & Data Science Student | Full Stack Developer</p>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i> Kakinada, Andhra Pradesh, India
                </p>
              </div>
            </div>
          </div>

          <div className="about-text">
            <div className="text-content">
              <p className="bio">
                I'm an AI & Data Science undergraduate passionate about building intelligent web applications. 
                With hands-on experience in Machine Learning, MERN stack development, and REST APIs, I love 
                turning complex problems into elegant, scalable solutions. I've completed 5 technical internships 
                and actively contribute to open-source projects.
              </p>
              
              <div className="experience-cards">
                <div className="exp-card">
                  <span className="exp-number">5</span>
                  <span className="exp-label">Internships</span>
                </div>
                <div className="exp-card">
                  <span className="exp-number">10+</span>
                  <span className="exp-label">Projects</span>
                </div>
                <div className="exp-card">
                  <span className="exp-number">92%</span>
                  <span className="exp-label">ML Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;