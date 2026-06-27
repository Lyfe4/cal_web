import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { CheckIcon, ArrowRightIcon, ExternalIcon } from '../components/Icons';
import '../styles/Services.css';

const packages = [
  {
    key: 'starter',
    name: 'Starter',
    price: '$600',
    tagline: 'A single-page site to get you online',
    bestFor: 'New businesses & sole traders',
    description: 'A polished one-page website that gives you a credible, professional presence — fast.',
    features: [
      'One-page website',
      'Mobile-first responsive design',
      'Contact form',
      'Foundational SEO',
      'Social media links',
      '1 round of revisions',
      '2 weeks of support',
    ],
    featured: false,
  },
  {
    key: 'professional',
    name: 'Professional',
    price: '$1,125',
    tagline: 'A complete site to grow your business',
    bestFor: 'Established businesses',
    description: 'A full multi-page website with the design polish to help you stand out and win more customers.',
    features: [
      'Everything in Starter, plus:',
      'Up to 7 pages',
      'Custom design & animations',
      'Enhanced UI/UX',
      'Google Business Profile setup',
      'Testimonials section',
      '3 rounds of revisions',
      '3 months of priority support',
    ],
    featured: true,
  },
  {
    key: 'custom',
    name: 'Custom',
    price: "Let's talk",
    isQuote: true,
    tagline: 'For bigger or bespoke projects',
    bestFor: 'Advanced or large projects',
    description: 'Need bookings, e-commerce, or custom integrations? Tell me your vision and I\'ll scope a tailored solution.',
    features: [
      'Unlimited pages',
      'Bespoke features & functionality',
      'Booking & enquiry systems',
      'E-commerce & integrations',
      'Ongoing partnership',
      'Fully quoted to your needs',
    ],
    featured: false,
  },
];

const extras = [
  { name: 'Additional page', price: '$150 / page' },
  { name: 'Custom feature', price: 'Quoted' },
  { name: 'Monthly support', price: '$80 / mo' },
  { name: 'Annual support', price: '$800 / yr (save 15%)' },
];

const portfolio = [
  {
    title: 'Mock Example Build',
    description: 'A demonstration site showcasing the clean, modern design, smooth interactions, and quality you can expect.',
    videoId: 'FK2OuAzDBg8',
  },
];

const faqs = [
  { q: 'How long does a project take?', a: 'Most Starter sites are ready in about a week, and Professional builds typically take 2–3 weeks depending on content and revisions. I\'ll give you a clear timeline upfront.' },
  { q: 'What do you need from me to get started?', a: 'Just an idea of your goals, any branding or content you have, and examples of sites you like. If you don\'t have everything ready, I\'ll guide you through it.' },
  { q: 'Do you handle hosting and domains?', a: 'Yes — I can set up hosting and connect your domain so your site goes live without any technical headaches on your end.' },
  { q: 'What happens after launch?', a: 'Every package includes a support period for tweaks and fixes. After that, you can extend support monthly or annually, or reach out any time for updates.' },
  { q: 'How does payment work?', a: 'Typically a deposit to begin and the balance on completion before launch. We\'ll agree on everything in writing before any work starts.' },
];

const Services = () => {
  const servicesStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Calvin R Development',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Armidale',
        addressRegion: 'NSW',
        addressCountry: 'Australia',
      },
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    description:
      'Professional frontend web development services including responsive website design, custom web applications, and UI/UX optimization with a focus on quality and communication.',
    offers: [
      { '@type': 'Offer', name: 'Starter Package', price: '600', priceCurrency: 'AUD', description: 'A polished single-page website for new businesses and sole traders' },
      { '@type': 'Offer', name: 'Professional Package', price: '1125', priceCurrency: 'AUD', description: 'A complete multi-page website for established businesses that want to stand out' },
    ],
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="services-page">
      <SEO
        title="Web Development Services & Pricing | Calvin R Development Armidale"
        description="Professional frontend web development in Armidale. Custom, responsive websites with clear packages from $600. Starter, Professional, and fully custom builds."
        canonicalUrl="/services"
        keywords="web development services, Armidale web developer, frontend development packages, responsive website design, web design pricing, UI/UX optimization"
        structuredData={[servicesStructuredData, faqStructuredData]}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <Reveal as="span" className="eyebrow">Services &amp; Pricing</Reveal>
          <Reveal as="h1" delay={0.05}>Simple packages, <span className="gradient-text">serious results</span></Reveal>
          <Reveal as="p" delay={0.1}>
            Transparent pricing and a clear scope — so you know exactly what you're getting.
            Every site is hand-built, responsive, and made to grow your business.
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing">
        <div className="container">
          <div className="packages-grid">
            {packages.map((pkg, i) => (
              <Reveal
                key={pkg.key}
                delay={i * 0.08}
                className={`package-card glass-card ${pkg.featured ? 'featured' : ''}`}
              >
                {pkg.featured && <div className="popular-badge">Most popular</div>}
                <div className="package-header">
                  <h3 className="package-name">{pkg.name}</h3>
                  <p className="package-tagline">{pkg.tagline}</p>
                  <div className="package-pricing">
                    {!pkg.isQuote && <span className="price-from">from</span>}
                    <span className="price">{pkg.price}</span>
                  </div>
                  <p className="package-description">{pkg.description}</p>
                  <p className="package-bestfor"><span>Best for</span> {pkg.bestFor}</p>
                </div>
                <ul className="features-list">
                  {pkg.features.map((f, idx) => (
                    <li key={idx}><CheckIcon size={18} /> {f}</li>
                  ))}
                </ul>
                <Link
                  to={`/contact?package=${pkg.key}`}
                  className={pkg.featured ? 'package-button' : 'btn-secondary btn-full-width'}
                >
                  {pkg.isQuote ? 'Request a quote' : 'Get started'}
                  <ArrowRightIcon size={17} />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Extras */}
          <Reveal className="extras">
            <h4>Optional extras</h4>
            <div className="extras-grid">
              {extras.map((e) => (
                <div key={e.name} className="extra-item">
                  <span className="extra-name">{e.name}</span>
                  <span className="extra-price">{e.price}</span>
                </div>
              ))}
            </div>
            <p className="extras-note">Need something not listed here? Just ask — I'm happy to quote custom work.</p>
          </Reveal>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section portfolio">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Recent work</span>
            <h2>See it in action</h2>
            <p>A live client site, plus an early mock build that shows the design and quality you can expect.</p>
          </Reveal>

          <Reveal className="live-project glass-card">
            <div className="live-project-content">
              <span className="case-label">Live client site</span>
              <h3>LenBuild — Custom Home Builder</h3>
              <p>A fast, mobile-first website for a regional builder in Guyra, NSW, designed to showcase their work and convert local searches into enquiries.</p>
            </div>
            <a href="https://lenbuild.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Visit live site <ExternalIcon size={17} />
            </a>
          </Reveal>

          <div className="portfolio-grid">
            {portfolio.map((item, i) => (
              <Reveal key={item.videoId} delay={i * 0.1} className="portfolio-item glass-card">
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.videoId}`}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="portfolio-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <div className="container faq-container">
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Questions, answered</h2>
          </Reveal>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.05} as="details" className="faq-item glass-card">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="faq-cta">
            <p>Still have a question?</p>
            <Link to="/contact" className="btn-primary">Get in touch <ArrowRightIcon size={18} /></Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Services;
