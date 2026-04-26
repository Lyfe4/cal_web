import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
import SEO from '../components/SEO';
import '../styles/About.css';
import CalvinImage from '../images/calvin.jpg';
import Image from '../components/Image';

const About = () => {
  return (
    <div className="about-page">
      <SEO 
        title="About Calvin R Development | Frontend Web Developer in Armidale"
        description="Meet Calvin, a passionate frontend web developer based in Armidale with over 5 years of experience creating exceptional digital solutions with a focus on quality and communication."
        canonicalUrl="/about"
        keywords="frontend developer Armidale, web developer profile, Calvin R Development, quality web development, professional web developer NSW"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Calvin",
          "jobTitle": "Frontend Web Developer",
          "description": "Frontend web developer with over 5 years of experience creating exceptional digital solutions",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Armidale",
            "addressRegion": "NSW",
            "addressCountry": "Australia"
          },
          "image": "https://calvinrdevelopment.com/images/calvin.jpg",
          "url": "https://calvinrdevelopment.com/about",
          "sameAs": [
            "https://www.linkedin.com/in/calvinrdevelopment",
            "https://github.com/calvinrdevelopment"
          ]
        }}
      />
      {/* Header Section - Immediate animation */}
      <section className="about-header">
        <div className="container">
          <h1>About Me</h1>
          <p>Passionate web developer crafting beautiful and functional digital experiences</p>
        </div>
      </section>

      {/* Story Section - Scroll triggered */}
      <ScrollAnimation animation="fade-in-slide">
        <section className="about-story">
          <div className="container">
            <div className="about-story-grid">
              <div className="about-image-placeholder">
              <Image 
                src={CalvinImage} 
                alt="Calvin" 
                height={450} 
              />
              </div>
              <div className="about-content">
                <h2>My Journey</h2>
                <p>With over 5 years of experience in software development and a Bachelor of Computer Science, I've now dedicated my career to creating exceptional digital web solutions for businesses and individuals alike.</p>
                <p>I believe in combining creative design with technical excellence to deliver websites that make a difference.</p>
                <p>My approach focuses on understanding each client's unique vision and needs to deliver hassle free solutions that exceed expectations.</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Skills Section - Scroll triggered */}
      <ScrollAnimation animation="fade-in">
        <section className="skills-section">
          <div className="container">
            <h2>Technical Expertise</h2>
            <div className="skills-grid">
              {[
                { icon: '🎨', title: 'Frontend Development', skills: 'React, TypeScript, HTML5, CSS3, JavaScript, Responsive Design' },
                { icon: '⚙️', title: 'Backend & other languages', skills: 'Node.js, Python, C, Java, Database Management' },
                { icon: '🚀', title: 'Tools & Deployment', skills: 'Git, Docker, AWS, Google Analytics, Continuous Integration' }
              ].map((skill, index) => (
                <ScrollAnimation key={index} animation="fade-up" className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.skills}</p>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Values Section - Scroll triggered */}
      <ScrollAnimation animation="fade-in">
        <section className="values-section">
          <div className="container">
            <h2>My Values</h2>
            <div className="values-grid">
              {[
                { title: 'Quality First', desc: 'I believe in delivering high-quality work that stands the test of time.' },
                { title: 'Clear Communication', desc: "Regular updates and clear communication ensures that we're always on the same page." },
                { title: 'User-Centered Design', desc: 'Your users are at the heart of everything I create.' },
                { title: 'Continuous Learning', desc: 'The tech world is constantly evolving, so am I.' }
              ].map((value, index) => (
                <ScrollAnimation key={index} animation="fade-up" className="value-card">
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
};

export default About;
