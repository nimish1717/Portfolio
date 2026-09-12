import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Generic scroll-triggered fade + translate wrapper.
 * Usage: <FadeIn y={40} delay={0.1}> ... </FadeIn>
 */
export default function FadeIn({
  children,
  y = 30,
  x = 0,
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
  threshold = 0.15,
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
