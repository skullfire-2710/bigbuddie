import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import { FaSpinner, FaUserCog, FaUserShield, FaUser, FaArrowLeft } from "react-icons/fa";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is superadmin
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.mainrole !== "superadmin") {
      toast.error("Unauthorized access. Admin privileges required.");
      navigate("/");
      return;
    }
    
    // If we get here, user is authenticated and is a superadmin
    fetchUsers();
  }, [user, navigate]);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  const updateRole = async (id) => {
    if (window.confirm("Are you sure you want to update this user's role?")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message || "User role updated successfully");
        fetchUsers();
      } catch (error) {
        console.error("Error updating user role:", error);
        toast.error(error.response?.data?.message || "Failed to update user role");
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="admin-loading">
          <FaSpinner className="spinner" />
          <p>Loading users...</p>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="admin-error">
          <p>{error}</p>
          <button onClick={fetchUsers} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  // Main content
  return (
    <Layout>
      <div className="admin-users-container">
        <div className="admin-header">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1><FaUserShield /> User Management</h1>
          <p>Manage user accounts and permissions</p>
        </div>
        
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-users">
                    <FaUserCog className="no-users-icon" />
                    <p>No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((userItem, index) => (
                  <tr key={userItem._id}>
                    <td>{index + 1}</td>
                    <td className="user-info">
                      <div className="user-avatar">
                        <FaUser />
                      </div>
                      <span>{userItem.name}</span>
                    </td>
                    <td>{userItem.email}</td>
                    <td>
                      <span className={`role-badge ${userItem.role || 'user'}`}>
                        {userItem.role || 'user'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => updateRole(userItem._id)}
                        className={`btn ${userItem.role === 'admin' ? 'btn-warning' : 'btn-primary'}`}
                        disabled={userItem._id === user?._id}
                        title={userItem._id === user?._id ? "You can't modify your own role" : "Update user role"}
                      >
                        {userItem.role === 'admin' ? 'Make Regular User' : 'Make Admin'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
