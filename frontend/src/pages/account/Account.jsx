import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import "../../theme.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaIdBadge, FaMedal, FaCrown } from "react-icons/fa";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };
  
  // Get role-based color
  const getRoleColor = () => {
    if (!user) return "var(--primary-teal)";
    if (user.role === "admin") return "var(--primary-purple)";
    return "var(--primary-blue)";
  };
  
  // Get role badge icon
  const getRoleBadge = () => {
    if (!user) return null;
    if (user.role === "admin") return <FaCrown className="role-icon" />;
    return <FaIdBadge className="role-icon" />;
  };
  
  return (
    <div className="account-page">
      {user && (
        <>
          {/* Hero Section */}
          <section className="account-hero" style={{ backgroundColor: getRoleColor() }}>
            <div className="container">
              <motion.div 
                className="account-hero-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="welcome-message">Welcome back, <span className="user-name">{user.name}!</span></h1>
                <p className="account-subtitle">Manage your BigBuddie profile and explore your learning journey</p>
              </motion.div>
            </div>
          </section>
          
          {/* Profile Section */}
          <section className="profile-section">
            <div className="container">
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <img 
                      src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user.name}&backgroundColor=b6e3f4,c0aede,d1d4f9&scale=110`} 
                      alt="Profile" 
                    />
                    <div className="role-badge" style={{ backgroundColor: getRoleColor() }}>
                      {getRoleBadge()}
                      <span>{user.role}</span>
                    </div>
                  </div>
                  
                  <div className="profile-title">
                    <h2>My Profile</h2>
                    <p>Manage your account details and preferences</p>
                  </div>
                </div>
                
                <div className="profile-body">
                  <div className="profile-info">
                    <div className="info-card">
                      <div className="info-icon">
                        <FaUser />
                      </div>
                      <div className="info-content">
                        <h3>Name</h3>
                        <p>{user.name}</p>
                      </div>
                    </div>
                    
                    <div className="info-card">
                      <div className="info-icon">
                        <FaEnvelope />
                      </div>
                      <div className="info-content">
                        <h3>Email</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="info-card achievements">
                      <div className="info-icon">
                        <FaMedal />
                      </div>
                      <div className="info-content">
                        <h3>Achievements</h3>
                        <p>Start learning to earn badges!</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="profile-actions">
                  <motion.button
                    onClick={() => navigate(`/${user._id}/dashboard`)}
                    className="common-btn primary-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdDashboard />
                    My Dashboard
                  </motion.button>
                  
                  {user.role === "admin" && (
                    <motion.button
                      onClick={() => navigate(`/admin/dashboard`)}
                      className="common-btn secondary-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdDashboard />
                      Admin Dashboard
                    </motion.button>
                  )}
                  
                  <motion.button
                    onClick={logoutHandler}
                    className="common-btn danger-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IoMdLogOut />
                    Logout
                  </motion.button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Quick Links Section */}
          <section className="quick-links-section">
            <div className="container">
              <h2 className="section-title">Explore BigBuddie</h2>
              <div className="quick-links">
                <motion.div 
                  className="quick-link-card"
                  whileHover={{ y: -10 }}
                  onClick={() => navigate('/courses')}
                >
                  <div className="quick-link-icon" style={{ backgroundColor: "var(--primary-yellow)" }}>
                    📚
                  </div>
                  <h3>Browse Courses</h3>
                  <p>Explore our skill development programs</p>
                </motion.div>
                
                <motion.div 
                  className="quick-link-card"
                  whileHover={{ y: -10 }}
                  onClick={() => navigate('/about')}
                >
                  <div className="quick-link-icon" style={{ backgroundColor: "var(--primary-green)" }}>
                    🌱
                  </div>
                  <h3>About Us</h3>
                  <p>Learn about our mission and values</p>
                </motion.div>
                
                <motion.div 
                  className="quick-link-card"
                  whileHover={{ y: -10 }}
                  onClick={() => navigate('/')}
                >
                  <div className="quick-link-icon" style={{ backgroundColor: "var(--primary-blue)" }}>
                    🏠
                  </div>
                  <h3>Home</h3>
                  <p>Return to the main page</p>
                </motion.div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Account;
