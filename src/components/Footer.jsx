// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CampusJi</h3>
          <p>Connecting the IPM community at IIM Rohtak.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
             {/* Add social icons if available */}
             <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
             <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CampusJi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
