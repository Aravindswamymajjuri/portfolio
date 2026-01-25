import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import './about.css';

const Experience = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [showAll, setShowAll] = useState(false);

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
      ],
      icon: "🚀"
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
      ],
      icon: "💻"
    },
    {
      role: "MERN Stack Developer Intern",
      company: "KHUB (RCTS Lab, IIIT Hyderabad)",
      period: "May 2024 – Present",
      description: "Built and scaled role-based web platforms for academic and innovation management. Started as Junior Developer on DevOrbit and progressed to Team Lead for DevStack, a hackathon management platform.",
      highlights: [
        "Developed core features for project, team, task, and resource management with role-based dashboards",
        "Built frontend-backend integrations and implemented database operations with MongoDB",
        "Integrated GitHub-based project tracking and automated certificate generation",
        "Led team to design end-to-end hackathon workflow and planned system architecture",
        "Reviewed code, assigned tasks, and mentored team members"
      ],
      icon: "🎯"
    }
   
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Display only first 4 experiences or all based on showAll state
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className={`experience-section ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="experience-container">
        <motion.h2 
          className="section-title"
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span className="title-decoration">Internship</span> Experience
        </motion.h2>
        
        <motion.div 
          ref={ref}
          className="experiences-list timeline"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {displayedExperiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="experience-item timeline-item"
              variants={itemVariants}
              whileHover={{ 
                x: 10,
                boxShadow: "0 20px 40px rgba(96, 165, 250, 0.2)"
              }}
            >
              <motion.div 
                className="timeline-icon"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
              >
                <span>{exp.icon}</span>
              </motion.div>
              
              <div className="experience-content">
                <div className="experience-header">
                  <h3>
                    <Briefcase size={18} className="inline-icon" />
                    {exp.role}
                  </h3>
                  <span className="company">{exp.company}</span>
                </div>
                
                <motion.p 
                  className="period"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.2 }}
                >
                  <Calendar size={14} /> {exp.period}
                </motion.p>
                
                <p className="description">{exp.description}</p>
                
                <motion.ul className="highlights">
                  {exp.highlights.map((highlight, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.2 + idx * 0.1 }}
                      whileHover={{ x: 5, color: "#60a5fa" }}
                    >
                      <ChevronRight size={14} className="highlight-icon" />
                      {highlight}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {experiences.length > 3 && (
          <motion.div 
            className="view-more-container"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <button 
              className="view-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <span>View Less</span>
                  <ChevronUp size={20} />
                </>
              ) : (
                <>
                  <span>View More</span>
                  <ChevronDown size={20} />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Experience;
