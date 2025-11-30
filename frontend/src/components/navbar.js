import React, { useState, useEffect } from 'react';
import './navbar.css';

const Navbar = ({ darkMode, setDarkMode, onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Education', href: '#education' },
    { title: 'Projects', href: '#projects' },
    { title: 'Skills', href: '#skills' },
    { title: 'Contact', href: '#contact' }
  ];

  const handleNav = (e, href) => {
    e.preventDefault();
    const section = href.replace('#', '');
    if (onNavClick) onNavClick(section);
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={e => handleNav(e, '#home')}>Aravind Swamy Majjuri</a>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.title} href={link.href} onClick={e => handleNav(e, link.href)}>{link.title}</a>
          ))}
          <button className="theme-toggle desktop-theme" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <svg className="theme-icon sun" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="theme-icon moon" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="mobile-controls">
          <button className="theme-toggle mobile-theme" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <svg className="theme-icon sun" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="theme-icon moon" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <div className={`hamburger ${isOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a 
              key={link.title} 
              href={link.href}
              onClick={e => handleNav(e, link.href)}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;