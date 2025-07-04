import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaPhone,
  FaEnvelope, 
  FaMapMarkerAlt,
  FaPaperPlane,
  FaArrowRight,
  FaBook,
  FaUsers,
  FaGraduationCap,
  FaAward,
  FaShieldAlt,
  FaFileAlt
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      alert("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">BB</div>
              <div className="footer-logo-text">
                <h3 className="footer-logo-title">BigBuddie</h3>
                <p className="footer-logo-subtitle">Little Skills, Big Futures</p>
              </div>
            </Link>
            
            <p className="footer-description">
              Empowering children aged 3-15 with essential life skills through personalized learning experiences. Build creativity, critical thinking, communication, and leadership skills in a fun, engaging environment.
              </p>
            
            <div className="footer-social">
              <a href="https://facebook.com/bigbuddie" className="social-link facebook" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              <a href="https://twitter.com/bigbuddie" className="social-link twitter" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              <a href="https://instagram.com/bigbuddie" className="social-link instagram" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              <a href="https://linkedin.com/company/bigbuddie" className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://youtube.com/bigbuddie" className="social-link youtube" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="footer-link">
                  <FaBook /> Programs
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="footer-link">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              </ul>
            </div>
            
            {/* Programs */}
          <div className="footer-section">
            <h4 className="footer-title">Programs</h4>
              <ul className="footer-links">
              <li>
                <Link to="/programs/creative-thinking" className="footer-link">
                  🎨 Creative Thinking
                </Link>
              </li>
              <li>
                <Link to="/programs/problem-solving" className="footer-link">
                  🧩 Problem Solving
                </Link>
                </li>
                <li>
                <Link to="/programs/communication" className="footer-link">
                  🗣️ Communication
                </Link>
                </li>
                <li>
                <Link to="/programs/leadership" className="footer-link">
                  👑 Leadership
                </Link>
                </li>
                <li>
                <Link to="/programs/all" className="footer-link">
                  <FaGraduationCap /> View All Programs
                </Link>
                </li>
              </ul>
          </div>

          {/* Support & Contact */}
          <div className="footer-section">
            <h4 className="footer-title">Get in Touch</h4>
            
            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-content">
                <div className="contact-label">Call us</div>
                <div className="contact-value">+1 (555) 123-4567</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-content">
                <div className="contact-label">Email us</div>
                <div className="contact-value">hello@bigbuddie.com</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-content">
                <div className="contact-label">Visit us</div>
                <div className="contact-value">San Francisco, CA</div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button 
                type="submit" 
                className="newsletter-btn"
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  "Subscribing..."
                ) : (
                  <>
                    <FaPaperPlane />
                    Subscribe to Newsletter
                  </>
                )}
              </button>
            </form>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} BigBuddie. All rights reserved.
          </div>
          
          <ul className="footer-legal">
            <li>
              <Link to="/privacy">
                <FaShieldAlt /> Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms">
                <FaFileAlt /> Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
