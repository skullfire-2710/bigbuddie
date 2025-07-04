import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();
  
  // Get instructor initials for avatar
  const getInitials = (name) => {
    if (!name) return 'BB';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/v1/course/${id}`, {
          withCredentials: true
        });

        toast.success(data.message || 'Course deleted successfully');
        fetchCourses();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting course');
      }
    }
  };
  return (
    <div className="course-card">
      <div className="course-image">
        {course.category && (
          <div className="course-category">{course.category}</div>
        )}
        <img 
          src={course.image ? `${server}/${course.image}` : 'https://via.placeholder.com/400x225?text=BigBuddie+Course'} 
          alt={course.title || 'Course thumbnail'} 
        />
      </div>
      
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description || 'Explore this exciting skill development program designed for children.'}</p>
        
        <div className="course-meta">
          <div className="course-instructor">
            <div className="instructor-avatar">{getInitials(course.createdBy)}</div>
            <span>{course.createdBy}</span>
          </div>
          <div className="course-price">₹{course.price}</div>
        </div>
        
        <div className="course-actions">
          {isAuth ? (
            <>
              {user && user.role !== "admin" ? (
                <>
                  {user.subscription && user.subscription.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="enroll-btn"
                    >
                      Continue Learning
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate(`/course/${course._id}`)}
                        className="view-course-btn"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate(`/course/${course._id}`)}
                        className="enroll-btn"
                      >
                        Enroll Now
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="view-course-btn"
                  >
                    View Content
                  </button>
                  {user && user.role === "admin" && (
                    <button
                      onClick={() => deleteHandler(course._id)}
                      className="enroll-btn"
                      style={{ backgroundColor: 'var(--danger-color, #dc3545)' }}
                    >
                      Delete Course
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => navigate(`/course/${course._id}`)}
                className="view-course-btn"
              >
                View Details
              </button>
              <button 
                onClick={() => navigate("/login")} 
                className="enroll-btn"
              >
                Enroll Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
