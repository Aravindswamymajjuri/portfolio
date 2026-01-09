import React from 'react';

const Certificates = ({ darkMode }) => {
  const certificates = [
    {
      title: "Foundations of Modern Machine Learning",
      issuer: "IIIT Hyderabad",
      grade: "Grade A"
    },
    {
      title: "Winter Internship Certificate",
      issuer: "IIIT Hyderabad RCTS"
    },
    {
      title: "Python Advanced Certification",
      issuer: "EDYST"
    }
  ];

  return (
    <section id="certificates" className={`certificates-section ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="certificates-container">
        <h2 className="section-title">Certifications</h2>
        <div className="certificates-list">
          {certificates.map((cert, index) => (
            <div key={index} className="certificate-item">
              <h3>{cert.title}</h3>
              <p className="issuer">{cert.issuer}</p>
              {cert.grade && <p className="grade">{cert.grade}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
