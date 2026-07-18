import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Head manager for titles, meta, canonical, and JSON-LD structured data.
 *
 * Implemented with a direct useEffect rather than react-helmet-async, which
 * was silently injecting nothing under React 18 StrictMode — leaving every
 * page with the static index.html title and no structured data. This version
 * upserts singleton tags and (re)injects the page's JSON-LD on each render,
 * cleaning up the JSON-LD on unmount/navigation.
 */

const siteUrl = 'https://calvinrdevelopment.com';

const defaultTitle = 'Armidale Web Developer & Website Designer | Calvin R Development';
const defaultDescription =
  'Armidale web developer and website designer building fast, custom, hand-coded websites for small businesses across the New England region and NSW.';
const defaultKeywords =
  'Armidale web developer, Armidale website designer, web design Armidale, website designer New England NSW, small business websites, React developer NSW';
const defaultOgImage = `${siteUrl}/og-image.png`;

function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setNamedMeta(name, content) {
  const el = upsert(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('name', name);
    return m;
  });
  el.setAttribute('content', content);
}

function setPropMeta(property, content) {
  const el = upsert(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('property', property);
    return m;
  });
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  const el = upsert(`link[rel="${rel}"]`, () => {
    const l = document.createElement('link');
    l.setAttribute('rel', rel);
    return l;
  });
  el.setAttribute('href', href);
}

const SEO = ({
  title,
  description,
  canonicalUrl,
  keywords,
  ogImage,
  ogType,
  structuredData,
}) => {
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaOgImage = ogImage || defaultOgImage;
  const metaOgType = ogType || 'website';
  const metaCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  // Sitewide business entity (crawlable on every page). Page-specific schema
  // (Service, FAQPage, Person, ContactPage) is passed in via structuredData.
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#business`,
    name: 'Calvin R Development',
    alternateName: 'Calvin R Development — Armidale Web Developer',
    description: defaultDescription,
    slogan: 'Modern, hand-built websites for small businesses.',
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    image: defaultOgImage,
    founder: {
      '@type': 'Person',
      name: 'Calvin Reinke',
      jobTitle: 'Frontend Web Developer',
    },
    knowsAbout: [
      'Web development',
      'Website design',
      'Responsive design',
      'React',
      'Search engine optimisation',
      'Small business websites',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Armidale',
      addressRegion: 'NSW',
      postalCode: '2350',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-30.5015',
      longitude: '151.6668',
    },
    areaServed: [
      { '@type': 'City', name: 'Armidale' },
      { '@type': 'City', name: 'Guyra' },
      { '@type': 'City', name: 'Uralla' },
      { '@type': 'City', name: 'Tamworth' },
      { '@type': 'AdministrativeArea', name: 'New England, NSW' },
      { '@type': 'State', name: 'New South Wales' },
      { '@type': 'Country', name: 'Australia' },
    ],
    priceRange: '$$',
    telephone: '+61-447-576-460',
    email: 'calvin@calvinrdevelopment.com',
    sameAs: [
      'https://www.linkedin.com/in/calvin-reinke-24792132b/',
      'https://github.com/Lyfe4',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };

  const items = [].concat(structuredData || defaultStructuredData).filter(Boolean);
  const itemsKey = JSON.stringify(items);

  useEffect(() => {
    document.title = metaTitle;
    setNamedMeta('description', metaDescription);
    setNamedMeta('keywords', metaKeywords);
    setLink('canonical', metaCanonicalUrl);

    setPropMeta('og:type', metaOgType);
    setPropMeta('og:url', metaCanonicalUrl);
    setPropMeta('og:title', metaTitle);
    setPropMeta('og:description', metaDescription);
    setPropMeta('og:image', metaOgImage);

    setNamedMeta('twitter:card', 'summary_large_image');
    setNamedMeta('twitter:url', metaCanonicalUrl);
    setNamedMeta('twitter:title', metaTitle);
    setNamedMeta('twitter:description', metaDescription);

    const injected = items.map((item) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo-ld', 'true');
      s.textContent = JSON.stringify(item);
      document.head.appendChild(s);
      return s;
    });

    return () => injected.forEach((s) => s.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaTitle, metaDescription, metaKeywords, metaCanonicalUrl, metaOgType, metaOgImage, itemsKey]);

  return null;
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  structuredData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SEO;
