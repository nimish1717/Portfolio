import { motion } from 'framer-motion';
import './HeroImage.css';

export default function HeroImage({ scrollY, mouseX, mouseY }) {
  return (
    <div className="hero-image-layer" aria-hidden="true">
      <motion.div
        className="hero-image-wrapper"
        style={{
          y: scrollY,
          x: mouseX,
        }}
      >
        <img 
          src="/hero.png" 
          alt="Nimish Agrawal" 
          className="hero-image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        {/* Fallback silhouette if image is missing */}
        <div className="hero-image-fallback" style={{ display: 'none' }}>
           <div className="fallback-head"></div>
           <div className="fallback-body"></div>
        </div>
      </motion.div>
    </div>
  );
}
