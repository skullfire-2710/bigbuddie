import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !description || !category || !price || !createdBy || !duration || !image) {
      toast.error('Please fill all fields and select an image');
      return;
    }
    
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/v1/course/new`, myForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          withCredentials: true
        },
      });

      toast.success(data.message || 'Course created successfully!');
      setBtnLoading(false);
      await fetchCourses();
      
      // Reset form fields after successful submission
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error(error.response?.data?.message || 'Error creating course. Please try again.');
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses-page">
        <div className="admin-courses-header">
          <h1>Course Management</h1>
          <p>Create and manage your BigBuddie skill programs</p>
        </div>
        
        <div className="admin-courses-container">
          <div className="courses-list-section">
            <div className="section-header">
              <h2>All Courses</h2>
              <span className="course-count">{courses?.length || 0} courses</span>
            </div>
            
            <div className="dashboard-courses-grid">
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <div className="no-courses-message">
                  <div className="icon">📚</div>
                  <h3>No Courses Available</h3>
                  <p>Create your first course using the form on the right.</p>
                </div>
              )}
            </div>
          </div>

          <div className="course-form-section">
            <div className="course-form-container">
              <div className="form-header">
                <h2>Create New Course</h2>
                <p>Fill in the details to add a new skill program</p>
              </div>
              
              <form onSubmit={submitHandler} className="course-creation-form">
                <div className="form-group">
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Creative Thinking for Kids"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe what children will learn"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="price">Price (₹)</label>
                    <input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g., 499"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group half">
                    <label htmlFor="duration">Duration (hours)</label>
                    <input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 8"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="createdBy">Instructor</label>
                    <input
                      id="createdBy"
                      type="text"
                      value={createdBy}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      placeholder="e.g., Ms. Priya Sharma"
                      required
                    />
                  </div>

                  <div className="form-group half">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option value={category} key={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="courseImage">Course Thumbnail</label>
                  <div className="file-upload-container">
                    <input 
                      id="courseImage" 
                      type="file" 
                      accept="image/*"
                      onChange={changeImageHandler} 
                      required 
                    />
                    <div className="upload-instructions">
                      <span>Click to upload image (16:9 ratio recommended)</span>
                    </div>
                  </div>
                  
                  {imagePrev && (
                    <div className="image-preview">
                      <img src={imagePrev} alt="Course thumbnail preview" />
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setTitle('');
                      setDescription('');
                      setPrice('');
                      setCreatedBy('');
                      setCategory('');
                      setDuration('');
                      setImage('');
                      setImagePrev('');
                    }}
                    className="reset-btn"
                    disabled={btnLoading}
                  >
                    Reset Form
                  </button>
                  
                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="submit-btn"
                  >
                    {btnLoading ? (
                      <>
                        <span className="spinner"></span>
                        Creating...
                      </>
                    ) : (
                      'Create Course'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
