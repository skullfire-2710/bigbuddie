import React from "react";
import "./about.css";
import "../../theme.css";
import { 
  FaHeart, 
  FaBrain, 
  FaUsers, 
  FaGamepad, 
  FaStar, 
  FaGraduationCap,
  FaLightbulb,
  FaHandsHelping,
  FaRocket,
  FaMagic,
  FaGem,
  FaCrown
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const coreValues = [
    {
      icon: <FaBrain />,
      title: "Mindset First",
      description: "We help young minds overcome fear of failure, self-doubt, and comparison by building positive habits and emotional strength.",
      color: "#FF6B6B",
      emoji: "🧠"
    },
    {
      icon: <FaGraduationCap />,
      title: "Skills for Life",
      description: "Communication, creativity, leadership, focus, decision-making—we believe these are as essential as academics.",
      color: "#4ECDC4",
      emoji: "🎯"
    },
    {
      icon: <FaUsers />,
      title: "Family-Centered",
      description: "Whether you're a parent, teacher, or mentor, our resources are made to support quality bonding and learning together.",
      color: "#45B7D1",
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      icon: <FaGamepad />,
      title: "Learn Through Play",
      description: "We bring learning to life with challenges, storytelling, games, and reflection-based activities.",
      color: "#96CEB4",
      emoji: "🎮"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="about-page magical-about">
      {/* Magical Floating Elements */}
      <div className="floating-elements">
        <div className="floating-star animate-float-magical">⭐</div>
        <div className="floating-heart animate-float-magical">💖</div>
        <div className="floating-rocket animate-float-magical">🚀</div>
        <div className="floating-magic animate-float-magical">✨</div>
        <div className="floating-gem animate-float-magical">💎</div>
      </div>

      {/* Hero Section */}
      <section className="about-hero magical-hero">
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="hero-mascot"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧙‍♂️
            </motion.div>
            
            <h1 className="about-title text-gradient-rainbow">
              About Us – BigBuddie 🌟
            </h1>
            <motion.p 
              className="about-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              At BigBuddie, we believe that every child is born with greatness inside them, 
              waiting to be nurtured, shaped, and celebrated. ✨
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="mission-section">
        <div className="container">
          <motion.div 
            className="mission-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mission-text">
              <motion.div variants={itemVariants} className="mission-card magical-card">
                <div className="mission-icon">
                  <FaHeart style={{ color: '#FF6B6B' }} />
                </div>
                <h2>Our Mission</h2>
                <p>
                  We're more than just journals and activity books. We are a <strong>movement to raise confident, 
                  resilient, and skilled young minds</strong>. Our mission is to empower children and teens with 
                  the tools they need to develop a growth mindset, build essential life skills, and grow into 
                  happy, capable, and compassionate human beings.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mission-card magical-card">
                <div className="mission-icon">
                  <FaMagic style={{ color: '#9B59B6' }} />
                </div>
                <h2>How We Do It</h2>
                <p>
                  Through beautifully designed journals, engaging printable kits, and hands-on learning resources, 
                  BigBuddie makes personal growth and skill development <strong>fun, practical, and meaningful</strong> 
                  for kids and families.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="values-section magical-values">
        <div className="container">
          <div className="section-header">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What We Stand For 🎯
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our core values guide everything we create for your little ones
            </motion.p>
          </div>
          
          <motion.div 
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
              <motion.div 
                key={value.title}
                className="value-card magical-value-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  rotateY: 5
                }}
                style={{ '--value-color': value.color }}
              >
                <div className="value-emoji">{value.emoji}</div>
                <div className="value-icon" style={{ color: value.color }}>
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <div className="value-sparkles">✨</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <motion.div 
            className="impact-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="impact-stats">
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="stat-icon">🎨</div>
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Creative Projects</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <div className="stat-icon">👨‍👩‍👧‍👦</div>
                <div className="stat-number">5,000+</div>
                <div className="stat-label">Happy Families</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="stat-icon">🏆</div>
                <div className="stat-number">50+</div>
                <div className="stat-label">Skills Developed</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section magical-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-mascot">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👑
              </motion.div>
            </div>
            
            <h2 className="cta-title">
              Creating Tomorrow's Leaders Today! 🌟
            </h2>
            <p className="cta-description">
              Join us in creating a generation of <strong>self-aware, purpose-driven, and skilled young leaders</strong>—
              because every big dream begins with a BigBuddie.
            </p>
            
            <div className="cta-buttons">
              <motion.button 
                className="btn-magical primary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/courses')}
              >
                <FaRocket /> Start the Adventure!
              </motion.button>
              
              <motion.button 
                className="btn-magical secondary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
              >
                <FaGem /> Join BigBuddie Family
              </motion.button>
            </div>
            
            <motion.div 
              className="cta-testimonial"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p>"BigBuddie transformed how my daughter sees learning. She's more confident, creative, and excited about growing!" 💕</p>
              <span>- Sarah M., Parent of 8-year-old</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Floating Elements */}
      <div className="bottom-floating-elements">
        <div className="floating-crown animate-bounce-fun">👑</div>
        <div className="floating-rainbow animate-wiggle">🌈</div>
        <div className="floating-trophy animate-pulse-glow">🏆</div>
      </div>
    </div>
  );
};

export default About;
