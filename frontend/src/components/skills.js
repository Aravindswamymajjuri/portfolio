import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Palette, Server, Brain } from 'lucide-react';
import './skills.css';

const skills = [
  {
    category: "Frontend Development",
    icon: Code2,
    items: ["React", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "Backend Development",
    icon: Server,
    items: ["Node.js", "Python", "MongoDB", "PostgreSQL"]
  },
  {
    category: "Machine Learning",
    icon: Brain,
    items: ["Python", "Pandas", "NumPy", "Scikit-learn"]
  },
  {
    category: "UI/UX Design",
    icon: Palette,
    items: ["Figma", "Prototyping", "User Research"]
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300
    }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  },
  hover: {
    scale: 1.2,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <motion.h2 
          className="skills-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Expertise
        </motion.h2>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="skills-grid"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="skill-card"
            >
              <motion.div 
                className="skill-header"
                variants={itemVariants}
              >
                <motion.div
                  className="skill-icon-container"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <skill.icon className="skill-icon" />
                </motion.div>
                <h3 className="skill-category">{skill.category}</h3>
              </motion.div>
              
              <motion.ul className="skill-list">
                {skill.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    variants={itemVariants}
                    className="skill-item"
                    whileHover={{ x: 10, color: "var(--highlight-color)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span 
                      className="skill-bullet"
                      whileHover={{ scale: 1.5 }}
                    />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}