import React, { useEffect, useRef } from 'react';

/**
 * A browser-framed, live (non-interactive) preview of an external site.
 * Renders the real page in an iframe at a desktop virtual width and scales
 * it to fit the frame, so the preview is always accurate. Clicking opens
 * the site in a new tab.
 */
const VIRTUAL_WIDTH = 1280;

const LivePreview = ({ url, label }) => {
  const frameRef = useRef(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return undefined;
    const update = () => {
      el.style.setProperty('--scale', (el.clientWidth / VIRTUAL_WIDTH).toString());
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="mockup browser-live">
      <div className="mockup-bar">
        <span></span>
        <span></span>
        <span></span>
        <div className="mockup-url">{label}</div>
      </div>
      <div className="live-frame" ref={frameRef}>
        <iframe
          src={url}
          title={`${label} live preview`}
          loading="lazy"
          tabIndex={-1}
          scrolling="no"
        />
        <a
          className="live-frame-overlay"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${label} in a new tab`}
        ></a>
      </div>
    </div>
  );
};

export default LivePreview;
