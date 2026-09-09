import { useRef, useEffect } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import HeroCharacter from './HeroCharacter';
import './Hero.css';

export default function Hero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'] // Tracks while container is leaving
  });

  // Since React Three Fiber needs a ref to avoid re-renders,
  // we use a plain ref updated via motionValue.onChange
  const scrollData = useRef(0);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // The hero is 200vh tall, so it scrolls for 100vh.
      // We want progress from 0 to 1 over that scroll.
      scrollData.current = Math.min(1, Math.max(0, latest * 2));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Typography animations linked to scroll
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-[#0a0a0c]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* 3D Character Layer */}
        <HeroCharacter scrollData={scrollData} />

        {/* Typography Layer (matching existing design) */}
        <motion.div 
          className="hero-content relative z-20 pointer-events-none"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <h1 className="hero-name title mix-blend-difference">
            Nimish Agrawal
          </h1>
          <p className="hero-subtitle para mix-blend-difference">
            Software Engineer · Full-Stack Developer · Problem Solver
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator z-20 pointer-events-none"
          style={{ opacity: titleOpacity }}
        >
          <div className="scroll-line" />
        </motion.div>
        
      </div>
    </section>
  );
}
