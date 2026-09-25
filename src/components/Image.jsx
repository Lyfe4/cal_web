import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Holds the frame at its final size and only reveals the image once the browser
 * has actually decoded it, so a cold load shows the placeholder and then the
 * finished photo, never a half-painted one streaming in top-down.
 *
 * `priority` is for images that are visible on arrival: it opts out of lazy
 * loading (which delays the fetch until layout) and asks for a high-priority
 * fetch instead.
 */
const Image = ({ src, alt = 'Image', height, className = '', priority = false }) => {
  const imgRef = useRef(null);
  const [ready, setReady] = useState(false);

  // A cached image can already be complete before React attaches onLoad, in
  // which case the event never fires and the photo would stay hidden.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) setReady(true);
  }, [src]);

  return (
    <div
      className={`image-container ${className || ''}`}
      style={{
        height: `${height}px`,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: 'var(--paper-2)', // placeholder while decoding
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={() => setReady(true)}
        onError={() => setReady(true)} // never leave the frame permanently blank
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          display: 'block',
          borderRadius: '8px',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string, // Descriptive alt text should be provided for SEO and accessibility
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  priority: PropTypes.bool,
};

export default Image;
