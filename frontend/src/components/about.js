// About.js
import React from 'react';
import './about.css';

const About = () => {
  const skills = [
    { category: 'Frontend', items: ['React', 'Vue', 'Angular', 'JavaScript'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Java', 'PHP'] },
    { category: 'Database', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Firebase'] }
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="profile-card">
            <div className="profile-image-container">
              <img 
                src="/path-to-your-image.jpg" 
                alt="Profile" 
                className="profile-image"
              />
              <div className="image-overlay">
                <div className="social-links">
                  <a href="#" className="social-link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="profile-info">
              <h3>John Doe</h3>
              <p className="title">Full Stack Developer</p>
              <p className="location">
                <i className="fas fa-map-marker-alt"></i> New York, USA
              </p>
            </div>
          </div>

          <div className="about-text">
            <div className="text-content">
              <p className="bio">
                I'm a passionate Full Stack Developer with 5 years of experience 
                in building web applications. I love turning complex problems into 
                simple, beautiful and intuitive solutions.
              </p>
              
              <div className="experience-cards">
                <div className="exp-card">
                  <span className="exp-number">5+</span>
                  <span className="exp-label">Years Experience</span>
                </div>
                <div className="exp-card">
                  <span className="exp-number">50+</span>
                  <span className="exp-label">Projects Completed</span>
                </div>
                <div className="exp-card">
                  <span className="exp-number">30+</span>
                  <span className="exp-label">Happy Clients</span>
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