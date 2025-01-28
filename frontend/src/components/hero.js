import React from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import './hero.css';

const Hero = ({ darkMode }) => {
  const socialLinks = [
    { Icon: Github, href: "https://github.com/Aravindswamymajjuri", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Mail, href: "mailto:aravindswamymajjuri143@gmail.com", label: "Email" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" }
  ];

  return (
    <div className={`hero-gradient min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="text-center w-full max-w-4xl mx-auto">
        <h1 className="hero-title font-bold mb-4">
          Hi, I'm Aravind Swamy Majjuri
        </h1>
        <p className="hero-subtitle mb-8">
          Full Stack Developer | Creative Problem Solver
        </p>
        
        <div className="social-icons-container mb-8">
          {socialLinks.map(({ Icon, href, label }, index) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label={label}
            >
              <div className="social-icon">
                <Icon size={24} className="icon-color" />
              </div>
            </a>
          ))}
        </div>

        <button className="hero-button px-8 py-3">
          Contact Me
        </button>
      </div>
    </div>
  );
};

export default Hero;
