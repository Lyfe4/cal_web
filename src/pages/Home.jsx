import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <SEO 
        title="Calvin R Development | Professional Frontend Web Development in Armidale"
        description="Expert frontend web development services in Armidale, NSW. Creating beautiful, responsive websites with a focus on quality and communication. Remote services available Australia-wide."
        canonicalUrl="/"
        keywords="frontend web development, Armidale web developer, responsive design, quality web development, professional web services, React developer, NSW web development"
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="slide-up">Creating Beautiful & Functional Websites</h1>
          <p className="fade-in">
            Transform your business with an online presence. Offering professional custom web solutions tailored to your business needs.
            We create modern, responsive websites that help you grow and stand out from the competition.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Custom Front-end Web Development</h3>
              <p>
                Tailor-made websites built with modern technologies to meet your specific requirements.
              </p>
            </div>
            <div className="service-card">
              <h3>Responsive Design</h3>
              <p>
                Websites that look and work perfectly on all devices, from mobile to desktop.
              </p>
            </div>
            <div className="service-card">
              <h3>UI/UX Optimization</h3>
              <p>
              Creating intuitive, user-friendly interfaces with smooth navigation and engaging interactions to enhance user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let's discuss how we can help bring your vision to life and create a website that exceeds your expectations.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
