import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Instagram, ArrowUp } from 'lucide-react';
import './footer.css';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });
  
  const socialLinks = [
    { Icon: Github, href: "https://github.com/Aravindswamymajjuri", label: "GitHub", color: "#333" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/aravind-swamy-majjuri-964176305?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn", color: "#0077b5" },
    { Icon: Mail, href: "mailto:aravindswamymajjuri143@gmail.com", label: "Email", color: "#ea4335" },
    { Icon: Instagram, href: "https://www.instagram.com/crush___on___u/", label: "Instagram", color: "#e4405f" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <motion.div 
        ref={ref}
        className="footer-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Back to Top Button */}
        <motion.button 
          className="back-to-top"
          onClick={scrollToTop}
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowUp size={20} />
        </motion.button>

        <motion.div className="footer-brand" variants={itemVariants}>
          <h3 className="footer-logo">Aravind Swamy</h3>
          <p className="footer-tagline">Full Stack Developer & AI Enthusiast</p>
        </motion.div>

        <motion.div className="social-links" variants={itemVariants}>
          {socialLinks.map(({ Icon, href, label, color }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={label}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.2,
                boxShadow: `0 10px 25px ${color}40`
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={22} className="icon" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div className="copyright" variants={itemVariants}>
          {/* <p>
            Made with <motion.span 
              className="heart"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={14} fill="#ef4444" color="#ef4444" />
            </motion.span> by Aravind Swamy Majjuri
          </p> */}
          <p className="year">&copy; {currentYear} All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;