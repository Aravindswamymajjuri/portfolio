import React from 'react';

const Experience = ({ darkMode }) => {
  const experiences = [
    {
      role: "Software Development Intern",
      company: "Teach for India (ClassLog), IIIT Hyderabad",
      period: "Dec 2024 – Jan 2025",
      description: "Developed AI-powered classroom assistant using Computer Vision, NLP, and OpenCV for student engagement analysis.",
      highlights: [
        "Built backend modules with Flask and Librosa for audio processing",
        "Integrated Google Generative AI with Transformers",
        "Created Bootstrap-based frontend dashboards"
      ]
    },
    {
      role: "Full Stack Intern",
      company: "EduSkill (AICTE)",
      period: "Oct 2024 – Dec 2024",
      description: "Built MERN applications with JWT authentication and secure CRUD operations.",
      highlights: [
        "Developed REST APIs and WebSocket-based real-time features",
        "Collaborated with 5-member team in Agile workflow",
        "Managed Git branching and pull requests"
      ]
    },
    {
      role: "Summer of AI Intern",
      company: "Swecha Telangana",
      period: "May 2024 – June 2024",
      description: "Built sentiment analysis ML model achieving 92% accuracy with TF-IDF + RandomForest.",
      highlights: [
        "Handled preprocessing and feature engineering",
        "Performed model tuning and evaluation",
        "Deployed production-ready ML pipeline"
      ]
    }
  ];

  return (
    <section id="experience" className={`experience-section ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="experience-container">
        <h2 className="section-title">Internship Experience</h2>
        <div className="experiences-list">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.role} — {exp.company}</h3>
              <p className="period">{exp.period}</p>
              <p className="description">{exp.description}</p>
              <ul className="highlights">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
