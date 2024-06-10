import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../../Styles.css';
import './Welcome.css';
import Footer from '../Root/Footer';
function AuthLay() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens, state)
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Blog</Link>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/user-dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/posts" className="nav-link">Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="/create-post" className="nav-link">Create Post</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default AuthLay;
