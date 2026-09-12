import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ShaderBackground from './ShaderBackground';
import HeroNavigation from './HeroNavigation';
import HeroTypography from './HeroTypography';
import HeroImage from './HeroImage';
import HeroBlocks from './HeroBlocks';
import './Hero.css';

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ────────────────────────────────────────────────────────
  // 1. Mouse Parallax Setup
  // ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -1 to 1 based on viewport
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth mouse values with springs for fluid motion
  const mouseSpringConfig = { stiffness: 75, damping: 20, mass: 1 };
  const smoothMouseX = useSpring(mousePos.x, mouseSpringConfig);
  const smoothMouseY = useSpring(mousePos.y, mouseSpringConfig);

  // Parallax layer depths
  const bgX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  const typeX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const typeY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const imageX = useTransform(smoothMouseX, [-1, 1], [15, -15]); // Opposite to type for depth
  const imageY = useTransform(smoothMouseY, [-1, 1], [5, -5]);

  const uiSmallX = useTransform(smoothMouseX, [-1, 1], [20, -20]);
  const uiSmallY = useTransform(smoothMouseY, [-1, 1], [10, -10]);

  const uiMedX = useTransform(smoothMouseX, [-1, 1], [40, -40]);
  const uiMedY = useTransform(smoothMouseY, [-1, 1], [20, -20]);

  // ────────────────────────────────────────────────────────
  // 2. Scroll Interaction Setup
  // ────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // As we scroll down, the hero scales down, fades out, and translates up
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scrollYOffset = useTransform(scrollYProgress, [0, 1], ['0vh', '30vh']);
  const borderRadius = useTransform(scrollYProgress, [0, 0.2], ['24px', '40px']);

  // Typography moves faster on scroll
  const typeScrollY = useTransform(scrollYProgress, [0, 1], ['0vh', '-20vh']);
  
  // Image moves slightly
  const imageScrollY = useTransform(scrollYProgress, [0, 1], ['0vh', '-5vh']);

  return (
    <section 
      ref={containerRef} 
      className="hero-outer-container"
      aria-label="Nimish Agrawal — Portfolio"
    >
      <div className="hero-sticky-bounds">
        <motion.div 
          className="hero-frame"
          style={{ 
            scale, 
            opacity, 
            y: scrollYOffset,
            borderRadius 
          }}
        >
          {/* LAYER 1: Background */}
          <motion.div 
            className="hero-bg-layer"
            style={{ x: bgX, y: bgY }}
          >
            <ShaderBackground />
            <div className="hero-noise-overlay" />
          </motion.div>

          {/* LAYER 2: Large Typography (Behind Subject) */}
          <HeroTypography 
            scrollY={typeScrollY} 
            mouseX={typeX} 
            mouseY={typeY} 
          />

          {/* LAYER 3: Central Subject Image */}
          <HeroImage 
            scrollY={imageScrollY} 
            mouseX={imageX} 
            mouseY={imageY} 
          />

          {/* LAYER 4: Navigation */}
          <HeroNavigation />

          {/* LAYER 5: Editorial Blocks & CTA Cards */}
          <HeroBlocks 
            parallaxSmallX={uiSmallX} 
            parallaxSmallY={uiSmallY} 
            parallaxMedX={uiMedX} 
            parallaxMedY={uiMedY} 
          />

        </motion.div>
      </div>
    </section>
  );
}
