import React from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll-reveal wrapper built on Framer Motion.
 * Animates children into view once, with optional stagger via `delay`.
 *
 * <Reveal>            -> fade + rise
 * <Reveal y={0}>      -> fade only
 * <Reveal delay={0.1}>-> stagger within a group
 */
const Reveal = ({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.7,
  once = true,
  as = 'div',
  ...rest
}) => {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -80px 0px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
