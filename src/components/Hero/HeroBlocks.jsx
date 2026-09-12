import { motion } from 'framer-motion';
import Magnet from '../ui/Magnet';
import './HeroBlocks.css';

export default function HeroBlocks({ 
  parallaxSmallX, parallaxSmallY, 
  parallaxMedX, parallaxMedY 
}) {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-blocks-layer" pointer-events="none">
      
      {/* LEFT TEXT BLOCK */}
      <motion.div 
        className="hero-block-left"
        style={{ x: parallaxSmallX, y: parallaxSmallY }}
      >
        <h2 className="block-heading">
          BUILDING<br />
          DIGITAL<br />
          EXPERIENCES<br />
          THAT MOVE.
        </h2>
        <p className="block-desc">
          I’m a software engineer focused on frontend experiences, 
          full-stack applications and interactive interfaces.
        </p>
        <Magnet strength={10}>
          <a href="#projects" onClick={scrollTo('projects')} className="block-cta-link" data-cursor="link">
            VIEW WORK <span className="arrow">→</span>
          </a>
        </Magnet>
      </motion.div>

      {/* RIGHT TEXT BLOCK */}
      <motion.div 
        className="hero-block-right"
        style={{ x: parallaxSmallX, y: parallaxSmallY }}
      >
        <h2 className="block-heading-sm">
          SOFTWARE<br />
          ENGINEER
        </h2>
        <p className="block-desc-sm">
          I build products where engineering, interaction 
          and visual design come together.
        </p>
      </motion.div>

      {/* BOTTOM LEFT CTA CARD */}
      <motion.div 
        className="hero-card-left"
        style={{ x: parallaxMedX, y: parallaxMedY }}
      >
        <Magnet strength={15}>
          <a href="#projects" onClick={scrollTo('projects')} className="glass-card cta-card" data-cursor="link">
            <span>EXPLORE<br/>MY WORK</span>
            <div className="cta-icon">↗</div>
          </a>
        </Magnet>
      </motion.div>

      {/* BOTTOM RIGHT INFO CARD */}
      <motion.div 
        className="hero-card-right"
        style={{ x: parallaxMedX, y: parallaxMedY }}
      >
        <div className="glass-card info-card">
          <span className="info-label">CURRENTLY</span>
          <p className="info-text">
            Building software<br/>
            & interactive experiences
          </p>
        </div>
      </motion.div>

    </div>
  );
}
