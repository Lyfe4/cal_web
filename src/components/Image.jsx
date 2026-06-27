import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt = 'Image', height, className = '' }) => {
  return (
    <div 
      className={`image-container ${className || ''}`}
      style={{
        height: `${height}px`,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: 'var(--light-gray)' // Placeholder while loading
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy" // Improve performance with lazy loading
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%', // Adjust this value to control vertical positioning
          display: 'block',
          borderRadius: '8px'
        }}
      />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string, // Descriptive alt text should be provided for SEO and accessibility
  height: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default Image;
