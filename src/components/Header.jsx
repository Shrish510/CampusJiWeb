// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/main.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="header">
      <div className="logo-container">
        {/* Adjust path to assets if needed, or put images in public folder */}
        <Link to="/">
            <img src={`${import.meta.env.BASE_URL}images/Campusjilogo.webp`} alt="CampusJi Logo" className="logo" />
        </Link>
        <span className="logo-text">CampusJi</span>
      </div>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about-us" className={isActive('/about-us')} onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/services" className={isActive('/services')} onClick={() => setIsMenuOpen(false)}>Services</Link></li>

          {user ? (
            <>
               <li><span className="user-greeting">Hi, {user.name}</span></li>
               <li><button onClick={() => { logout(); setIsMenuOpen(false); }} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className={`login-btn ${isActive('/login')}`} onClick={() => setIsMenuOpen(false)}>Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
