import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Footer.css';
import { MailIcon, PhoneIcon, MapPinIcon, LinkedInIcon, GitHubIcon, ArrowRightIcon } from './Icons';

const Footer = () => {
  const email = 'calvin@calvinrdevelopment.com';
  const phone = '+61 447 576 460';
  const phoneFormatted = phone.replace(/[^\d+]/g, '');
  const year = new Date().getFullYear();
  const location = useLocation();

  // If already on the contact page, smooth-scroll to the form instead of a
  // no-op navigation.
  const handleStartProject = (e) => {
    if (location.pathname === '/contact') {
      const form = document.getElementById('contact-form');
      if (form) {
        e.preventDefault();
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-cta container">
        <div className="footer-cta-inner">
          <div>
            <h2>Have a project in mind?</h2>
            <p>Let's build something your business will be proud of.</p>
          </div>
          <Link to="/contact" className="btn-primary" onClick={handleStartProject}>
            Start a project <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>

      <div className="footer-main container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="brand-mark">CRD</span>
            <span>Calvin R Development</span>
          </Link>
          <p>Modern, high-performing websites for businesses across Armidale, NSW and Australia-wide.</p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/calvin-reinke-24792132b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
            <a href="https://github.com/Lyfe4" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon size={18} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Explore</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${email}`} className="contact-link">
                <MailIcon size={17} /> {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phoneFormatted}`} className="contact-link">
                <PhoneIcon size={17} /> {phone}
              </a>
            </li>
            <li>
              <span className="contact-link">
                <MapPinIcon size={17} /> Armidale, NSW 2350
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {year} Calvin R Development. All rights reserved.</p>
        <p className="footer-abn">ABN 15 436 897 520</p>
      </div>
    </footer>
  );
};

export default Footer;
