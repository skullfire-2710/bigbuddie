import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaRocket, 
  FaPuzzlePiece, 
  FaComments, 
  FaLightbulb, 
  FaGraduationCap, 
  FaUsers,
  FaChartLine,
  FaPlay,
  FaStar,
  FaCheck,
  FaBookOpen,
  FaTrophy,
  FaMagic,
  FaPalette,
  FaCode,
  FaCrown,
  FaMicrophone,
  FaShieldAlt,
  FaUserGraduate,
  FaHeart,
  FaDownload,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaPen,
  FaGamepad,
  FaBrain
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', ageGroup: '' });
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    });
  }, []);
  
  // Testimonials slider settings
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dotsClass: "slick-dots custom-dots"
  };

  const testimonials = [
    {
      text: "My son found his love for storytelling! Thank you, BigBuddie!",
      author: "Priya Sharma",
      role: "Mother of 7-year-old Arjun",
      rating: 5
    },
    {
      text: "Confidence boost + creativity = BigBuddie magic!",
      author: "Raj Patel",
      role: "Father of 5-year-old Anaya",
      rating: 5
    },
    {
      text: "Personalized attention makes all the difference!",
      author: "Meera Singh",
      role: "Mother of 9-year-old Karan",
      rating: 5
    },
    {
      text: "My daughter went from shy to superstar speaker in just 3 months!",
      author: "Vikram Joshi",
      role: "Father of 6-year-old Diya",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How personalized is the learning?",
      answer: "Every child gets a unique learning path based on their age, interests, and skill level. Our AI adapts content difficulty and suggests activities that match your child's learning style and pace."
    },
    {
      question: "How do I track my child's progress?",
      answer: "Our parent dashboard shows real-time progress, completed activities, earned badges, and skill development metrics. You'll receive weekly reports and milestone celebrations!"
    },
    {
      question: "How does the AI feedback work?",
      answer: "Our smart system analyzes your child's responses and provides encouraging, constructive feedback. It identifies strengths, suggests improvements, and adapts future challenges accordingly."
    },
    {
      question: "Is BigBuddie safe for children?",
      answer: "Absolutely! We follow strict data protection protocols, have no ads, and all content is age-appropriate and educationally approved by child development experts."
    },
    {
      question: "What age groups do you cater to?",
      answer: "BigBuddie is designed for children aged 3-15, with content specifically tailored for different developmental stages: Early Learners (3-6), Explorers (7-10), and Future Leaders (11-15)."
    }
  ];

  const skillTracks = [
    {
      title: "Art & Creativity Explorer",
      description: "Unleash imagination through drawing, storytelling, and creative projects",
      icon: "🎨",
      color: "#FF6B6B",
      features: ["Digital Art Tools", "Story Creation", "Creative Challenges", "Art Gallery Showcase"]
    },
    {
      title: "Logic & Problem-Solving Hero",
      description: "Build critical thinking with puzzles, math games, and brain teasers",
      icon: "🧩",
      color: "#4ECDC4",
      features: ["Logic Puzzles", "Math Adventures", "Pattern Recognition", "Strategy Games"]
    },
    {
      title: "Storytelling & Public Speaking Star",
      description: "Develop confident communication and presentation skills",
      icon: "🎤",
      color: "#45B7D1",
      features: ["Speech Training", "Story Building", "Confidence Boosters", "Virtual Stage"]
    },
    {
      title: "Smart Tech & Coding Beginner",
      description: "Introduction to coding, robotics, and digital literacy",
      icon: "💻",
      color: "#96CEB4",
      features: ["Visual Coding", "Robot Friends", "Tech Basics", "Future Skills"]
    },
    {
      title: "Personality & Leadership Camp",
      description: "Build leadership qualities, teamwork, and emotional intelligence",
      icon: "👑",
      color: "#FFEAA7",
      features: ["Leadership Games", "Team Challenges", "Emotional Skills", "Confidence Building"]
    }
  ];

  const handleFaqToggle = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Free kit requested:", formData);
    alert("🎉 Your FREE BigBuddie Starter Kit is on its way! Check your email in a few minutes.");
    setFormData({ name: '', email: '', ageGroup: '' });
  };
  
  return (
    <div className="bigbuddie-home magical-home">
      {/* Floating Background Elements */}
      <div className="floating-doodles">
        <div className="doodle star">⭐</div>
        <div className="doodle book">📚</div>
        <div className="doodle puzzle">🧩</div>
        <div className="doodle brush">🖌️</div>
        <div className="doodle rocket">🚀</div>
        <div className="doodle balloon">🎈</div>
        <div className="doodle pencil">✏️</div>
        <div className="doodle crown">👑</div>
      </div>

      {/* Section 1: Hero Banner */}
      <section className="hero-banner magical-hero">
        <div className="container">
          <div className="hero-container">
          <div className="hero-content" data-aos="fade-right">
              <motion.h1 
                className="hero-title rainbow-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                BigBuddie: Where Little Skills Create Big Futures! 🌟
              </motion.h1>
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Fun, personalized programs to spark creativity, leadership, and smart thinking in kids aged 3-15! ✨
              </motion.p>
              <motion.div 
                className="hero-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button 
                  className="btn btn-magical primary"
                  onClick={() => navigate("/courses")}
                >
                  🚀 Explore Programs
                </button>
                <button 
                  className="btn btn-magical secondary"
                  onClick={() => document.getElementById('free-kit').scrollIntoView()}
                >
                  📝 Get Free Trial Worksheet
                </button>
              </motion.div>
            </div>
            
            <div className="hero-visual" data-aos="fade-left">
              <div className="kids-illustration">
                <motion.div 
                  className="kid-drawing"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎨👧
                </motion.div>
                <motion.div 
                  className="kid-coding"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                >
                  💻👦
                </motion.div>
                <motion.div 
                  className="kid-speaking"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
                >
                  🎤👧
                </motion.div>
                <motion.div 
                  className="floating-balloon"
                  animate={{ 
                    y: [0, -20, 0],
                    x: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🎈
                </motion.div>
                <motion.div 
                  className="wiggling-pencil"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✏️
                </motion.div>
              </div>
            </div>
</div>
        </div>
      </section>

      {/* Section 2: What BigBuddie Offers */}
      <section className="offerings-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            data-aos="fade-up"
          >
            Empowering Every Child's Potential 🌈
          </motion.h2>
          
          <div className="offerings-grid">
            <motion.div 
              className="offering-card creative"
              data-aos="zoom-in"
              data-aos-delay="100"
              whileHover={{ scale: 1.05, rotate: 2 }}
              onClick={() => navigate("/courses")}
            >
              <div className="offering-icon">🎨</div>
              <h3>Creative Thinking</h3>
              <p>Spark imagination through art, stories, and innovative challenges!</p>
              <div className="offering-arrow">→</div>
            </motion.div>

            <motion.div 
              className="offering-card problem-solving"
              data-aos="zoom-in"
              data-aos-delay="200"
              whileHover={{ scale: 1.05, rotate: -2 }}
              onClick={() => navigate("/courses")}
            >
              <div className="offering-icon">🧩</div>
              <h3>Smart Problem Solving</h3>
              <p>Build logical thinking with puzzles, games, and brain teasers!</p>
              <div className="offering-arrow">→</div>
            </motion.div>

            <motion.div 
              className="offering-card communication"
              data-aos="zoom-in"
              data-aos-delay="300"
              whileHover={{ scale: 1.05, rotate: 2 }}
              onClick={() => navigate("/courses")}
            >
              <div className="offering-icon">💬</div>
              <h3>Confident Communication</h3>
              <p>Develop speaking skills and build unstoppable confidence!</p>
              <div className="offering-arrow">→</div>
            </motion.div>

            <motion.div 
              className="offering-card future-ready"
              data-aos="zoom-in"
              data-aos-delay="400"
              whileHover={{ scale: 1.05, rotate: -2 }}
              onClick={() => navigate("/courses")}
            >
              <div className="offering-icon">🚀</div>
              <h3>Future-Ready Skills</h3>
              <p>Prepare for tomorrow with tech, leadership, and adaptability!</p>
              <div className="offering-arrow">→</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Big Dreams Start Small — Here's How 🛤️
          </h2>

          <div className="journey-roadmap">
            <div className="roadmap-path">
              <svg viewBox="0 0 800 200" className="path-svg">
                <path
                  d="M 50 100 Q 200 50 400 100 T 750 100"
                  stroke="#F9ED32"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="10,5"
                />
              </svg>
            </div>
            
            <div className="journey-steps">
              <motion.div 
                className="journey-step"
                data-aos="fade-up"
                data-aos-delay="100"
                whileHover={{ y: -10 }}
              >
                <div className="step-number">1</div>
                <div className="step-icon">🎯</div>
                <h3>Choose Skill Tracks</h3>
                <p>Pick creativity, leadership, logic, or communication based on your child's interests!</p>
              </motion.div>

              <motion.div 
                className="journey-step"
                data-aos="fade-up"
                data-aos-delay="200"
                whileHover={{ y: -10 }}
              >
              <div className="step-number">2</div>
                <div className="step-icon">📝</div>
                <h3>Personalized Worksheets</h3>
                <p>Get unique, password-protected resources tailored just for your little one!</p>
              </motion.div>

              <motion.div 
                className="journey-step"
                data-aos="fade-up"
                data-aos-delay="300"
                whileHover={{ y: -10 }}
              >
              <div className="step-number">3</div>
                <div className="step-icon">🏆</div>
                <h3>Earn Badges & Grow</h3>
                <p>Celebrate each success, get feedback, and watch them grow every day!</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Parents Trust BigBuddie */}
      <section className="trust-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Loved by Kids. Trusted by Parents. 💕
          </h2>

          <div className="trust-content">
            <div className="testimonials-container" data-aos="fade-right">
              <div className="testimonial-header">
                <h3>Real Stories from Real Families ✨</h3>
                <p>See how BigBuddie is transforming young minds across India!</p>
              </div>
              
              <div className="testimonials-grid">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={index} className="testimonial-slide">
                    <div className="testimonial-card magical-card">
                      <div className="testimonial-header-card">
                        <div className="testimonial-avatar">
                          <span>{testimonial.author.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="testimonial-meta">
                          <div className="stars">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="star-icon" />
                            ))}
                          </div>
                          <div className="testimonial-info">
                            <strong>{testimonial.author}</strong>
                            <span>{testimonial.role}</span>
                          </div>
                        </div>
                      </div>
                      <p className="testimonial-text">"{testimonial.text}"</p>
                      <div className="testimonial-achievement">
                        <span className="achievement-badge">🎉 Verified Parent</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Success Metrics */}
              <div className="success-metrics">
                <div className="metric-item">
                  <div className="metric-icon">📈</div>
                  <div className="metric-text">
                    <strong>95%</strong>
                    <span>Skill Improvement</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">🏆</div>
                  <div className="metric-text">
                    <strong>88%</strong>
                    <span>Confidence Boost</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">😊</div>
                  <div className="metric-text">
                    <strong>100%</strong>
                    <span>Parent Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="trust-badges" data-aos="fade-left">
              <div className="trust-header">
                <h3>Why Choose BigBuddie? 🌟</h3>
                <p>Safety, quality, and results you can trust</p>
              </div>
              
              <div className="badge-grid">
                <div className="trust-badge">
                  <FaShieldAlt className="badge-icon" />
                  <div className="badge-content">
                    <span>Safe Learning Environment</span>
                    <small>100% secure & age-appropriate content</small>
                  </div>
                </div>
                <div className="trust-badge">
                  <FaUserGraduate className="badge-icon" />
                  <div className="badge-content">
                    <span>Personalized Growth</span>
                    <small>AI-powered adaptive learning paths</small>
                  </div>
                </div>
                <div className="trust-badge">
                  <FaBookOpen className="badge-icon" />
                  <div className="badge-content">
                    <span>Expert-Designed Curriculum</span>
                    <small>Child development specialists approved</small>
                  </div>
                </div>
                <div className="trust-badge">
                  <FaHeart className="badge-icon" />
                  <div className="badge-content">
                    <span>24/7 Parent Support</span>
                    <small>Always here when you need us</small>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="certifications">
                <h4>Trusted Certifications 🏅</h4>
                <div className="cert-badges">
                  <div className="cert-badge">ISO 27001</div>
                  <div className="cert-badge">COPPA Compliant</div>
                  <div className="cert-badge">EdTech Approved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured in Media */}
          <div className="media-mentions" data-aos="fade-up">
            <h3>Featured In Leading Publications 📰</h3>
            <div className="media-logos">
              <div className="media-logo">🏆 The Times of India</div>
              <div className="media-logo">📺 NDTV Education</div>
              <div className="media-logo">💼 Economic Times</div>
              <div className="media-logo">🌟 India Today</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Featured Skill Tracks */}
      <section className="skill-tracks-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Discover Our Skill Magic! ✨
          </h2>

          <div className="tracks-grid">
            {skillTracks.map((track, index) => (
              <motion.div 
                key={index}
                className="track-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                style={{ '--track-color': track.color }}
                whileHover={{ y: -10, rotateY: 5 }}
              >
                <div className="track-icon">{track.icon}</div>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <ul className="track-features">
                  {track.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
                <button className="track-btn" onClick={() => navigate("/courses")}>
                  View More <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Free Goodies */}
      <section id="free-kit" className="free-kit-section">
        <div className="container">
          <div className="kit-content">
            <div className="kit-text" data-aos="fade-right">
              <h2 className="section-title">
                Get Your FREE BigBuddie Starter Kit! 🎁
              </h2>
              <div className="kit-offers">
                <div className="offer-item">
                  <FaDownload className="offer-icon" />
                  <span>Sample editable worksheet</span>
                </div>
                <div className="offer-item">
                  <FaChartLine className="offer-icon" />
                  <span>Skill development roadmap</span>
              </div>
                <div className="offer-item">
                  <FaTrophy className="offer-icon" />
                  <span>BigBuddie badge template</span>
                </div>
              </div>
              </div>
              
            <div className="kit-form" data-aos="fade-left">
              <form onSubmit={handleFormSubmit} className="magical-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Child's Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
                    required
                  >
                    <option value="">Select Age Group</option>
                    <option value="3-6">Early Learners (3-6 years)</option>
                    <option value="7-10">Explorers (7-10 years)</option>
                    <option value="11-15">Future Leaders (11-15 years)</option>
                  </select>
                </div>
                <button type="submit" className="kit-submit-btn">
                  Send Me My Kit! 🚀
                </button>
              </form>
              </div>
          </div>
        </div>
      </section>

      {/* Section 7: Community - Completely Rebuilt */}
      <section className="community-section-new">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Join 10,000+ Smart Buddies Across India! 🇮🇳
          </h2>

          {/* Community Stats */}
          <div className="stats-wrapper" data-aos="fade-up">
            <div className="stat-box">
              <div className="stat-emoji">👧👦</div>
              <div className="stat-num">10,000+</div>
              <div className="stat-text">Happy Kids</div>
            </div>
            <div className="stat-box">
              <div className="stat-emoji">👨‍👩‍👧‍👦</div>
              <div className="stat-num">5,000+</div>
              <div className="stat-text">Proud Parents</div>
            </div>
            <div className="stat-box">
              <div className="stat-emoji">🏙️</div>
              <div className="stat-num">50+</div>
              <div className="stat-text">Cities</div>
            </div>
            <div className="stat-box">
              <div className="stat-emoji">🧠</div>
              <div className="stat-num">15,000+</div>
              <div className="stat-text">Skills Learned</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-wrapper" data-aos="fade-up" data-aos-delay="200">
            <h3 className="social-heading">Connect With Our Amazing Community! 🌈</h3>
            <p className="social-subtext">Join thousands of families on this incredible journey!</p>
            
            <div className="social-grid">
              <div className="social-card whatsapp-card">
                <FaWhatsapp className="social-card-icon" />
                <div className="social-card-content">
                  <h4>WhatsApp Community</h4>
                  <p>Daily tips & parent discussions</p>
                </div>
              </div>
              
              <div className="social-card telegram-card">
                <FaTelegram className="social-card-icon" />
                <div className="social-card-content">
                  <h4>Telegram Updates</h4>
                  <p>Latest courses & announcements</p>
                </div>
              </div>
              
              <div className="social-card facebook-card">
                <FaFacebook className="social-card-icon" />
                <div className="social-card-content">
                  <h4>Facebook Community</h4>
                  <p>Share achievements & connect</p>
                </div>
              </div>
              
              <div className="social-card instagram-card">
                <FaInstagram className="social-card-icon" />
                <div className="social-card-content">
                  <h4>Instagram Stories</h4>
                  <p>Behind-the-scenes & tips</p>
                </div>
              </div>
            </div>
          </div>

          {/* Events and Highlights */}
          <div className="activities-wrapper" data-aos="fade-up" data-aos-delay="400">
            <div className="events-section">
              <h4 className="events-title">Exciting Community Events! 🎪</h4>
              <div className="events-list">
                <div className="event-card">
                  <span className="event-emoji">🎭</span>
                  <div className="event-info">
                    <h5>Monthly Parent Workshops</h5>
                    <p>Learn parenting strategies & child development</p>
                  </div>
                </div>
                <div className="event-card">
                  <span className="event-emoji">🌟</span>
                  <div className="event-info">
                    <h5>Weekly Kid Talent Shows</h5>
                    <p>Showcase your child's amazing skills</p>
                  </div>
                </div>
                <div className="event-card">
                  <span className="event-emoji">🏆</span>
                  <div className="event-info">
                    <h5>Quarterly Competitions</h5>
                    <p>Fun challenges with exciting prizes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="highlights-section">
              <h4 className="highlights-title">This Week's Highlights ✨</h4>
              <div className="highlights-list">
                <div className="highlight-card">
                  <span className="highlight-emoji">🎨</span>
                  <p><strong>Anaya (6)</strong> created her first digital masterpiece!</p>
                </div>
                <div className="highlight-card">
                  <span className="highlight-emoji">🧩</span>
                  <p><strong>Rohan (8)</strong> solved 50 logic puzzles this week!</p>
                </div>
                <div className="highlight-card">
                  <span className="highlight-emoji">🎤</span>
                  <p><strong>Priya (5)</strong> gave her first confident speech!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Questions? We're Just a Click Away! 🤔
          </h2>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="faq-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div 
                  className="faq-question" 
                  onClick={() => handleFaqToggle(index)}
                >
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">
                    {expandedFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-content" data-aos="zoom-in">
            <h2>Ready to Start Your Child's Amazing Journey? 🌟</h2>
            <p>Join thousands of families building brighter futures together!</p>
            <div className="final-cta-buttons">
              <button 
                className="btn btn-magical large primary"
                onClick={() => navigate("/register")}
              >
                🚀 Start Free Today
              </button>
              <button 
                className="btn btn-magical large secondary"
                onClick={() => navigate("/courses")}
              >
                📚 Explore Programs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
