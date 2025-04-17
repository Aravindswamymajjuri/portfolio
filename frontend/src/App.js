import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Projects from './components/projects';
import Skills from './components/skills';
import Contact from './components/contact';
import Footer from './components/footer';
import './App.css';
import Education from './components/eudcation';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Education/>
      <Projects />
      <Skills />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
};

export default App;