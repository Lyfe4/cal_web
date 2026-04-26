import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import SEO from '../components/SEO';
import '../styles/Services.css';

const Services = () => {
  // SEO structured data for services
  const servicesStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Calvin R Development",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Armidale",
        "addressRegion": "NSW",
        "addressCountry": "Australia"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "description": "Professional frontend web development services including responsive website design, custom web applications, and UI/UX optimization with a focus on quality and communication.",
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Package",
        "price": "600",
        "priceCurrency": "AUD",
        "description": "Perfect for small businesses looking to establish their online presence"
      },
      {
        "@type": "Offer",
        "name": "Deluxe Package",
        "price": "1125",
        "priceCurrency": "AUD",
        "description": "Comprehensive solution for businesses needing additional functionality and wanting to stand out with an enhanced web presence"
      }
    ]
  };
  const packages = [
    {
      name: 'Basic Package',
      originalPrice: '$800',
      discountedPrice: '$600',
      description: 'Perfect for small businesses looking to establish their online presence',
      features: [
        'Responsive Website Design',
        'Up to 4 Pages',
        'Basic Contact Form Integration',
        'Basic SEO Integration',
        'Mobile-Friendly Design',
        'Social Media Integration',
        '2 Rounds of Revisions',
        '1 Month of Support'
      ],
      discount: {
        active: true,
        text: 'Limited Time: 25% off (First 3 Clients Only!)'
      }
    },
    {
      name: 'Deluxe Package',
      originalPrice: '$1,500',
      discountedPrice: '$1,125',
      description: 'Comprehensive solution for businesses needing additional functionality and wanting to stand out with an enhanced web presence',
      features: [
        'Everything in Basic Package',
        'Up to 9 Pages',
        'Premium Analytics Setup',
        'Custom Animations',
        'Enhanced UI/UX',
        'Custom Contact Solutions',
        'Advanced Design Features',
        'Testimonials Section',
        '3 Months of Support',
        '3 Rounds of Revisions',
        'Priority Support'
      ],
      discount: {
        active: true,
        text: 'Limited Time: 25% off (First 3 Clients Only!)'
      }
    }
  ];

  const additionalServices = [
    {
      category: 'Additional Pages & Features',
      items: [
        {
          name: 'Single Page Addition',
          price: '$150/page',
          description: 'Add extra pages to your website beyond package limits'
        },
        {
          name: 'Custom features',
          price: 'Price varies based on requirements',
          description: 'Custom functionality and sections tailored to your specific needs - contact us to discuss your requirements'
        }
      ]
    },
    {
      category: 'Maintenance & Support',
      items: [
        {
          name: 'Monthly Support Extension',
          price: '$80/month',
          description: 'Extends basic support with content updates and minor changes'
        },
        {
          name: 'Annual Support Package',
          price: '$800/year',
          description: 'Save 15% with annual billing for basic support'
        }
      ]
    },
  ];

  const portfolioItems = [
    {
      title: 'Basic Package Example',
      description: 'A showcase of what you can expect with our Basic Package.',
      type: 'Basic',
      videoId: 'uFF3c-KZ25k'
    },
    {
      title: 'Deluxe Package Example',
      description: 'See the additional and more advanced features available in our Deluxe Package.',
      type: 'Deluxe',
      videoId: 'FK2OuAzDBg8'
    }
  ];
  
  return (
    <div className="services-page">
      <SEO 
        title="Web Development Services | Calvin R Development Armidale"
        description="Professional frontend web development services in Armidale. Responsive websites, custom web applications, and UI/UX optimization with packages starting from $600."
        canonicalUrl="/services"
        keywords="web development services, Armidale web developer, frontend development packages, responsive website design, custom web applications, UI/UX optimization"
        structuredData={servicesStructuredData}
      />
      <section className="services-hero">
        <div className="container">
          <h1>Web Development Services</h1>
          <p>Custom websites tailored to your needs and business goals</p>
        </div>
      </section>

      <ScrollAnimation animation="fade-in">
        <section className="packages-section">
          <div className="container">
            <h2>Choose Your Package</h2>
            <div className="packages-grid">
              {packages.map((pkg, index) => (
                <ScrollAnimation key={index} animation="fade-up" className="package-card">
                  <div className="package-header">
                    <h3 className="package-name">{pkg.name}</h3>
                    {pkg.discount.active && (
                      <div className="discount-badge">
                        {pkg.discount.text}
                      </div>
                    )}
                    <div className="package-pricing">
                      <span className="original-price">{pkg.originalPrice}</span>
                      <span className="discounted-price">{pkg.discountedPrice}</span>
                    </div>
                    <p className="package-description">{pkg.description}</p>
                  </div>
                  <ul className="features-list">
                    {pkg.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <Link 
                    to={`/contact?package=${pkg.name.toLowerCase().replace(' ', '-')}`} 
                    className="package-button">
                    Get Started
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation animation="fade-in">
        <section className="additional-services-section">
          <div className="container">
            <h2>Additional Services</h2>
            <div className="additional-services-grid">
              {additionalServices.map((category, index) => (
                <div key={index} className="service-category">
                  <h3>{category.category}</h3>
                  <div className="service-items">
                    {category.items.map((item, i) => (
                      <ScrollAnimation key={i} animation="fade-up" className="service-item-card">
                        <h4>{item.name}</h4>
                        <div className="service-price">{item.price}</div>
                        <p>{item.description}</p>
                      </ScrollAnimation>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Portfolio Section */}
      <ScrollAnimation animation="fade-in">
        <section className="portfolio-section">
          <div className="container">
            <h2>Example Projects</h2>
            <div className="portfolio-grid">
              {portfolioItems.map((item, index) => (
              <ScrollAnimation key={index} animation="fade-up" className="portfolio-item">
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
                  <p>Package Type: {item.type}</p>
                  </div>
            </ScrollAnimation>
            ))}
          </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
};

export default Services;
