import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Star, Trophy, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Certificates = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleCertClick = (cert, index) => {
    setSelectedCert(cert);
    setSelectedIndex(index);
  };

  const handleModalNext = () => {
    const nextIndex = (selectedIndex + 1) % certificates.length;
    setSelectedIndex(nextIndex);
    setSelectedCert(certificates[nextIndex]);
  };

  const handleModalPrev = () => {
    const prevIndex = (selectedIndex - 1 + certificates.length) % certificates.length;
    setSelectedIndex(prevIndex);
    setSelectedCert(certificates[prevIndex]);
  };

  const handleCarouselNext = () => {
    const nextSlide = currentSlide + 1;
    // If we've gone past the last certificate, reset to start
    if (nextSlide >= certificates.length) {
      setNoTransition(true);
      setCurrentSlide(0);
      setTimeout(() => setNoTransition(false), 50);
    } else {
      setCurrentSlide(nextSlide);
    }
  };

  const handleCarouselPrev = () => {
    const prevSlide = currentSlide - 1;
    // If we go before start, go to the last certificate
    if (prevSlide < 0) {
      setNoTransition(true);
      setCurrentSlide(certificates.length - 1);
      setTimeout(() => setNoTransition(false), 50);
    } else {
      setCurrentSlide(prevSlide);
    }
  };

  // Reset rotation when certificate changes
  useEffect(() => {
    setRotation(0);
  }, [selectedIndex]);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleCarouselNext();
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  const certificates = [
    {
      title: "Foundations of Modern Machine Learning",
      issuer: "IIIT Hyderabad",
      grade: "Grade A",
      icon: Trophy,
      color: "#667eea",
      image: `${process.env.PUBLIC_URL}/fmml.jpg`
    },
    {
      title: "Winter Internship Certificate  RCTS",
      issuer: "IIIT Hyderabad",
      grade: "12/2024-01/2025",
      icon: Award,
      color: "#764ba2",
      image: `${process.env.PUBLIC_URL}/winter.jpg`
    },
    {
      title: "Python Advanced Certification EDYST",
      issuer: "KIET Group of Institutions",
      grade: "2022-2023",
      icon: Star,
      color: "#f093fb",
      image: `${process.env.PUBLIC_URL}/edyst.jpg`
    }
  ];

 

  

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
    initial: { x: '-150%', y: '-150%' },
    animate: {
      x: '150%',
      y: '150%',
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
        repeatDelay: 3
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
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
        
        <button 
          className="view-all-certs-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Carousel' : 'View All'}
        </button>
        
        {!showAll ? (
        <>
        {/* Carousel Navigation Buttons */}
        <div className="carousel-navigation">
          <motion.button 
            className="carousel-nav-btn carousel-prev"
            onClick={handleCarouselPrev}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={28} />
          </motion.button>
          
          <motion.button 
            className="carousel-nav-btn carousel-next"
            onClick={handleCarouselNext}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>

        <div className="certificates-carousel-wrapper">
          <div 
            ref={ref}
            className={`certificates-list ${noTransition ? 'no-transition' : ''}`}
          >
            {certificates.map((cert, index) => {
            const IconComponent = cert.icon;
            const isActive = index === currentSlide;
            return (
              <motion.div 
                key={index} 
                className={`certificate-item ${isActive ? 'active' : ''}`}
               
                onClick={() => handleCertClick(cert, index)}
                style={{ 
                  cursor: 'pointer',
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                {/* Shimmer effect */}
                <motion.div 
                  className="certificate-shimmer"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
                
               

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
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {certificates.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        </>
        ) : (
          <div className="certificates-grid">
            {certificates.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <motion.div
                  key={index}
                  className="certificate-grid-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleCertClick(cert, index)}
                >
                  <div className="cert-grid-icon" style={{ backgroundColor: `${cert.color}20` }}>
                    <IconComponent size={36} style={{ color: cert.color }} />
                  </div>
                  <h3 className="cert-grid-title">{cert.title}</h3>
                  <p className="cert-grid-issuer">{cert.issuer}</p>
                  {cert.grade && <p className="cert-grid-grade">{cert.grade}</p>}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="certificate-modal-overlay"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className="certificate-modal-content"
                variants={imageVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close-btn"
                  onClick={() => setSelectedCert(null)}
                >
                  <X size={24} />
                </button>
                
                {/* Rotate Button */}
                <button 
                  className="modal-rotate-btn"
                  onClick={() => setRotation(prev => prev + 90)}
                  title="Rotate Image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                  </svg>
                </button>
                
                {/* Reset Rotation Button */}
                {/* <button 
                  className="modal-reset-btn"
                  onClick={() => setRotation(0)}
                  title="Reset Rotation"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                  </svg>
                </button> */}
                
                {/* Previous Button */}
                <motion.button 
                  className="modal-nav-btn modal-prev-btn"
                  onClick={handleModalPrev}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={32} />
                </motion.button>
                
                {/* Next Button */}
                <motion.button 
                  className="modal-nav-btn modal-next-btn"
                  onClick={handleModalNext}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={32} />
                </motion.button>
                
                <motion.img 
                  key={selectedIndex}
                  src={selectedCert.image} 
                  alt={selectedCert.title}
                  className="modal-certificate-image"
                  initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: rotation }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  key={`info-${selectedIndex}`}
                  className="modal-certificate-info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h3>{selectedCert.title}</h3>
                  <p>{selectedCert.issuer}</p>
                  {selectedCert.grade && <span className="modal-grade">{selectedCert.grade}</span>}
                  <div className="modal-counter">{selectedIndex + 1} / {certificates.length}</div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx>{`
        .view-all-certs-btn {
          position: absolute;
          right: 2rem;
          top: 2rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 2px solid rgba(96, 165, 250, 0.4);
          border-radius: 25px;
          color: #2563eb;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .dark-mode .view-all-certs-btn {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          border: 2px solid rgba(96, 165, 250, 0.3);
          color: #60a5fa;
        }

        .view-all-certs-btn:hover {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border-color: #60a5fa;
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(96, 165, 250, 0.3);
        }

        .certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .certificate-grid-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          border: 2px solid rgba(96, 165, 250, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .dark-mode .certificate-grid-card {
          background: linear-gradient(135deg, #1a1f35 0%, #0a0e1a 100%);
          border: 2px solid rgba(139, 92, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .certificate-grid-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(96, 165, 250, 0.2);
        }

        .dark-mode .certificate-grid-card:hover {
          box-shadow: 0 20px 40px rgba(96, 165, 250, 0.3);
        }

        .cert-grid-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-grid-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .dark-mode .cert-grid-title {
          color: #f1f5f9;
        }

        .cert-grid-issuer {
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .dark-mode .cert-grid-issuer {
          color: #94a3b8;
        }

        .cert-grid-grade {
          font-size: 0.9rem;
          color: #2563eb;
          font-weight: 600;
          display: inline-block;
          padding: 0.35rem 0.85rem;
          background: rgba(96, 165, 250, 0.15);
          border-radius: 20px;
          margin-top: 0.5rem;
        }

        .dark-mode .cert-grid-grade {
          color: #60a5fa;
          background: rgba(96, 165, 250, 0.2);
        }

        @media (max-width: 768px) {
          .view-all-certs-btn {
            position: static;
            margin: 1rem auto 0;
            display: block;
            padding: 0.65rem 1.3rem;
            font-size: 0.9rem;
          }
          
          .certificates-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1rem;
          }
        }

        @media (max-width: 640px) {
          .certificates-grid {
            padding: 0.75rem;
          }
          
          .cert-grid-icon {
            width: 70px;
            height: 70px;
          }
          
          .cert-grid-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Certificates;
