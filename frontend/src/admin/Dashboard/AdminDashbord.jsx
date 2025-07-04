import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";
import "../../theme.css";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBook, FaUsers, FaChartLine, FaRocket, FaCog } from "react-icons/fa";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (user && user.role !== "admin") return navigate("/");

  async function fetchStats() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);
  
  // Dashboard stat cards with appropriate icons
  const dashboardStats = [
    {
      title: "Total Courses",
      value: stats.totalCoures || 0,
      icon: <FaGraduationCap />,
      color: "var(--primary-blue)",
      bgColor: "rgba(98, 182, 203, 0.1)",
    },
    {
      title: "Total Lectures",
      value: stats.totalLectures || 0,
      icon: <FaBook />,
      color: "var(--primary-yellow)",
      bgColor: "rgba(255, 209, 102, 0.1)",
    },
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: <FaUsers />,
      color: "var(--primary-green)",
      bgColor: "rgba(6, 214, 160, 0.1)",
    }
  ];
  
  // Quick action links for admin
  const quickActions = [
    {
      title: "Analytics",
      icon: <FaChartLine />,
      color: "var(--primary-purple)",
      onClick: () => console.log("Analytics clicked")
    },
    {
      title: "Add Course",
      icon: <FaRocket />,
      color: "var(--primary-teal)",
      onClick: () => navigate("/create/course")
    },
    {
      title: "Settings",
      icon: <FaCog />,
      color: "var(--primary-blue)",
      onClick: () => console.log("Settings clicked")
    }
  ];

  return (
    <div className="admin-dashboard-page">
      <Layout>
        {/* Admin Hero Banner */}
        <section className="admin-hero">
          <div className="container">
            <motion.div 
              className="admin-hero-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="admin-title">Admin Dashboard</h1>
              <p className="admin-subtitle">Welcome back, {user?.name}! Manage your BigBuddie platform here.</p>
            </motion.div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="admin-stats-section">
          <div className="container">
            <div className="dashboard-stats-container">
              {isLoading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading dashboard data...</p>
                </div>
              ) : (
                dashboardStats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="dashboard-stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="stat-icon" style={{ color: stat.color, backgroundColor: stat.bgColor }}>
                      {stat.icon}
                    </div>
                    <div className="stat-info">
                      <h3 className="stat-title">{stat.title}</h3>
                      <p className="stat-value">{stat.value}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
        
        {/* Quick Actions Section */}
        <section className="admin-actions-section">
          <div className="container">
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-actions-container">
              {quickActions.map((action, index) => (
                <motion.div 
                  key={index}
                  className="quick-action-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.onClick}
                >
                  <div className="action-icon" style={{ color: action.color }}>
                    {action.icon}
                  </div>
                  <h3 className="action-title">{action.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default AdminDashbord;
