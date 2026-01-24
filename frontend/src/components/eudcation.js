import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './education.css';

const Education = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const educationData = [
    {
      title: "High School",
      institution: "Sri Surya E.M High School",
      duration: "2019 - 2020",
      description: "I completed my Schooling at Sri Surya E.M High School.with a 99.3%",
      color: "#60a5fa"
    },
    {
      title: "Intermediate",
      institution: "Pragati Junior College",
      duration: "2020 - 2022",
      description: "I completed my Intermediate at Pragati Junior College in the group of MPC.with a 90.4%",
      color: "#a78bfa"
    },
    {
      title: "Bachelor of Technology",
      institution: "KIET Group of Institutions",
      duration: "2022 - 2026",
      description: "Pursuing my Bachelor's Degree in Computer Science (Artifical Intelligence and Data Science) With a GPA of 7.9.",
      color: "#f472b6"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className={darkMode ? 'education-container dark-mode' : 'education-container light-mode'} id='education'>
      <motion.h2 
        className="education-title"
        variants={titleVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <span className="title-highlight">Education</span>
      </motion.h2>
      
      <motion.div 
        ref={ref}
        className="education-cards"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {educationData.map((edu, index) => (
          <motion.div 
            key={index} 
            className="education-card"
            custom={index}
            variants={cardVariants}
            whileHover={{ 
              y: -15,
              boxShadow: `0 25px 50px ${edu.color}30`,
              scale: 1.02
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="education-icon"
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
              {edu.icon}
            </motion.div>
            
            <motion.div 
              className="card-accent"
              style={{ background: `linear-gradient(135deg, ${edu.color}, transparent)` }}
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
            />
            
            <h3 className="education-heading">{edu.title}</h3>
            <p className="education-institution">{edu.institution}</p>
            
            <motion.p 
              className="education-duration"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.2 }}
            >
               {edu.duration}
            </motion.p>
            
            <p className="education-description">{edu.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Education;
