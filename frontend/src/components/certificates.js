import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Star, Trophy, CheckCircle } from 'lucide-react';

const Certificates = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const certificates = [
    {
      title: "Foundations of Modern Machine Learning",
      issuer: "IIIT Hyderabad",
      grade: "Grade A",
      icon: Trophy,
      color: "#667eea"
    },
    {
      title: "Winter Internship Certificate  RCTS",
      issuer: "IIIT Hyderabad",
      grade: "12/2024-01/2025",
      icon: Award,
      color: "#764ba2"
    },
    {
      title: "Python Advanced Certification EDYST",
      issuer: "KIET Group of Institutions",
      grade: "2022-2023",
      icon: Star,
      color: "#f093fb"
    }
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
      scale: 0.9,
      rotateX: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '200%',
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
        repeatDelay: 2
      }
    }
  };

  return (
    <section id="certificates" className={`certificates-section ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="certificates-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* <Award className="title-icon" /> */}
          <span className="title-decoration">Certifications</span> & Achievements
        </motion.h2>
        
        <motion.div 
          ref={ref}
          className="certificates-list"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certificates.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <motion.div 
                key={index} 
                className="certificate-item"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: `0 20px 40px ${cert.color}40`
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Shimmer effect */}
                <motion.div 
                  className="certificate-shimmer"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
                
                {/* Badge corner */}
                {/* <motion.div 
                  className="certificate-badge"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                >
                  <CheckCircle size={20} />
                </motion.div> */}

                {/* Icon */}
                <motion.div 
                  className="certificate-icon-wrapper"
                  variants={iconVariants}
                  style={{ backgroundColor: `${cert.color}20` }}
                >
                  <IconComponent 
                    size={40} 
                    style={{ color: cert.color }}
                  />
                </motion.div>

                {/* Content */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  {cert.title}
                </motion.h3>
                
                <motion.p 
                  className="issuer"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 0.8 } : {}}
                  transition={{ delay: 0.7 + index * 0.2 }}
                >
                  {cert.issuer}
                </motion.p>
                
                {cert.grade && (
                  <motion.p 
                    className="grade"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ 
                      delay: 0.8 + index * 0.2, 
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {/* <Star size={16} fill="currentColor" /> */}
                    {cert.grade}
                  </motion.p>
                )}

                {/* Floating particles */}
                <motion.div
                  className="certificate-particle"
                  animate={{
                    y: [-10, 10, -10],
                    x: [0, 5, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
                <motion.div
                  className="certificate-particle-2"
                  animate={{
                    y: [10, -10, 10],
                    x: [0, -5, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5 + 0.5
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
