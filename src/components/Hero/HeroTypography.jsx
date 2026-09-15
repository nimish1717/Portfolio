import { motion } from 'framer-motion';
import Magnet from '../ui/Magnet';
import './HeroTypography.css';

export default function HeroTypography({ scrollY, mouseX, mouseY }) {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-typography-layer">
      <motion.div
        className="hero-text-content"
        style={{
          y: scrollY,
          x: mouseX,
        }}
      >
        <h1 className="hero-huge-text">
          NIMISH
        </h1>
        
        <p className="hero-subtext">
          We Adapt. We Shield. We Disappear. Step into the field<br />
          with techwear built for low light and high stakes.
        </p>

        <div className="hero-actions">
          <Magnet strength={12}>
            <a href="#projects" onClick={scrollTo('projects')} className="btn btn-ghost hero-btn-discover" data-cursor="link">
              Discover <span className="dots">••</span>
            </a>
          </Magnet>
          
          <Magnet strength={12}>
            <a href="#contact" onClick={scrollTo('contact')} className="hero-btn-connect" data-cursor="link">
              <span className="discord-icon">👾</span> Connect With Us
            </a>
          </Magnet>
        </div>
      </motion.div>
    </div>
  );
}
