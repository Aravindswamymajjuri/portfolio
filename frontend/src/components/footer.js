import React from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { Icon: Github, href: "https://github.com/Aravindswamymajjuri", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Mail, href: "mailto:aravindswamymajjuri143@gmail.com", label: "Email" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          {socialLinks.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={label}
            >
              <Icon size={24} className="icon" />
            </a>
          ))}
        </div>
        <div className="copyright">
          <p>&copy; {currentYear} Aravind Swamy Majjuri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;