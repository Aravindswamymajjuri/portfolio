import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './contact.css';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await fetch('http://localhost:5000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          setSubmitted(true);
          setFormData({ name: '', email: '', phone: '', message: '' });
          toast.success('Message sent successfully!');
        } else {
          toast.error('Failed to send message. Please try again later.');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
      toast.error('Please correct the errors in the form.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+91 9492113371",
      link: "tel:+91 9492113371"
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "aravindswamymajjuri143@gmail.com",
      link: "mailto:aravindswamymajjuri143@gmail.com"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      content: "4-137 Yerravaram, Andhra Pradesh, India",
      link: "https://maps.google.com/?q=123+Business+Street+New+York+NY+10001"
    }
  ];

  return (
    <section className={`contact-section ${darkMode ? 'dark' : 'light'}`}>
      <ToastContainer />
      <div className="contact-container">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <h2 className="info-title">Contact Information</h2>
            <p className="info-subtitle">Get in touch with us</p>

            <div className="info-items">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="info-item"
                  target={item.title === "Location" ? "_blank" : undefined}
                  rel={item.title === "Location" ? "noopener noreferrer" : undefined}
                >
                  <div className="info-icon">{item.icon}</div>
                  <div className="info-content">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`contact-form-container ${darkMode ? 'dark' : 'light'}`}>
            <h2 className="form-title">Send us a message</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Form Fields */}
              <div className="form-group">
                <div className="input-icon">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`animated-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && (
                  <span className="error-message">
                    <AlertCircle size={16} /> {errors.name}
                  </span>
                )}
              </div>
              <div className="form-group">
                <div className="input-icon">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`animated-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && (
                  <span className="error-message">
                    <AlertCircle size={16} /> {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <div className="input-icon">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`animated-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && (
                  <span className="error-message">
                    <AlertCircle size={16} /> {errors.phone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <div className="input-icon">
                  <MessageSquare size={20} />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`animated-input ${errors.message ? 'error' : ''}`}
                />
                {errors.message && (
                  <span className="error-message">
                    <AlertCircle size={16} /> {errors.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
