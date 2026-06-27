import React from 'react';

/**
 * Lightweight inline SVG icon set (stroke-based, 24x24).
 * Uses currentColor so icons inherit text color / gradients.
 */

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Svg = ({ children, size, ...rest }) => (
  <svg {...base} width={size || base.width} height={size || base.height} {...rest}>
    {children}
  </svg>
);

export const CodeIcon = (p) => (
  <Svg {...p}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></Svg>
);

export const ResponsiveIcon = (p) => (
  <Svg {...p}><rect x="2" y="3" width="14" height="11" rx="2" /><path d="M16 18h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2" /><line x1="8" y1="18" x2="8" y2="21" /><line x1="5" y1="21" x2="11" y2="21" /></Svg>
);

export const SparkleIcon = (p) => (
  <Svg {...p}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></Svg>
);

export const GaugeIcon = (p) => (
  <Svg {...p}><path d="M12 14l4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /><circle cx="12" cy="14" r="1.5" /></Svg>
);

export const SearchIcon = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Svg>
);

export const PaletteIcon = (p) => (
  <Svg {...p}><circle cx="13.5" cy="6.5" r="1.2" /><circle cx="17.5" cy="10.5" r="1.2" /><circle cx="8.5" cy="7.5" r="1.2" /><circle cx="6.5" cy="12.5" r="1.2" /><path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H16a6 6 0 0 0 6-6c0-4.4-4.5-8-10-8z" /></Svg>
);

export const ServerIcon = (p) => (
  <Svg {...p}><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><line x1="7" y1="7" x2="7.01" y2="7" /><line x1="7" y1="17" x2="7.01" y2="17" /></Svg>
);

export const RocketIcon = (p) => (
  <Svg {...p}><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.7a1.9 1.9 0 0 0-3 0z" /><path d="M12 15l-3-3a22 22 0 0 1 8-10 22 22 0 0 1 2 10 22 22 0 0 1-10 8z" /><circle cx="15" cy="9" r="1.5" /></Svg>
);

export const ChatIcon = (p) => (
  <Svg {...p}><path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.5-4.2A8.4 8.4 0 0 1 12 3a8.38 8.38 0 0 1 9 8.5z" /></Svg>
);

export const UsersIcon = (p) => (
  <Svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Svg>
);

export const CheckIcon = (p) => (
  <Svg {...p}><polyline points="20 6 9 17 4 12" /></Svg>
);

export const ArrowRightIcon = (p) => (
  <Svg {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Svg>
);

export const ExternalIcon = (p) => (
  <Svg {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></Svg>
);

export const MapPinIcon = (p) => (
  <Svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Svg>
);

export const MailIcon = (p) => (
  <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Svg>
);

export const PhoneIcon = (p) => (
  <Svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></Svg>
);

export const ClockIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></Svg>
);

export const ShieldIcon = (p) => (
  <Svg {...p}><path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5z" /><polyline points="9 12 11 14 15 10" /></Svg>
);

export const LinkedInIcon = (p) => (
  <Svg {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Svg>
);

export const GitHubIcon = (p) => (
  <Svg {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 20 4.8 4.9 4.9 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A4.9 4.9 0 0 0 5 4.8 5.2 5.2 0 0 0 3.7 8.4c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22" /></Svg>
);
