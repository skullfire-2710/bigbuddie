import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_Bbffj9HpjLQL5E",
      amount: order.id,
      currency: "INR",
      name: "BigBuddle Learning",
      description: "Empowering children with fun, personalized learning",
      order_id: order.id,

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  // Render the action button (used in both sidebar and fixed position on mobile)
  const renderActionButton = (isFixed = false) => {
    if (user && user.subscription && user.subscription.includes(course?._id)) {
      return (
        <button
          onClick={() => navigate(`/course/study/${course._id}`)}
          className={`bigbuddle-btn bigbuddle-study-btn ${isFixed ? 'bigbuddle-fixed-btn' : ''}`}
        >
          <span className="bigbuddle-icon">📚</span> Continue Learning
        </button>
      );
    } else {
      return (
        <button 
          onClick={checkoutHandler} 
          className={`bigbuddle-btn bigbuddle-enroll-btn ${isFixed ? 'bigbuddle-fixed-btn' : ''}`}
        >
          <span className="bigbuddle-icon">🚀</span> Enroll Now
        </button>
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="bigbuddle-course-container">
              <div className="bigbuddle-course-header">
                <h1 className="bigbuddle-course-title">{course.title}</h1>
                <p className="bigbuddle-course-tagline">Empowering children aged 3-15 with fun, personalized learning</p>
              </div>

              <div className="bigbuddle-course-content">
                <div className="bigbuddle-course-main">
                  <img
                    src={course.image ? `${server}/${course.image}` : 'https://via.placeholder.com/800x450?text=BigBuddle+Course'}
                    alt={course.title || 'Course Image'}
                    className="bigbuddle-course-image"
                  />

                  <div className="bigbuddle-course-details">
                    <h2>Course Details</h2>
                    <div className="bigbuddle-course-meta">
                      <p><span className="bigbuddle-icon">👨‍🏫</span> <strong>Instructor:</strong> {course.createdBy}</p>
                      <p><span className="bigbuddle-icon">⏱️</span> <strong>Duration:</strong> {course.duration} weeks</p>
                      <p><span className="bigbuddle-icon">🎯</span> <strong>Level:</strong> {course.level || 'Beginner to Advanced'}</p>
                    </div>

                    <div className="bigbuddle-course-description">
                      <h3>About This Course</h3>
                      <p>
                        {course.description || 'This comprehensive course is designed to help children learn and develop valuable skills in a fun and engaging environment. Join us on this learning journey!'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bigbuddle-course-sidebar">
                  <div className="bigbuddle-course-price-box">
                    <h3>Start Learning Today</h3>
                    <p className="bigbuddle-price">₹{course.price}</p>
                    {renderActionButton()}
                  </div>

                  <div className="bigbuddle-contact-box">
                    <h3>Need Help?</h3>
                    <p>Contact our support team</p>
                    <a href="tel:+919876543210" className="bigbuddle-contact-link">
                      +91 98765 43210
                    </a>
                    <a href="mailto:hello@bigbuddle.in" className="bigbuddle-contact-link">
                      hello@bigbuddle.in
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Fixed button for mobile */}
              {renderActionButton(true)}
            </div>
          )}
        </>
      )}
      
      {/* Add some space at the bottom to prevent content from being hidden behind fixed button */}
      <div style={{ height: '80px', width: '100%' }}></div>
    </>
  );
};

export default CourseDescription;