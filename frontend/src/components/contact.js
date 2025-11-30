import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Add this import
import "./contact.css"; // Import custom CSS

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

// Style constants to ensure consistency
const DARK_INPUT_STYLE = { 
  backgroundColor: '#333', 
  color: '#f0f0f0', 
  border: '1px solid #444' 
};

const LIGHT_INPUT_STYLE = { 
  backgroundColor: '#fff', 
  color: '#333', 
  border: '1px solid #e0e0e0' 
};

const Contact = ({ darkMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [renderKey, setRenderKey] = useState(0); // Force re-render when theme changes
  const formRef = useRef(null);

  // Update form elements when darkMode changes
  useEffect(() => {
    // Force re-render when darkMode changes
    setRenderKey(prev => prev + 1);
    
    // Use a slight delay to ensure DOM is updated
    setTimeout(() => {
      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll('input, textarea');
        inputs.forEach(input => {
          // Remove both theme classes first
          input.classList.remove('dark-input', 'light-input');
          // Add the correct one
          input.classList.add(darkMode ? 'dark-input' : 'light-input');
          
          // Explicitly set the background color as inline style
          if (darkMode) {
            input.style.backgroundColor = '#333';
            input.style.color = '#f0f0f0';
            input.style.border = '1px solid #444';
          } else {
            input.style.backgroundColor = '#fff';
            input.style.color = '#333';
            input.style.border = '1px solid #e0e0e0';
          }
        });
      }
    }, 50); // Small delay to ensure DOM update
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? "dark" : "light",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Show loading toast
    const loadingToast = toast.loading("Sending message...", {
      position: "top-right",
      theme: darkMode ? "dark" : "light",
    });

    const templateParams = { name, email, message };

    try {
      await emailjs.send(
        "Aravind_123", 
        "template_nlkm7ki", 
        templateParams, 
        "Cz9Kl_YW7MdaMFjMt"
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show success toast
      toast.success("Message sent successfully! I'll get back to you soon.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? "dark" : "light",
      });

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
      
    } catch (error) {
      console.error("Failed to send email:", error);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      toast.error("Failed to send message. Please try again or contact me directly.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? "dark" : "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact info with links
  const contactInfo = [
    { 
      Icon: Mail, 
      text: "aravindswamymajjuri143@gmail.com", 
      link: "mailto:aravindswamymajjuri143@gmail.com",
      ariaLabel: "Send email"
    },
    { 
      Icon: Phone, 
      text: "+91 9492113371", 
      link: "tel:+919492113371",
      ariaLabel: "Call phone number" 
    },
    { 
      Icon: MapPin, 
      text: "kakinadaa, Andhra Pradesh, India", 
      link: "https://maps.google.com/?q=kakinada,Andhra+Pradesh,India",
      ariaLabel: "View on Google Maps"
    }
  ];

  // Get current theme styles
  const inputStyle = darkMode ? DARK_INPUT_STYLE : LIGHT_INPUT_STYLE;

  return (
    <section className={`contact-section ${darkMode ? 'dark-mode' : 'light-mode'}`} id="contact">
      <div className="container">
        <motion.h2 className="contact-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Get In Touch
        </motion.h2>

        <div className="contact-grid">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="contact-info-container">
            <motion.h3 variants={itemVariants} className="contact-info-title">Contact Information</motion.h3>
            <div className="contact-info">
              {contactInfo.map(({ Icon, text, link, ariaLabel }, index) => (
                <motion.div key={index} variants={itemVariants} className="contact-item">
                  <a 
                    href={link} 
                    className="contact-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                  >
                    <motion.div className="contact-icon">
                      <Icon className="icon" />
                    </motion.div>
                    <span>{text}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.form 
            key={`form-${renderKey}`}
            ref={formRef}
            onSubmit={handleSubmit} 
            variants={formVariants} 
            initial="hidden" 
            animate="visible" 
            className="contact-form"
          >
            {[
              { label: "Name", type: "text", value: name, onChange: setName }, 
              { label: "Email", type: "email", value: email, onChange: setEmail }
            ].map(({ label, type, value, onChange }, index) => (
              <motion.div key={`field-${index}-${darkMode ? 'dark' : 'light'}`} variants={itemVariants} className="form-field">
                <label>{label}</label>
                <input 
                  type={type} 
                  value={value} 
                  onChange={(e) => onChange(e.target.value)} 
                  placeholder={`Your ${label.toLowerCase()}`}
                  className={`form-input ${darkMode ? 'dark-input' : 'light-input'}`}
                  style={inputStyle}
                  disabled={isSubmitting}
                />
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="form-field">
              <label>Message</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Your message"
                className={`form-textarea ${darkMode ? 'dark-input' : 'light-input'}`}
                style={inputStyle}
                disabled={isSubmitting}
              ></textarea>
            </motion.div>

            <motion.button 
              type="submit" 
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }} 
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`contact-button ${darkMode ? 'dark-contact-button' : 'light-contact-button'}`}
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>

        {/* Add ToastContainer here */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
        />
      </div>
    </section>
  );
};

export default Contact;