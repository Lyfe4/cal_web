/**
 * Single source of truth for business details. Anything that renders the
 * name, address, phone, email, ABN, prices or reply promise reads it from here,
 * so the footer, contact page and structured data can't drift apart.
 */

export const siteUrl = 'https://calvinrdevelopment.com';

export const business = {
  name: 'Calvin R Development',
  abn: '15 436 897 520',
  email: 'calvin@calvinrdevelopment.com',
  phone: {
    /** How the number is shown on the page and in structured data */
    display: '+61 447 576 460',
    /** For tel: links */
    href: 'tel:+61447576460',
  },
  address: {
    locality: 'Armidale',
    region: 'NSW',
    postcode: '2350',
    country: 'AU',
  },
  geo: { latitude: -30.5015, longitude: 151.6668 },
  github: 'https://github.com/Lyfe4',
  googleSiteVerification: '0_HsZ_XhCxjqpWf64Pnrgtokc3scY44Mt3SwUFXfwmA',
} as const;

export const person = {
  /** Full name: About page and structured data only. Conversational copy says "I'm Calvin". */
  name: 'Calvin Reinke',
  firstName: 'Calvin',
  jobTitle: 'Frontend Developer',
} as const;

/** "Armidale NSW 2350", the Australia Post format, used wherever the full address is shown. */
export const formattedAddress = `${business.address.locality} ${business.address.region} ${business.address.postcode}`;

/** "Armidale, NSW", the short form for running copy. */
export const shortLocation = `${business.address.locality}, ${business.address.region}`;

export const replyPromise = 'within one business day';

export const serviceAreas = {
  inPerson: 'Armidale & New England',
  remote: 'Australia-wide',
  /** For structured data: towns served in person, then the wider remote area */
  schema: [
    { type: 'City', name: 'Armidale' },
    { type: 'City', name: 'Guyra' },
    { type: 'City', name: 'Uralla' },
    { type: 'City', name: 'Tamworth' },
    { type: 'AdministrativeArea', name: 'New England, NSW' },
    { type: 'Country', name: 'Australia' },
  ],
} as const;

/** Prices in whole AUD. */
export const pricing = {
  starter: { label: 'Starter website', from: 600 },
  professional: { label: 'Professional website', from: 1125 },
  apps: { label: 'Apps & integrations', note: 'Quoted per project' },
  extraPage: { label: 'Extra pages', each: 150 },
  support: { label: 'Support', monthly: 80, yearly: 800 },
} as const;

/**
 * Keys accepted by /contact?package=<key>. Links from the old site and the
 * Services page use these, so keep the keys stable.
 */
export const enquiryPackages = {
  starter: 'Starter website',
  professional: 'Professional website',
  custom: 'Apps, integrations or contract work',
} as const;

export type EnquiryPackage = keyof typeof enquiryPackages;

/** 1125 -> "$1,125" */
export const formatPrice = (amount: number): string =>
  amount.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  });

export const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;
