import { business, person, serviceAreas, siteUrl } from './site.ts';

/** A schema.org node. Page schema can reference the sitewide ones by @id. */
export type SchemaNode = Record<string, unknown> & { '@type': string | string[] };

export const businessId = `${siteUrl}/#business`;
export const personId = `${siteUrl}/#person`;

/** The sitewide ProfessionalService, on every page. No opening hours: replies are promised, not hours. */
export const businessSchema: SchemaNode = {
  '@type': 'ProfessionalService',
  '@id': businessId,
  name: business.name,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/icon-512.png`,
  image: `${siteUrl}/og-image.png`,
  email: business.email,
  telephone: business.phone.display,
  taxID: `ABN ${business.abn}`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postcode,
    addressCountry: business.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  areaServed: serviceAreas.schema.map(({ type, name }) => ({ '@type': type, name })),
  founder: { '@id': personId },
  sameAs: [business.github],
};

export const personSchema: SchemaNode = {
  '@type': 'Person',
  '@id': personId,
  name: person.name,
  jobTitle: person.jobTitle,
  alumniOf: { '@type': 'CollegeOrUniversity', name: person.alumniOf },
  sameAs: [business.github],
};

/**
 * One JSON-LD document per page: the sitewide nodes plus whatever the page adds.
 * A page node with the same @id as a sitewide one is merged into it (page wins
 * on conflicting keys) rather than replacing it or appearing twice.
 */
export const buildJsonLd = (pageSchema: SchemaNode | SchemaNode[] = []): string => {
  const graph = new Map<string, SchemaNode>();
  const anonymous: SchemaNode[] = [];

  for (const node of [businessSchema, personSchema, ...[pageSchema].flat()]) {
    const id = node['@id'];
    if (typeof id !== 'string') {
      anonymous.push(node);
      continue;
    }
    graph.set(id, { ...graph.get(id), ...node });
  }

  const doc = { '@context': 'https://schema.org', '@graph': [...graph.values(), ...anonymous] };
  // Escape "<" so no string value can close the surrounding <script> element.
  return JSON.stringify(doc).replace(/</g, '\\u003c');
};
