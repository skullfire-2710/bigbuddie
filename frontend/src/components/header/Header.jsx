import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { 
  FaHome, 
  FaBook, 
  FaInfoCircle, 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus,
  FaSignOutAlt,
  FaCog,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaBell,
  FaChartBar
} from "react-icons/fa";
import "./header.css";

const Header = ({ isAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuth, user } = UserData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const logoutHandler = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/courses", label: "Courses", icon: <FaBook /> },
    { path: "/about", label: "About", icon: <FaInfoCircle /> },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon">
            BB
          </div>
          <div className="logo-text">
            <h1 className="logo-title">BigBuddie</h1>
            <p className="logo-subtitle">Little Skills, Big Futures</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-menu">
          {navigationItems.map((item) => (
            <div key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
              >
                {item.icon}
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* User Actions */}
        <div className="user-actions">
          {isAuth ? (
            <>
              {/* Notifications (placeholder) */}
              <div className="notification-badge">
                <FaBell style={{ fontSize: '1.2rem', color: 'var(--text-light)' }} />
                <span className="badge-count">3</span>
              </div>

              {/* User Menu */}
              <div className="user-menu">
                <div className="user-avatar">
                  {getInitials(user?.name)}
                </div>
                <div className="dropdown-menu">
                  <Link to="/account" className="dropdown-item">
                    <FaUser />
                    My Profile
                  </Link>
                  {user?.role === "admin" && (
                    <>
                      <Link to="/admin/dashboard" className="dropdown-item">
                        <FaChartBar />
                        Admin Dashboard
                      </Link>
                      <div className="dropdown-divider"></div>
                    </>
                  )}
                  {user?.role === "parent" && (
                    <>
                      <Link to="/parent/dashboard" className="dropdown-item">
                        <FaChartBar />
                        Parent Dashboard
                      </Link>
                      <div className="dropdown-divider"></div>
                    </>
                  )}
                  <Link to="/dashboard" className="dropdown-item">
                    <FaGraduationCap />
                    My Learning
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <FaCog />
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={logoutHandler} className="dropdown-item">
                    <FaSignOutAlt />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                <FaSignInAlt />
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary">
                <FaUserPlus />
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navigationItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Actions */}
        <div className="mobile-actions">
          {isAuth ? (
            <>
              <Link 
                to="/account" 
                className="nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUser />
                My Profile
              </Link>
              {user?.role === "admin" && (
                <Link 
                  to="/admin/dashboard" 
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaChartBar />
                  Admin Dashboard
                </Link>
              )}
              {user?.role === "parent" && (
                <Link 
                  to="/parent/dashboard" 
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaChartBar />
                  Parent Dashboard
                </Link>
              )}
              <Link 
                to="/dashboard" 
                className="nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaGraduationCap />
                My Learning
              </Link>
              <button 
                onClick={() => {
                  logoutHandler();
                  setIsMobileMenuOpen(false);
                }}
                className="nav-link"
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="btn btn-outline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaSignInAlt />
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUserPlus />
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
