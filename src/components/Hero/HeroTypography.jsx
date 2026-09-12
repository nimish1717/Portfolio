import { motion } from 'framer-motion';
import './HeroTypography.css';

export default function HeroTypography({ scrollY, mouseX, mouseY }) {
  return (
    <div className="hero-typography-layer" aria-hidden="true">
      <motion.div
        className="hero-huge-text"
        style={{
          y: scrollY,
          x: mouseX,
        }}
      >
        ENGINEER
      </motion.div>
    </div>
  );
}
