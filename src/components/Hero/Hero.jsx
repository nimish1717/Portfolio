import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ShaderBackground from './ShaderBackground';
import Magnet from '../ui/Magnet';
import './Hero.css';

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// Staggered character animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const charVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedWord({ word, delay = 0 }) {
  return (
    <motion.span
      className="hero-word"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
      aria-hidden="true"
    >
      {word.split('').map((char, i) => (
        <motion.span key={i} variants={charVariants} className="hero-char">
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Typography drifts up and fades as you scroll
  const titleY       = useTransform(scrollYProgress, [0, 0.6], ['0%', '-35%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const subtitleY    = useTransform(scrollYProgress, [0, 0.5], ['0%', '-25%']);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="hero-section"
      aria-label="Hero — Nimish Agrawal"
    >
      {/* Sticky viewport */}
      <div className="hero-sticky">
        {/* WebGL Shader Background */}
        <ShaderBackground />

        {/* Gradient overlay — darkens bottom for text legibility */}
        <div className="hero-overlay" aria-hidden="true" />

        {/* Main typography */}
        <motion.div
          className="hero-content"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <h1 className="hero-name" aria-label="Nimish Agrawal">
            <span className="clip-line">
              <AnimatedWord word="NIMISH" delay={0.05} />
            </span>
            <span className="clip-line hero-name-second">
              <AnimatedWord word="AGRAWAL" delay={0.25} />
            </span>
          </h1>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="hero-bottom"
          style={{ y: subtitleY, opacity: titleOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-bottom-left">
            <p className="hero-subtitle">
              Software Engineer<br />
              <span style={{ color: 'var(--fg-muted)' }}>Creative Developer</span>
            </p>
            <p className="hero-tagline">I build things that move.</p>
          </div>

          <div className="hero-bottom-right">
            <Magnet strength={18}>
              <a href="#projects" className="btn-solid hero-btn" onClick={scrollTo('projects')} id="hero-view-work">
                View Work ↓
              </a>
            </Magnet>
            <Magnet strength={18}>
              <a href="#contact" className="btn-outline hero-btn" onClick={scrollTo('contact')} id="hero-contact">
                Let's Connect
              </a>
            </Magnet>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          style={{ opacity: titleOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          aria-hidden="true"
        >
          <div className="scroll-line" />
          <span className="label" style={{ marginTop: 8 }}>scroll</span>
        </motion.div>

        {/* Section number */}
        <motion.span
          className="hero-section-num label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          aria-hidden="true"
        >
          01 / 07
        </motion.span>
      </div>
    </section>
  );
}
