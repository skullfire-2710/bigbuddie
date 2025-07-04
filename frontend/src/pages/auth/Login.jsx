import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth, setUser } = UserData();
  const { fetchMyCourse } = CourseData();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      toast.error("Please enter your magical email! ✨");
      return;
    }
    
    if (!formData.password) {
      toast.error("Don't forget your secret password! 🔐");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      toast.success(`🎉 Welcome back, ${data.user.name}! Ready for more adventures?`);
      
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      
      if (fetchMyCourse) {
        await fetchMyCourse();
      }
      
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong! 😔");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (type) => {
    if (type === 'demo-student') {
      setFormData({
        email: "student@demo.com",
        password: "demo123"
      });
      toast.success("Demo student account loaded! 🎓");
    } else if (type === 'demo-parent') {
      setFormData({
        email: "parent@demo.com", 
        password: "demo123"
      });
      toast.success("Demo parent account loaded! 👨‍👩‍👧‍👦");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-mascot login-mascot" />
        
        <div className="auth-header">
          <div className="auth-logo">BigBuddie</div>
          <h2 className="auth-title">Welcome Back! 🌟</h2>
          <p className="auth-subtitle">
            Ready to continue your magical learning journey?
          </p>
        </div>

        <form onSubmit={submitHandler} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Your magical email
            </label>
            <div className="form-group has-icon">
          <input
            type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input input-magical"
                placeholder="Enter your email address"
            required
          />
              <span className="form-icon">📧</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Your secret password
            </label>
            <div className="form-group has-icon">
          <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input input-magical"
                placeholder="Enter your password"
            required
          />
              <span 
                className="form-icon" 
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--space-6)'
          }}>
            <label className="custom-checkbox">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                Remember me 💭
              </span>
            </label>
            
            <Link to="/forgot" className="auth-link" style={{ fontSize: 'var(--font-sm)' }}>
              Forgot password? 🔑
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-submit btn-magical ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? "Opening the magic door..." : "Enter BigBuddie! 🚀"}
          </button>
        </form>

        <div className="auth-links">
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            New to BigBuddie?{" "}
            <Link to="/register" className="auth-link">
              Join the Adventure! 🌟
            </Link>
          </p>
        </div>

        {/* Quick Demo Access */}
        <div style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'rgba(72, 143, 205, 0.1)',
          borderRadius: 'var(--radius-xl)',
          border: '2px dashed var(--primary-blue)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'var(--space-4)'
          }}>
            <h4 style={{
              fontSize: 'var(--font-base)',
              color: 'var(--primary-blue)',
              margin: 0,
              marginBottom: 'var(--space-2)'
            }}>
              🎮 Try Demo Accounts
            </h4>
            <p style={{
              fontSize: 'var(--font-sm)',
              color: 'var(--text-secondary)',
              margin: 0
            }}>
              Experience BigBuddie without registration!
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            justifyContent: 'center'
          }}>
            <button
              type="button"
              onClick={() => handleQuickLogin('demo-student')}
              className="social-btn hover-lift"
              style={{ 
                fontSize: 'var(--font-sm)',
                padding: 'var(--space-2) var(--space-3)'
              }}
            >
              <span>🎓</span>
              Student Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('demo-parent')}
              className="social-btn hover-lift"
              style={{ 
                fontSize: 'var(--font-sm)',
                padding: 'var(--space-2) var(--space-3)'
              }}
            >
              <span>👨‍👩‍👧‍👦</span>
              Parent Demo
            </button>
          </div>
        </div>

        <div className="social-login">
          <div className="social-title">
            Or continue with social magic
          </div>
          <div className="social-buttons">
            <button className="social-btn google hover-lift">
              <span>🔥</span>
              Google
            </button>
            <button className="social-btn hover-lift">
              <span>📘</span>
              Facebook
            </button>
          </div>
        </div>

        {/* Fun Character Interactions */}
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          fontSize: '2rem',
          animation: 'float-magical 4s ease-in-out infinite',
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
        }}>
          🦄
        </div>

        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '-15px',
          fontSize: '1.5rem',
          animation: 'bounce-gentle 3s ease-in-out infinite',
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
        }}>
          ⭐
        </div>
      </div>
    </div>
  );
};

export default Login;
