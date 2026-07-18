import React from 'react';

/**
 * Animated service icons for the Home services cards.
 * Each SVG has a wrapper class (i-code, i-gauge, …) and class-tagged inner
 * parts. The motion is driven entirely by CSS in Home.css, triggered on
 * `.service-card:hover` — so the icon "does something" when its card is hovered.
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

// Custom Front-End Development — brackets open up, slash blinks like a cursor
export const CodeAnim = () => (
  <svg {...base} className="i-code">
    <polyline className="br-left" points="9 8 5 12 9 16" />
    <polyline className="br-right" points="15 8 19 12 15 16" />
    <line className="slash" x1="13.2" y1="7" x2="10.8" y2="17" />
  </svg>
);

// Responsive Design — the monitor reflows into a phone and back (adapts to any screen)
export const ResponsiveAnim = () => (
  <svg {...base} className="i-responsive">
    <rect className="screen" x="3" y="5" width="18" height="11" rx="2" />
    <g className="stand">
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </g>
    <circle className="home-btn" cx="12" cy="18" r="0.85" fill="currentColor" stroke="none" />
  </svg>
);

// UI / UX Design — sparkles twinkle
export const SparkleAnim = () => (
  <svg {...base} className="i-sparkle">
    <path className="star1" d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    <path className="star2" d="M18.5 15l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
  </svg>
);

// Performance — the needle sweeps up and back down
export const GaugeAnim = () => (
  <svg {...base} className="i-gauge">
    <path className="dial" d="M5 17 A 8 8 0 1 1 19 17" />
    <line className="needle" x1="12" y1="17" x2="12" y2="10.5" />
    <circle cx="12" cy="17" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

// SEO Foundations — the magnifier scans around
export const SearchAnim = () => (
  <svg {...base} className="i-search">
    <g className="glass">
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="15.5" y2="15.5" />
    </g>
  </svg>
);

// Clear Communication — typing dots bounce in the bubble
export const ChatAnim = () => (
  <svg {...base} className="i-chat">
    <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.5-4.2A8.4 8.4 0 0 1 12 3a8.38 8.38 0 0 1 9 8.5z" />
    <circle className="dot d1" cx="8.5" cy="11.4" r="1.05" fill="currentColor" stroke="none" />
    <circle className="dot d2" cx="12" cy="11.4" r="1.05" fill="currentColor" stroke="none" />
    <circle className="dot d3" cx="15.5" cy="11.4" r="1.05" fill="currentColor" stroke="none" />
  </svg>
);
