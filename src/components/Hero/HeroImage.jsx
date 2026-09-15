import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';
import './HeroImage.css';

export default function HeroImage({ scrollY, mouseX, mouseY }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });

  // Use springs for smooth flashlight movement
  const maskX = useSpring(50, { stiffness: 100, damping: 20 });
  const maskY = useSpring(50, { stiffness: 100, damping: 20 });
  const maskSize = useSpring(0, { stiffness: 60, damping: 20 }); // Start hidden (0%)

  useEffect(() => {
    if (isHovered) {
      maskX.set(localMousePos.x);
      maskY.set(localMousePos.y);
      maskSize.set(30); // Flashlight size (percentage of width) on hover
    } else {
      maskSize.set(0); // Hide mask when not hovered
    }
  }, [isHovered, localMousePos, maskX, maskY, maskSize]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate percentage position
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLocalMousePos({ x, y });
  };

  // The mask reveals the image inside the gradient, and hides it outside (transparent)
  const maskImage = useMotionTemplate`radial-gradient(circle at ${maskX}% ${maskY}%, black 0%, black calc(${maskSize}% - 5%), transparent ${maskSize}%)`;

  return (
    <div 
      className="hero-image-layer" 
      aria-hidden="true"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ pointerEvents: 'auto' }} // Allow mouse events here
    >
      <motion.div
        className="hero-image-wrapper"
        style={{
          y: scrollY,
          x: mouseX,
        }}
      >
        {/* BASE IMAGE: Permanently on screen, slightly dimmed */}
        <motion.img 
          src="/hero.png" 
          alt="Nimish Agrawal Background" 
          className="hero-image cinematic-subject-base"
        />

        {/* SPOTLIGHT MASK IMAGE: Reveals full brightness on hover */}
        <motion.img 
          src="/hero.png" 
          alt="Nimish Agrawal Spotlight" 
          className="hero-image cinematic-subject"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
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
