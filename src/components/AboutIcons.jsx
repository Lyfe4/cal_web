import React from 'react';

/**
 * Animated icons for the About page (skills + values).
 * Same approach as ServiceIcons: class-tagged inner parts, motion driven by
 * CSS in About.css on `.skill-card:hover` / `.value-card:hover`. Each plays
 * once and settles back to rest.
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

// Backend & Languages — server activity LEDs blink
export const ServerAnim = () => (
  <svg {...base} className="i-server">
    <rect x="3" y="4" width="18" height="6" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
    <line className="led led1" x1="7" y1="7" x2="7.01" y2="7" />
    <line className="led led2" x1="7" y1="17" x2="7.01" y2="17" />
  </svg>
);

// Tools & Deployment — rocket crouches, thrusts up along its axis, settles (a launch)
export const RocketAnim = () => (
  <svg {...base} className="i-rocket">
    <g className="rocket">
      <path className="flame" d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.7a1.9 1.9 0 0 0-3 0z" />
      <path d="M12 15l-3-3a22 22 0 0 1 8-10 22 22 0 0 1 2 10 22 22 0 0 1-10 8z" />
      <circle cx="15" cy="9" r="1.5" />
    </g>
  </svg>
);

// Quality First — shield check draws in
export const ShieldAnim = () => (
  <svg {...base} className="i-shield">
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5z" />
    <polyline className="check" points="9 12 11 14 15 10" />
  </svg>
);

// User-Centered Design — the central user draws in cleanly while the
// supporting figure fades in behind (calm, considered, user at the centre)
export const UsersAnim = () => (
  <svg {...base} className="i-users">
    <g className="user-back">
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </g>
    <g className="user-front">
      <path className="uf-body" pathLength="1" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle className="uf-head" pathLength="1" cx="9" cy="7" r="4" />
    </g>
  </svg>
);
