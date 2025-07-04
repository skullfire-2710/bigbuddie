import React, { useState, useEffect } from "react";
import "./courses.css";
import "../../theme.css";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaStar, FaRegStar, FaRocket, FaMagic, FaGem, FaCrown } from "react-icons/fa";

const Courses = () => {
  const { courses } = CourseData();
  const { user } = UserData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showMagicalSearch, setShowMagicalSearch] = useState(false);
  const [featuredCourse, setFeaturedCourse] = useState(null);
  
  // Define magical categories for skill tracks
  const categories = [
    { id: 'all', name: 'All Adventures', icon: '🌟', color: '#FF6B6B' },
    { id: 'creativity', name: 'Creative Magic', icon: '🎨', color: '#4ECDC4' },
    { id: 'problem-solving', name: 'Logic Wizardry', icon: '🧩', color: '#45B7D1' },
    { id: 'communication', name: 'Speech Spells', icon: '💬', color: '#96CEB4' },
    { id: 'leadership', name: 'Hero Training', icon: '👑', color: '#FFEAA7' },
    { id: 'technology', name: 'Future Magic', icon: '🚀', color: '#DDA0DD' }
  ];

  const difficultyLevels = [
    { id: 'all', name: 'All Levels', icon: '⭐', color: '#FFD93D' },
    { id: 'beginner', name: 'Little Explorer', icon: '🌱', color: '#6BCF7F' },
    { id: 'intermediate', name: 'Skill Builder', icon: '🔥', color: '#4D96FF' },
    { id: 'advanced', name: 'Master Level', icon: '💎', color: '#9B59B6' }
  ];
  
  // Filter courses based on search term and category
  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || (course.category && course.category.toLowerCase() === filter);
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             (course.difficulty && course.difficulty.toLowerCase() === selectedDifficulty);
    return matchesSearch && matchesFilter && matchesDifficulty;
  });

  // Set featured course on load
  useEffect(() => {
    if (courses && courses.length > 0) {
      const randomCourse = courses[Math.floor(Math.random() * courses.length)];
      setFeaturedCourse(randomCourse);
    }
  }, [courses]);
  
  return (
    <div className="courses-page magical-courses">
      {/* Magical Floating Elements */}
      <div className="floating-elements">
        <div className="floating-star">⭐</div>
        <div className="floating-heart">💖</div>
        <div className="floating-rocket">🚀</div>
        <div className="floating-magic">✨</div>
      </div>

      {/* Magical Hero Section */}
      <section className="courses-hero magical-hero">
        <div className="container">
          <motion.div 
            className="courses-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="hero-mascot"
              animate={{ 
                y: [0, -10, 0],
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
            
            <h1 className="courses-title text-gradient-rainbow">
              Welcome to the Magic Academy! 🏰
            </h1>
            <p className="courses-subtitle">
              🌟 Choose your magical learning adventure! Each course is like a treasure chest full of amazing skills, 
              fun challenges, and super cool powers waiting to be unlocked! ✨
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="magical-search-container">
              <motion.div 
                className="search-bar magical-search"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch className="search-icon animate-pulse-glow" />
                <input 
                  type="text" 
                  placeholder="🔍 Search for your magical adventure..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-magical"
                />
                {searchTerm && (
                  <motion.button
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                    whileHover={{ rotate: 90 }}
                  >
                    ❌
                  </motion.button>
                )}
              </motion.div>
              
              <motion.button 
                className="filter-toggle btn-magical"
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMagic /> Magic Filters ✨
              </motion.button>
            </div>
            
            {/* Magical Filter Options */}
            <AnimatePresence>
            {showFilters && (
              <motion.div 
                  className="filter-options magical-filters"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
              >
                  <div className="filter-section">
                    <h4>🎭 Adventure Types</h4>
                    <div className="filter-categories magical-categories">
                  {categories.map((category, index) => (
                        <motion.button 
                          key={category.id}
                          className={`filter-btn magical-filter-btn ${filter === category.id ? 'active' : ''}`}
                          onClick={() => setFilter(category.id)}
                          style={{ '--category-color': category.color }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="category-icon">{category.icon}</span>
                          <span className="category-name">{category.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h4>⭐ Difficulty Levels</h4>
                    <div className="filter-categories magical-categories">
                      {difficultyLevels.map((level, index) => (
                        <motion.button 
                          key={level.id}
                          className={`filter-btn magical-filter-btn ${selectedDifficulty === level.id ? 'active' : ''}`}
                          onClick={() => setSelectedDifficulty(level.id)}
                          style={{ '--category-color': level.color }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="category-icon">{level.icon}</span>
                          <span className="category-name">{level.name}</span>
                        </motion.button>
                  ))}
                    </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      {/* Magical Stats Bar */}
      <section className="magical-stats">
        <div className="container">
          <div className="stats-container">
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="stat-icon">🏆</div>
              <div className="stat-number">{filteredCourses?.length || 0}</div>
              <div className="stat-label">Magical Adventures</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <div className="stat-icon">⭐</div>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy Students</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="stat-icon">🎯</div>
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <div className="stat-icon">🚀</div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Learning Magic</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Magic Programs Section */}
      <section className="skill-programs-section magical-programs">
        <div className="container">
          <div className="courses-header">
            <motion.h2 
              className="section-title text-gradient-rainbow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🎭 Choose Your Magical Adventure! ✨
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Each adventure is designed by learning wizards to help you discover your superpowers! 🧙‍♀️✨
            </motion.p>
          </div>
          
          {/* Course Results Counter */}
          {filteredCourses && (
            <motion.div 
              className="course-results-info"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="results-badge">
                🔍 Found {filteredCourses.length} magical {filteredCourses.length === 1 ? 'adventure' : 'adventures'} for you! ✨
              </div>
            </motion.div>
          )}
          
          <div className="course-grid magical-grid">
            <AnimatePresence>
            {filteredCourses && filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <motion.div 
                    key={course._id}
                    className="course-card-wrapper magical-card-wrapper"
                    whileHover={{ 
                      y: -15, 
                      scale: 1.03,
                      rotateY: 5
                    }}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      bounce: 0.4
                    }}
                    layout
                  >
                    <div className="magical-glow"></div>
                    <CourseCard course={course} />
                    <div className="card-sparkles">
                      <span>✨</span>
                      <span>🌟</span>
                      <span>💫</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="no-courses magical-no-courses"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div 
                    className="no-courses-mascot"
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
                    🔮
                  </motion.div>
                  <h3>Oops! No magical adventures found! 🧙‍♂️</h3>
                  <p>🌟 Try different magic words or explore all our amazing adventures! ✨</p>
                  <motion.button
                    className="btn-magical"
                    onClick={() => {
                      setSearchTerm('');
                      setFilter('all');
                      setSelectedDifficulty('all');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔄 Reset Magic Filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Magical Featured Adventure Section */}
      {featuredCourse && (
        <section className="featured-program-section magical-featured">
        <div className="container">
            <motion.div 
              className="featured-program magical-featured-program"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
            <div className="featured-content">
                <motion.div 
                  className="featured-badge magical-badge"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  👑 Today's Royal Adventure! ✨
                </motion.div>
                <h2 className="text-gradient-rainbow">
                  {featuredCourse.title} 🎭
                </h2>
                <p>
                  🌟 This magical adventure has been chosen by our learning wizards just for you! 
                  It's packed with fun challenges, amazing rewards, and super cool powers! ✨
                </p>
                <div className="rating magical-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>
                  <span className="rating-text">(1000+ happy adventurers!)</span>
              </div>
                <ul className="featured-benefits magical-benefits">
                  <motion.li whileHover={{ x: 5 }}>🎯 Interactive challenges & games</motion.li>
                  <motion.li whileHover={{ x: 5 }}>🏆 Cool badges & achievements</motion.li>
                  <motion.li whileHover={{ x: 5 }}>📊 Progress tracking for parents</motion.li>
                  <motion.li whileHover={{ x: 5 }}>🎉 Fun rewards & celebrations</motion.li>
              </ul>
              <motion.button 
                  className="btn-magical featured-btn"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                  🚀 Start This Adventure!
              </motion.button>
            </div>
              <div className="featured-image magical-featured-image">
                <motion.div 
                  className="featured-mascot"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎪
                </motion.div>
                <div className="magical-particles">
                  <span>✨</span>
                  <span>🌟</span>
                  <span>💫</span>
                  <span>⭐</span>
                </div>
            </div>
            </motion.div>
        </div>
      </section>
      )}
      
      {/* Magical How It Works Section */}
      <section className="how-courses-work-section magical-how-it-works">
        <div className="container">
          <div className="section-header">
            <motion.h2 
              className="section-title text-gradient-rainbow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🪄 How the Magic Works! ✨
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Follow these magical steps to start your amazing learning adventure! 🌟
            </motion.p>
          </div>
          
          <div className="steps-container magical-steps">
            <motion.div 
              className="step-card magical-step-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <motion.div 
                className="step-number magical-step-number"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                1️⃣
              </motion.div>
              <div className="step-icon">🎯</div>
              <h3>Pick Your Magic Adventure!</h3>
              <p>Choose from our treasure chest of amazing adventures based on what makes you excited to learn! 🌟</p>
            </motion.div>
            
            <motion.div 
              className="step-connection magical-connection"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ➡️✨
            </motion.div>
            
            <motion.div 
              className="step-card magical-step-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
            >
              <motion.div 
                className="step-number magical-step-number"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                2️⃣
              </motion.div>
              <div className="step-icon">🎮</div>
              <h3>Play & Learn with Magic!</h3>
              <p>Unlock fun games, cool challenges, and interactive activities designed just for your learning style! 🎪</p>
            </motion.div>
            
            <motion.div 
              className="step-connection magical-connection"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              ➡️🌟
            </motion.div>
            
            <motion.div 
              className="step-card magical-step-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <motion.div 
                className="step-number magical-step-number"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                3️⃣
              </motion.div>
              <div className="step-icon">🏆</div>
              <h3>Collect Awesome Rewards!</h3>
              <p>Earn magical badges, celebrate your progress, and show off your amazing new superpowers! 🎉</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fun Achievement Section */}
      <section className="achievement-section">
        <div className="container">
          <motion.div 
            className="achievement-showcase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-gradient-rainbow">🏆 Unlock Amazing Achievements! 🎉</h2>
            <div className="achievements-grid">
              {[
                { icon: '🌟', name: 'First Adventure', desc: 'Complete your first course!' },
                { icon: '🔥', name: 'Learning Streak', desc: '7 days of continuous learning!' },
                { icon: '🎯', name: 'Perfect Score', desc: 'Get 100% on any challenge!' },
                { icon: '👑', name: 'Course Master', desc: 'Complete 5 adventures!' },
                { icon: '🚀', name: 'Speed Learner', desc: 'Finish a course in record time!' },
                { icon: '💎', name: 'Skill Diamond', desc: 'Master all skills in a category!' }
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-badge badge-achievement"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-name">{achievement.name}</div>
                  <div className="achievement-desc">{achievement.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
