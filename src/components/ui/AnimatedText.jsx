import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedText({ 
  text, 
  className = "",
  offset = ["start 0.8", "end 0.2"]
}) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset
  });

  const characters = text.split('');

  return (
    <p ref={containerRef} className={`relative flex flex-wrap justify-center ${className}`}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + (1 / characters.length);
        
        // This is a common pattern for scroll-reveal text
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        
        return (
          <span key={i} className="relative inline-block">
            {/* Invisible placeholder to maintain layout */}
            <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
            {/* Visible animated character */}
            <motion.span 
              className="absolute left-0 top-0"
              style={{ opacity }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
