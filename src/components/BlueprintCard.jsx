import React from 'react';

/**
 * The hero's signature object: a website drawn as an architectural blueprint.
 * Bridges the two trades this business sits between — building for the web,
 * for people who build in the real world. Pine hairlines + clay dimension
 * lines draw themselves in on load (one-shot; reduced-motion shows it complete).
 */
const BlueprintCard = () => (
  <figure className="blueprint-card">
    <svg
      className="blueprint"
      viewBox="0 0 356 312"
      role="img"
      aria-label="A website drawn as a technical blueprint"
    >
      {/* --- Page frame --- */}
      <g className="g-page">
        <rect className="bp-line bp-frame bp-stroke" pathLength="1"
          x="16" y="24" width="284" height="276" rx="4" />
      </g>

      {/* --- Header --- */}
      <g className="g-header">
        <rect className="bp-line bp-stroke" pathLength="1"
          x="28" y="36" width="260" height="28" rx="3" />
        <rect className="bp-fill bp-soft" x="36" y="43" width="14" height="14" rx="2" />
        <line className="bp-line bp-stroke" pathLength="1" x1="176" y1="50" x2="190" y2="50" />
        <line className="bp-line bp-stroke" pathLength="1" x1="196" y1="50" x2="210" y2="50" />
        <line className="bp-line bp-stroke" pathLength="1" x1="216" y1="50" x2="230" y2="50" />
        <rect className="bp-accent bp-stroke" pathLength="1"
          x="246" y="43" width="34" height="14" rx="7" />
      </g>

      {/* --- Hero --- */}
      <g className="g-hero">
        <rect className="bp-line bp-stroke" pathLength="1"
          x="28" y="72" width="260" height="84" rx="3" />
        <rect className="bp-fill bp-soft" x="40" y="88" width="136" height="8" rx="2" />
        <rect className="bp-fill bp-soft" x="40" y="102" width="100" height="8" rx="2" />
        <rect className="bp-accent bp-stroke" pathLength="1"
          x="40" y="122" width="62" height="18" rx="3" />
        {/* image placeholder */}
        <rect className="bp-line bp-stroke" pathLength="1"
          x="196" y="84" width="80" height="58" rx="2" />
        <circle className="bp-line bp-stroke" pathLength="1" cx="210" cy="100" r="5" />
        <polyline className="bp-line bp-stroke" pathLength="1"
          points="202,136 220,114 234,126 250,104 270,136" />
      </g>

      {/* --- Cards --- */}
      <g className="g-cards">
        {[28, 117, 206].map((x) => (
          <g key={x}>
            <rect className="bp-line bp-stroke" pathLength="1"
              x={x} y="164" width="82" height="120" rx="3" />
            <rect className="bp-fill bp-soft" x={x + 12} y="178" width="16" height="16" rx="3" />
            <rect className="bp-fill bp-soft" x={x + 12} y="206" width="54" height="6" rx="2" />
            <rect className="bp-fill bp-soft" x={x + 12} y="218" width="40" height="6" rx="2" />
          </g>
        ))}
      </g>

      {/* --- Dimension lines --- */}
      <g className="g-dims">
        {/* top: responsive width */}
        <line className="bp-dim bp-stroke" pathLength="1" x1="16" y1="14" x2="300" y2="14" />
        <line className="bp-dim bp-stroke" pathLength="1" x1="16" y1="10" x2="16" y2="18" />
        <line className="bp-dim bp-stroke" pathLength="1" x1="300" y1="10" x2="300" y2="18" />
        <text className="bp-dim-label bp-soft" x="158" y="9" textAnchor="middle">responsive</text>

        {/* right: 1200px height */}
        <line className="bp-dim bp-stroke" pathLength="1" x1="316" y1="24" x2="316" y2="300" />
        <line className="bp-dim bp-stroke" pathLength="1" x1="312" y1="24" x2="320" y2="24" />
        <line className="bp-dim bp-stroke" pathLength="1" x1="312" y1="300" x2="320" y2="300" />
        <text className="bp-dim-label bp-soft" x="332" y="162" textAnchor="middle"
          transform="rotate(-90 332 162)">1200 px</text>
      </g>
    </svg>

    <figcaption className="blueprint-titleblock">
      <span className="tb-fig">Fig. 01</span>
      <span className="tb-name">A website, to spec</span>
      <span className="tb-scale">1 : 1</span>
    </figcaption>
  </figure>
);

export default BlueprintCard;
