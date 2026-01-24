import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, ViewIcon } from 'lucide-react';
import './hero.css';

const RESUME_PATH = 'https://drive.google.com/file/d/13OUDa-qlQMDuCpoJSVb71VUF0FpDYLci/view?usp=sharing';

// Typewriter effect hook
const useTypewriter = (texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

const Hero = ({ darkMode }) => {
  const roles = [
    "Full Stack Developer",
    "AI & ML Enthusiast", 
    "Open Source Contributor"
  ];
  
  const typedText = useTypewriter(roles, 100, 50, 2000);

  const socialLinks = [
    { Icon: Github, href: "https://github.com/Aravindswamymajjuri", label: "GitHub", color: "#333" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/aravind-swamy-majjuri-964176305?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn", color: "#0077b5" },
    { Icon: Mail, href: "mailto:aravindswamymajjuri143@gmail.com", label: "Email", color: "#ea4335" },
    { Icon: Instagram, href: "https://www.instagram.com/crush___on___u/", label: "Instagram", color: "#e4405f" }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

 

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`hero-gradient min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${darkMode ? 'dark-mode' : 'light-mode'}`} id='home'>
      {/* Animated background particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <motion.div 
        className="text-center w-full max-w-4xl mx-auto hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting with wave animation */}
        <motion.div variants={itemVariants} className="greeting-container">
          <span className="greeting-text">Hello, All!</span>
          <motion.span 
            className="wave-emoji"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            
          </motion.span>
        </motion.div>

        <motion.h1 
          className="hero-title font-bold mb-4"
          variants={itemVariants}
        >
          I'm <span className="name-highlight">Aravind Swamy Majjuri</span>
        </motion.h1>

        <motion.div 
          className="hero-subtitle-container"
          variants={itemVariants}
        >
          <span className="typed-text">{typedText}</span>
          <span className="cursor">|</span>
        </motion.div>
        
        <motion.div 
          className="social-icons-container mb-8"
          variants={itemVariants}
        >
          {socialLinks.map(({ Icon, href, label, color }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label={label}
              custom={index}
              whileHover={{ 
                scale: 1.2, 
                y: -5,
                boxShadow: `0 10px 30px ${color}40`
              }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="social-icon">
                <Icon size={24} className="icon-color" />
              </div>
              <span className="social-tooltip">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="cta-buttons"
          variants={itemVariants}
        >
          <motion.a 
            href={RESUME_PATH} 
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button primary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(96, 165, 250, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ViewIcon size={20} />
            <span>View Resume</span>
          </motion.a>
          
          <motion.button 
            onClick={scrollToAbout}
            className="hero-button secondary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          animate={floatAnimation}
          onClick={scrollToAbout}
        >
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
