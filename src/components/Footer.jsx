import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const email = "calvin@calvinrdevelopment.com"; // Replace with your actual email
  const phone = "+61 447 576 460";  // Replace with your actual phone number
  const phoneFormatted = phone.replace(/[^\d+]/g, ''); // Remove non-digit characters except '+'

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${email}`} className="contact-link">
                <span className="contact-icon">📧</span>
                {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phoneFormatted}`} className="contact-link">
                <span className="contact-icon">📱</span>
                {phone}
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        {/*
        <div className="footer-section">
          <h3>Social</h3>
          <div className="social-links">
            <a href="#" className="nav-link">LinkedIn</a>
            <a href="#" className="nav-link">GitHub</a>
            <a href="#" className="nav-link">Twitter</a>
          </div>
        </div>
          */}
          <div className="footer-section">
            <h3>ABN:</h3>
            <a>15436897520</a>
          </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Calvin R Development. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;