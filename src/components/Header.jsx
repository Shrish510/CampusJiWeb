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
      <div className="header-container">
        <div className="logo-section">
          {/* Adjust path to assets if needed, or put images in public folder */}
          <Link to="/">
              <img src={`${import.meta.env.BASE_URL}images/Campusjilogo.webp`} alt="CampusJi Logo" className="campusji-logo" />
          </Link>
          <span className="logo-text" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>CampusJi</span>
        </div>

        <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle navigation">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about-us" className={`nav-link ${isActive('/about-us')}`} onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/services" className={`nav-link ${isActive('/services')}`} onClick={() => setIsMenuOpen(false)}>Services</Link></li>

            {user ? (
              <>
                 <li><span className="user-greeting" style={{ color: 'white' }}>Hi, {user.name}</span></li>
                 <li><button onClick={() => { logout(); setIsMenuOpen(false); }} className="nav-link logout-btn" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" className={`nav-link login-btn ${isActive('/login')}`} onClick={() => setIsMenuOpen(false)}>Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
