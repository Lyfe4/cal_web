import React, { useRef } from 'react';

/**
 * Interactive 3D tilt that follows the cursor.
 * The element rotates toward the mouse position (like tilt.js) and, with
 * `glare`, a soft highlight tracks the pointer. Transforms are written
 * imperatively via refs (no re-render per move) and reset smoothly on leave.
 *
 * <Tilt className="about-image-frame" max={14} scale={1.03} glare>…</Tilt>
 */
const Tilt = ({
  children,
  className = '',
  max = 10,
  scale = 1.02,
  glare = false,
  perspective = 900,
  ...rest
}) => {
  const ref = useRef(null);
  const glareRef = useRef(null);

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    const rotX = (0.5 - py) * 2 * max;
    const rotY = (px - 0.5) * 2 * max;
    el.style.transform = `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale})`;
    if (glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
      {glare && <span ref={glareRef} className="tilt-glare" aria-hidden="true" />}
    </div>
  );
};

export default Tilt;
