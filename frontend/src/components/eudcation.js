import React from 'react';
import './education.css';

const Education = ({ darkMode }) => {
  const educationData = [
    {
      title: "Bachelor of Technology",
      institution: "Kakinada Institute of Engineering and Technology",
      duration: "2022 - 2026",
      description: "Pursuing my Bachelor's Degree in Computer Science (Artifical Intelligence and Data Science) at Kiet group of Institutions, I'm gaining in-depth knowledge in areas like Data Science, Machine Learning, and Web Development. With a GPA of 7.9.",
      icon: "🎓",
    },
    {
      title: "Intermediate",
      institution: "Pragati Junior College",
      duration: "2020 - 2022",
      description: "I completed my Intermediate at Pragati Junior College in the group of MPC.",
      icon: "🎖",
    },
    {
      title: "High School",
      institution: "Sri Surya E.M High School",
      duration: "2007 - 2020",
      description: "I completed my Schooling at Sri Surya E.M High School.",
      icon: "📚",
    },
  ];

  return (
    <div className={darkMode ? 'education-container dark-mode' : 'education-container light-mode'}>
      <h2 className="education-title">Education & Certifications</h2>
      <div className="education-cards">
        {educationData.map((edu, index) => (
          <div key={index} className="education-card">
            <div className="education-icon">{edu.icon}</div>
            <h3 className="education-heading">{edu.title}</h3>
            <p className="education-institution">{edu.institution}</p>
            <p className="education-duration">{edu.duration}</p>
            <p className="education-description">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
