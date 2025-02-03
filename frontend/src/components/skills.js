// Skills.js
import React, { useEffect, useRef } from 'react';
import './skills.css';

const Skills = () => {
  const skillsRef = useRef(null);

  const skills = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'CSS/SASS', level: 80 },
        { name: 'Vue.js', level: 75 }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 70 },
        { name: 'PHP', level: 65 }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar) => observer.observe(bar));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={skillsRef}>
      <div className="skills-container">
        <h2 className="section-title">My Skills</h2>
        
        <div className="skills-content">
          {skills.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ '--progress': `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-cards">
          <div className="skill-card" data-aos="fade-up">
            <i className="fas fa-laptop-code"></i>
            <h4>Web Development</h4>
            <p>Building responsive and performant web applications</p>
          </div>
          <div className="skill-card" data-aos="fade-up" data-aos-delay="100">
            <i className="fas fa-mobile-alt"></i>
            <h4>Mobile Development</h4>
            <p>Creating cross-platform mobile applications</p>
          </div>
          <div className="skill-card" data-aos="fade-up" data-aos-delay="200">
            <i className="fas fa-database"></i>
            <h4>Database Design</h4>
            <p>Designing efficient database structures</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;