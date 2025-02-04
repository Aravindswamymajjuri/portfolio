import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, ArrowUp, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
// import '../app.css';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Projects data
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/api/placeholder/300/200",
      demo: "#",
      github: "#"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat app with AI integration",
      tags: ["Next.js", "OpenAI", "Socket.io"],
      image: "/api/placeholder/300/200",
      demo: "#",
      github: "#"
    },
    // Add more projects as needed
  ];

  // Skills data
  const skills = {
    Frontend: ["React", "TypeScript", "Tailwind CSS"],
    Backend: ["Node.js", "Python", "PostgreSQL"],
    Tools: ["Git", "Docker", "AWS"]
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Navbar */}
        <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold">Portfolio</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" className="hover:text-blue-500 transition-colors">Home</a>
                <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
                <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
                <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
                <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile Navigation Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="#home" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Home</a>
                  <a href="#about" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">About</a>
                  <a href="#projects" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Projects</a>
                  <a href="#skills" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Skills</a>
                  <a href="#contact" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-blue-500">John Doe</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">Full Stack Developer</p>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors">
              View My Work
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="/api/placeholder/400/400"
                  alt="Profile"
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <p className="text-lg mb-6">
                  A passionate developer with expertise in building modern web applications.
                  I specialize in React, Node.js, and cloud technologies.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                    <GithubIcon className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                    <LinkedinIcon className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                    <TwitterIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a href={project.demo} className="text-blue-500 hover:text-blue-600 transition-colors">Live Demo</a>
                      <a href={project.github} className="text-blue-500 hover:text-blue-600 transition-colors">GitHub</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">{category}</h3>
                  <div className="space-y-4">
                    {skillList.map((skill, skillIndex) => (
                      <div key={skillIndex} className="relative">
                        <div className="flex justify-between mb-1">
                          <span>{skill}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p>&copy; 2024 John Doe. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <TwitterIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Portfolio;