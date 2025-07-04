import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { 
  FiHome, 
  FiBookOpen, 
  FiUsers, 
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import "./common.css";

const Sidebar = () => {
  const { user, logout } = UserData();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: <FiHome />,
      label: "Dashboard",
      roles: ["admin", "superadmin"]
    },
    {
      path: "/admin/course",
      icon: <FiBookOpen />,
      label: "Courses",
      roles: ["admin", "superadmin"]
    },
    {
      path: "/admin/users",
      icon: <FiUsers />,
      label: "Users",
      roles: ["superadmin"]
    }
  ];

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => {
    return activePath === path ? "active" : "";
  };

  const userHasAccess = (roles) => {
    if (!user) return false;
    return roles.includes(user.mainrole);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h3>Admin Panel</h3>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            if (!userHasAccess(item.roles)) return null;
            
            return (
              <li key={item.path} className={isActive(item.path)}>
                <Link to={item.path}>
                  <span className="icon">{item.icon}</span>
                  {!isCollapsed && <span className="label">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="icon"><FiLogOut /></span>
          {!isCollapsed && <span className="label">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
