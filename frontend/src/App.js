import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Experience from './components/experience';
import Certificates from './components/certificates';
import Projects from './components/projects';
import Skills from './components/skills';
import Contact from './components/contact';
import Footer from './components/footer';
import './App.css';
import Education from './components/eudcation';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Section refs for smooth scroll and animation
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    certificates: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    contact: useRef(null),
  };

  // Smooth scroll and animate section
  const handleNavClick = (section) => {
    const ref = sectionRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Add animation class
      ref.current.classList.add('animate-slide-up');
      setTimeout(() => {
        ref.current.classList.remove('animate-slide-up');
      }, 1000);
    }
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onNavClick={handleNavClick} />
      <div ref={sectionRefs.home}><Hero darkMode={darkMode} /></div>
      <div ref={sectionRefs.about}><About darkMode={darkMode} /></div>
      <div ref={sectionRefs.experience}><Experience darkMode={darkMode} /></div>
      <div ref={sectionRefs.certificates}><Certificates darkMode={darkMode} /></div>
      <div ref={sectionRefs.education}><Education darkMode={darkMode}/></div>
      <div ref={sectionRefs.projects}><Projects darkMode={darkMode}/></div>
      <div ref={sectionRefs.skills}><Skills darkMode={darkMode}/></div>
      <div ref={sectionRefs.contact}><Contact darkMode={darkMode}/></div>
      <Footer darkMode={darkMode}/>
    </div>
  );
};

export default App;