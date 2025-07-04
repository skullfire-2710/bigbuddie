import React, { useEffect } from 'react';
import { CourseData } from '../../context/CourseContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaBook, FaGraduationCap, FaChartLine, FaUserCircle, FaArrowRight } from 'react-icons/fa';
import './dashbord.css';

const Dashbord = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Check authentication and redirect if needed
  useEffect(() => {
    if (!user) {
      console.log('No user data available. Redirecting to login.');
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="auth-required-container">
        <div className="auth-message">
          <FaUserCircle className="auth-icon" />
          <h2>Authentication Required</h2>
          <p>Please log in to access your learning dashboard</p>
          <div className="button-group">
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-primary"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="btn btn-outline"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Get user's enrolled courses from context
  const { mycourse = [], fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchMyCourse && fetchMyCourse(); // fetch on mount if available
  }, [fetchMyCourse]);

  const stats = [
    { label: 'Enrolled Courses', value: mycourse.length, icon: <FaBook /> },
    { label: 'In Progress', value: mycourse.filter(c => c.progress > 0 && c.progress < 100).length, icon: <FaChartLine /> },
    { label: 'Completed', value: mycourse.filter(c => c.progress >= 100).length, icon: <FaGraduationCap /> },
  ];

  return (
    <div className="student-dashboard-page full-screen-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="dashboard-hero">
          <h1 className="dashboard-title">Welcome Back, {user?.name?.split(' ')[0] || 'Learner'}!</h1>
          <p className="dashboard-subtitle">Continue your learning journey or explore new courses</p>
        </div>
      </header>

      <main>
        {/* Stats Overview */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">My Learning</h2>
            <Link to="/courses" className="view-all-link">
              View All <FaArrowRight size={14} style={{ marginLeft: '4px' }} />
            </Link>
          </div>
          <div className="courses-grid">
            {mycourse.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No courses enrolled yet!</h3>
                <p>Browse our courses and start your learning journey.</p>
                <Link to="/courses" className="continue-btn">Browse Courses</Link>
              </div>
            ) : (
              mycourse.map(course => (
                <div key={course._id} className="course-card">
                  <div className="course-image">
                    <img src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course'} alt={course.title} />
                    <span className="course-category">{course.category}</span>
                  </div>
                  <div className="course-content">
                    <h3 className="course-title">{course.title}</h3>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${course.progress || 0}%` }}
                        />
                      </div>
                      <span className="progress-text">{course.progress || 0}% Complete</span>
                    </div>
                    <div className="course-meta">
                      <span>{course.lessonsCompleted ?? 0}/{course.totalLessons ?? 0} Lessons</span>
                      <Link to={`/course/study/${course._id}`} className="continue-btn">
                        {(!course.progress || course.progress === 0) ? 'Start Learning' : 'Continue'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <Link to="/courses" className="action-card">
              <div className="action-icon">
                <FaBook />
              </div>
              <h3>Browse Courses</h3>
              <p>Explore new skills and topics to enhance your knowledge</p>
            </Link>
            
            <Link to="/dashboard/progress" className="action-card">
              <div className="action-icon">
                <FaChartLine />
              </div>
              <h3>Track Progress</h3>
              <p>View your learning analytics and achievements</p>
            </Link>
            
            <Link to="/dashboard/certificates" className="action-card">
              <div className="action-icon">
                <FaGraduationCap />
              </div>
              <h3>My Certificates</h3>
              <p>View and share your learning achievements</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashbord;
