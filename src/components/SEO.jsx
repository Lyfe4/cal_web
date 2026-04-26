import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  keywords, 
  ogImage, 
  ogType, 
  structuredData 
}) => {
  // Base URL for the website
  const siteUrl = 'https://calvinrdevelopment.com';
  
  // Default values
  const defaultTitle = 'Calvin R Development | Professional Web Development Services';
  const defaultDescription = 'Expert frontend web development solutions tailored to your business needs. Custom websites, web applications, and responsive design by Calvin R Development based in Armidale, Australia.';
  const defaultKeywords = 'web development, frontend development, React, responsive design, Armidale web developer, quality web development, professional web services';
  const defaultOgImage = `${siteUrl}/og-image.png`;
  const defaultOgType = 'website';
  
  // Values to use (provided or default)
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaOgImage = ogImage || defaultOgImage;
  const metaOgType = ogType || defaultOgType;
  const metaCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  // Default structured data for local business
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Calvin R Development",
    "description": defaultDescription,
    "url": siteUrl,
    "logo": `${siteUrl}/logo192.png`,
    "image": defaultOgImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Armidale",
      "addressRegion": "NSW",
      "addressCountry": "Australia"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-30.5015",
      "longitude": "151.6668"
    },
    "priceRange": "$$",
    "telephone": "+61-XXX-XXX-XXX", // Replace with actual phone number
    "email": "contact@calvinrdevelopment.com", // Replace with actual email
    "sameAs": [
      "https://www.linkedin.com/in/calvinrdevelopment", // Replace with actual social profiles
      "https://github.com/calvinrdevelopment"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  };
  
  // Use provided structured data or default
  const metaStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metaOgType} />
      <meta property="og:url" content={metaCanonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaCanonicalUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />
      
      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(metaStructuredData)}
      </script>
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  structuredData: PropTypes.object
};

export default SEO;
