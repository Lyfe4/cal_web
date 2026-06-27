import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import CalvinImage from '../images/calvin.jpg';
import Image from '../components/Image';
import Tilt from '../components/Tilt';
import { ArrowRightIcon } from '../components/Icons';
import { CodeAnim, ChatAnim, SparkleAnim } from '../components/ServiceIcons';
import { ServerAnim, RocketAnim, ShieldAnim, UsersAnim } from '../components/AboutIcons';
import '../styles/About.css';

const skills = [
  { icon: <CodeAnim />, title: 'Frontend Development', items: 'React · TypeScript · HTML5 · CSS3 · JavaScript · Responsive Design' },
  { icon: <ServerAnim />, title: 'Backend & Languages', items: 'Python · Django · Node.js · Java · C · PostgreSQL' },
  { icon: <RocketAnim />, title: 'Tools & Deployment', items: 'Git · Docker · AWS · Google Analytics · CI/CD' },
];

const values = [
  { icon: <ShieldAnim />, title: 'Quality First', desc: 'I deliver high-quality work that stands the test of time — no cut corners.' },
  { icon: <ChatAnim />, title: 'Clear Communication', desc: 'Regular updates and plain language keep us on the same page throughout.' },
  { icon: <UsersAnim />, title: 'User-Centered Design', desc: 'Your customers are at the heart of every decision I make.' },
  { icon: <SparkleAnim />, title: 'Continuous Learning', desc: 'The web evolves constantly — and so do I, so your site stays modern.' },
];

const About = () => {
  return (
    <div className="about-page">
      <SEO
        title="About Calvin R Development | Frontend Web Developer in Armidale"
        description="Meet Calvin, a passionate frontend web developer based in Armidale with over 5 years of experience creating exceptional digital solutions with a focus on quality and communication."
        canonicalUrl="/about"
        keywords="frontend developer Armidale, web developer profile, Calvin R Development, quality web development, professional web developer NSW"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Calvin',
          jobTitle: 'Frontend Web Developer',
          description: 'Frontend web developer with over 5 years of experience creating exceptional digital solutions',
          address: { '@type': 'PostalAddress', addressLocality: 'Armidale', addressRegion: 'NSW', addressCountry: 'Australia' },
          image: 'https://calvinrdevelopment.com/images/calvin.jpg',
          url: 'https://calvinrdevelopment.com/about',
          sameAs: ['https://www.linkedin.com/in/calvin-reinke-24792132b/', 'https://github.com/Lyfe4'],
        }}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <Reveal as="span" className="eyebrow">About me</Reveal>
          <Reveal as="h1" delay={0.05}>The developer behind <span className="gradient-text">your website</span></Reveal>
          <Reveal as="p" delay={0.1}>
            A passionate frontend developer crafting beautiful, functional digital experiences for businesses across Australia.
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section about-story">
        <div className="container about-story-grid">
          <Reveal className="about-image-wrap" y={0}>
            <Tilt className="about-image-frame" max={14} scale={1.03} glare>
              <Image src={CalvinImage} alt="Calvin, frontend web developer" height={460} />
            </Tilt>
            <div className="about-image-glow" aria-hidden="true"></div>
          </Reveal>
          <Reveal className="about-content" delay={0.1}>
            <span className="eyebrow">My journey</span>
            <h2>Turning ideas into websites that work</h2>
            <p>With over 5 years of experience in software development and a Bachelor of Computer Science, I've dedicated my career to building exceptional websites for businesses and individuals alike.</p>
            <p>I combine creative design with technical excellence to deliver sites that don't just look great — they perform, convert, and grow with your business.</p>
            <p>My approach starts with understanding your unique vision, then turning it into a hassle-free solution that exceeds expectations.</p>
            <Link to="/contact" className="btn-primary about-cta">Work with me <ArrowRightIcon size={18} /></Link>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section className="section skills-section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Technical expertise</span>
            <h2>The tools of the trade</h2>
            <p>A modern stack, chosen to build fast, reliable, future-proof websites.</p>
          </Reveal>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="skill-card glass-card">
                <div className="skill-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.items}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How I work</span>
            <h2>What I value</h2>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="value-card glass-card">
                <div className="value-icon">{v.icon}</div>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
