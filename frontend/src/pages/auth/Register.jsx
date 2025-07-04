import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import "./auth.css";

const Register = () => {
  const navigate = useNavigate();
  const { isAuth } = UserData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    age: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Password strength calculation
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength <= 2) return "weak";
    if (passwordStrength <= 3) return "medium";
    return "strong";
  };

  const roles = [
    { 
      id: "student", 
      name: "Student", 
      icon: "🎓",
      description: "I want to learn and explore!"
    },
    { 
      id: "parent", 
      name: "Parent", 
      icon: "👨‍👩‍👧‍👦",
      description: "I want to help my child learn"
    },
    { 
      id: "admin", 
      name: "Teacher", 
      icon: "👩‍🏫",
      description: "I want to create courses"
    }
  ];

  const ages = Array.from({ length: 13 }, (_, i) => i + 3); // Ages 3-15

  const handleRoleSelect = (roleId) => {
    setFormData(prev => ({
      ...prev,
      role: roleId
    }));
    
    // Add fun interaction
    const roleElement = document.querySelector(`[data-role="${roleId}"]`);
    if (roleElement) {
      roleElement.classList.add('animate-bounce-fun');
      setTimeout(() => {
        roleElement.classList.remove('animate-bounce-fun');
      }, 600);
    }
  };

  const handleAgeSelect = (age) => {
    setFormData(prev => ({
      ...prev,
      age: age.toString()
    }));
    
    // Add fun interaction
    const ageElement = document.querySelector(`[data-age="${age}"]`);
    if (ageElement) {
      ageElement.classList.add('animate-bounce-fun');
      setTimeout(() => {
        ageElement.classList.remove('animate-bounce-fun');
      }, 300);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        toast.error("Please tell us your name! 🌟");
        return;
      }
      if (!formData.email.trim()) {
        toast.error("We need your email to send you magical updates! ✨");
        return;
      }
      if (!formData.password) {
        toast.error("Create a super strong password! 🔐");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match! Try again! 🎯");
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.role) {
        toast.error("Please choose your role! 🌈");
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
    
    // Add celebration animation
    document.querySelector('.auth-wrapper').classList.add('animate-bounce-fun');
    setTimeout(() => {
      document.querySelector('.auth-wrapper').classList.remove('animate-bounce-fun');
    }, 600);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (formData.role === "student" && !formData.age) {
      toast.error("Please tell us your age! 🎂");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        age: formData.role === "student" ? parseInt(formData.age) : undefined,
      });

      toast.success("🎉 Welcome to BigBuddie! Check your email for verification!");
      navigate("/verify");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong! 😔");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator" style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      marginBottom: 'var(--space-6)'
    }}>
      {[1, 2, 3].map(step => (
        <div
          key={step}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: step <= currentStep ? 'var(--gradient-rainbow)' : 'var(--gray-light)',
            transition: 'all var(--duration-normal) ease',
            animation: step === currentStep ? 'pulse-glow 2s infinite' : 'none'
          }}
        />
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="auth-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          What's your magical name?
        </label>
        <div className="form-group has-icon">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input input-magical"
            placeholder="Enter your awesome name"
            required
          />
          <span className="form-icon">🌟</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Your magical email address
        </label>
        <div className="form-group has-icon">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input input-magical"
            placeholder="your.email@awesome.com"
            required
          />
          <span className="form-icon">📧</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Create your secret password
        </label>
        <div className="form-group has-icon">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input input-magical"
            placeholder="Make it super strong!"
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
        {formData.password && (
          <div className="password-strength">
            {[1, 2, 3, 4, 5].map(level => (
              <div
                key={level}
                className={`strength-bar ${level <= passwordStrength ? getPasswordStrengthClass() : ''}`}
              />
            ))}
            <span className="strength-text">
              {getPasswordStrengthText()} 💪
            </span>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm your secret password
        </label>
        <div className="form-group has-icon">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="form-input input-magical"
            placeholder="Type it again to make sure!"
            required
          />
          <span className="form-icon">🔒</span>
        </div>
      </div>

      <button
        type="button"
        onClick={nextStep}
        className="auth-submit btn-magical"
      >
        Next Step 🚀
      </button>
    </div>
  );

  const renderRoleSelection = () => (
    <div className="auth-form">
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <h3 style={{ 
          fontSize: 'var(--font-xl)', 
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-2)'
        }}>
          Who are you in our magical world? ✨
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Choose your adventure!
        </p>
      </div>

      <div className="role-selection">
        {roles.map(role => (
          <div
            key={role.id}
            data-role={role.id}
            className={`role-option hover-lift ${formData.role === role.id ? 'selected' : ''}`}
            onClick={() => handleRoleSelect(role.id)}
          >
            <div className="role-icon">{role.icon}</div>
            <div className="role-name">{role.name}</div>
            <div style={{ 
              fontSize: 'var(--font-xs)', 
              color: 'var(--text-light)',
              textAlign: 'center',
              marginTop: 'var(--space-1)'
            }}>
              {role.description}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-4)', 
        marginTop: 'var(--space-6)' 
      }}>
        <button
          type="button"
          onClick={prevStep}
          className="auth-submit"
          style={{ 
            background: 'var(--gray-light)', 
            color: 'var(--text-primary)',
            flex: 1
          }}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="auth-submit btn-magical"
          style={{ flex: 2 }}
          disabled={!formData.role}
        >
          Continue Adventure 🌈
        </button>
      </div>
    </div>
  );

  const renderAgeSelection = () => (
    <div className="auth-form">
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <h3 style={{ 
          fontSize: 'var(--font-xl)', 
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-2)'
        }}>
          {formData.role === "student" ? "How old are you? 🎂" : "Almost ready! 🎉"}
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          {formData.role === "student" 
            ? "We'll customize your learning experience!"
            : "Let's complete your magical registration!"
          }
        </p>
      </div>

      {formData.role === "student" && (
        <div className="age-selection">
          {ages.map(age => (
            <div
              key={age}
              data-age={age}
              className={`age-option hover-glow ${formData.age === age.toString() ? 'selected' : ''}`}
              onClick={() => handleAgeSelect(age)}
            >
              {age}
            </div>
          ))}
        </div>
      )}

      {formData.role === "parent" && (
        <div className="parent-connection">
          <div className="parent-connection-title">
            Parent Dashboard Access
          </div>
          <div className="parent-connection-text">
            You'll be able to connect with your children's accounts and track their amazing progress!
          </div>
        </div>
      )}

      {formData.role === "admin" && (
        <div className="parent-connection">
          <div className="parent-connection-title">
            Teacher Admin Access
          </div>
          <div className="parent-connection-text">
            You'll have access to create courses, manage students, and make learning magical!
          </div>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-4)', 
        marginTop: 'var(--space-6)' 
      }}>
        <button
          type="button"
          onClick={prevStep}
          className="auth-submit"
          style={{ 
            background: 'var(--gray-light)', 
            color: 'var(--text-primary)',
            flex: 1
          }}
        >
          ← Back
        </button>
        <button
          type="submit"
          onClick={submitHandler}
          className={`auth-submit btn-magical ${isLoading ? 'loading' : ''}`}
          style={{ flex: 2 }}
          disabled={isLoading || (formData.role === "student" && !formData.age)}
        >
          {isLoading ? "Creating Magic..." : "Join BigBuddie! 🎉"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-mascot register-mascot" />
        
        <div className="auth-header">
          <div className="auth-logo">BigBuddie</div>
          <h2 className="auth-title">
            {currentStep === 1 && "Welcome to the Adventure! 🌟"}
            {currentStep === 2 && "Choose Your Role! 🎭"}
            {currentStep === 3 && "Final Step! 🏁"}
          </h2>
          <p className="auth-subtitle">
            {currentStep === 1 && "Let's create your magical learning account"}
            {currentStep === 2 && "Tell us who you are in our learning world"}
            {currentStep === 3 && "Complete your journey to BigBuddie"}
          </p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={submitHandler}>
          {currentStep === 1 && renderPersonalInfo()}
          {currentStep === 2 && renderRoleSelection()}
          {currentStep === 3 && renderAgeSelection()}
        </form>

        <div className="auth-links">
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign In Here! 🔑
            </Link>
          </p>
        </div>

        <div className="social-login">
          <div className="social-title">
            Or join with social magic
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
      </div>
    </div>
  );
};

export default Register;
