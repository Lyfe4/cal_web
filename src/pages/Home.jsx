import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { ArrowRightIcon, ExternalIcon, CheckIcon } from '../components/Icons';
import {
  CodeAnim, ResponsiveAnim, SparkleAnim, GaugeAnim, SearchAnim, ChatAnim,
} from '../components/ServiceIcons';
import CodeWindow from '../components/CodeWindow';
import LivePreview from '../components/LivePreview';
import '../styles/Home.css';

const services = [
  { icon: <CodeAnim />, title: 'Custom Front-End Development', desc: 'Tailor-made websites built with React and modern tooling — fast, maintainable, and uniquely yours.' },
  { icon: <ResponsiveAnim />, title: 'Responsive Design', desc: 'Pixel-perfect on every screen, from a 5-inch phone to an ultrawide monitor.' },
  { icon: <SparkleAnim />, title: 'UI / UX Design', desc: 'Intuitive interfaces and smooth interactions that turn visitors into customers.' },
  { icon: <GaugeAnim />, title: 'Performance', desc: 'Lightning-fast load times and Core Web Vitals tuned to keep visitors engaged.' },
  { icon: <SearchAnim />, title: 'SEO Foundations', desc: 'Clean, structured markup so the right people actually find your business.' },
  { icon: <ChatAnim />, title: 'Clear Communication', desc: 'Regular updates and a hassle-free process from first call to launch day.' },
];

const stats = [
  { value: '5+', label: 'Years experience' },
  { value: '100%', label: 'Custom-built' },
  { value: '<1.5s', label: 'Load times' },
  { value: '7 days', label: 'Avg. turnaround' },
  { value: 'React', label: 'Modern stack' },
  { value: 'SEO', label: 'Built in' },
  { value: 'Mobile', label: 'First, always' },
  { value: 'AU-wide', label: 'Remote service' },
];

const steps = [
  { n: '01', title: 'Discover', desc: 'We talk through your goals, audience, and what success looks like for your business.' },
  { n: '02', title: 'Design', desc: 'I craft a clean, modern design tailored to your brand — reviewed and refined with you.' },
  { n: '03', title: 'Build', desc: 'Your site is hand-coded to be fast, responsive, and easy to maintain.' },
  { n: '04', title: 'Launch', desc: 'We go live, and I make sure everything runs perfectly — plus ongoing support.' },
];

const Home = () => {
  return (
    <div className="home">
      <SEO
        title="Calvin R Development | Professional Frontend Web Development in Armidale"
        description="Expert frontend web development services in Armidale, NSW. Creating beautiful, responsive websites with a focus on quality and communication. Remote services available Australia-wide."
        canonicalUrl="/"
        keywords="frontend web development, Armidale web developer, responsive design, quality web development, professional web services, React developer, NSW web development"
      />

      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span className="eyebrow" variants={fadeUp}>
              Frontend Web Developer · Armidale, NSW
            </motion.span>
            <motion.h1 variants={fadeUp}>
              Websites that make your business <span className="gradient-text">impossible to ignore</span>
            </motion.h1>
            <motion.p variants={fadeUp}>
              I design and build fast, modern, custom websites that help small businesses
              stand out and win more customers — no templates, no compromises.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <Link to="/contact" className="btn-primary">
                Start your project <ArrowRightIcon size={18} />
              </Link>
              <Link to="/services" className="btn-secondary">View packages</Link>
            </motion.div>
            <motion.div className="hero-trust" variants={fadeUp}>
              <CheckIcon size={16} />
              <span>Trusted by local businesses · Remote across Australia</span>
            </motion.div>
          </motion.div>

          {/* Code editor visual */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <CodeWindow />
          </motion.div>
        </div>
      </section>

      {/* ===== Stats marquee ===== */}
      <section className="stats-bar" aria-label="Key facts">
        <div className="marquee">
          <div className="marquee-track">
            {[...stats, ...stats].map((s, i) => (
              <div className="stat" key={i} aria-hidden={i >= stats.length}>
                <span className="stat-value gradient-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="section services">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">What I do</span>
            <h2>Everything your site needs, done right</h2>
            <p>One developer, end-to-end — so the design, the code, and the details all work together.</p>
          </Reveal>
          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className="service-card glass-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured work ===== */}
      <section className="section featured">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Featured work</span>
            <h2>Real results for real businesses</h2>
            <p>A recent project, live and in the wild.</p>
          </Reveal>

          <Reveal className="case-study glass-card">
            <div className="case-visual">
              <LivePreview url="https://lenbuild.com" label="lenbuild.com" />
            </div>
            <div className="case-content">
              <span className="case-label">Construction · Live site</span>
              <h3>LenBuild</h3>
              <p>
                A clean, trustworthy website for a regional custom-home builder — built to
                showcase their work and turn local searches into enquiries. Fast, mobile-first,
                and SEO-ready.
              </p>
              <ul className="case-tags">
                <li>Responsive design</li>
                <li>SEO setup</li>
                <li>Lead capture</li>
              </ul>
              <a href="https://lenbuild.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Visit live site <ExternalIcon size={17} />
              </a>
            </div>
          </Reveal>

          <Reveal className="featured-more" delay={0.1}>
            <Link to="/services" className="featured-link">
              See more examples & packages <ArrowRightIcon size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="section process">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>A simple, hassle-free process</h2>
            <p>From first conversation to launch, you always know what's happening.</p>
          </Reveal>
          <div className="process-grid">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1} className="process-step glass-card">
                <div className="process-n">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default Home;
