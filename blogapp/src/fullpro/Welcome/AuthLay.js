import React from 'react';
import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom';
import '../../Styles.css';
import './Welcome.css';
import Footer from '../Root/Footer';

function AuthLay() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Blog</Link>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to={`/user-dashboard/${user.name}`} className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/posts" className="nav-link">Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="/create-post" className="nav-link">Create Post</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link btn btn-link">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default AuthLay;
