"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";

const ECOSYSTEM = [
  {
    domain: "FRONTEND",
    angle: 0,
    tech: ["React", "Next.js", "Tailwind", "Framer Motion", "GSAP"]
  },
  {
    domain: "BACKEND",
    angle: 72,
    tech: ["Node.js", "Express", "REST APIs", "WebSockets"]
  },
  {
    domain: "AI / ML",
    angle: 144,
    tech: ["Python", "TensorFlow", "Scikit", "Pandas"]
  },
  {
    domain: "DATABASE",
    angle: 216,
    tech: ["MongoDB", "PostgreSQL", "Mongoose", "SQL"]
  },
  {
    domain: "DESIGN",
    angle: 288,
    tech: ["Figma", "UI/UX", "Wireframing", "Prototyping"]
  }
];

export function Chapter04Toolkit() {
  const containerRef = useRef(null);
  const [activeDomain, setActiveDomain] = useState(null);
  const { setCursorVariant } = useCursor();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth color transition from Graphite (#17181B) to Light (#F1EFEA) and back
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["#17181B", "#F1EFEA", "#F1EFEA", "#0D0D0F"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["#F1EFEA", "#0D0D0F", "#0D0D0F", "#F1EFEA"]
  );

  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["rgba(255,255,255,0.1)", "rgba(13,13,15,0.1)", "rgba(13,13,15,0.1)", "rgba(255,255,255,0.1)"]
  );

  // Radial System scroll animations
  const radialScale = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.9], [0.5, 1, 1, 0.5]);
  const radialOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  const radialRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Transition into Project tag at the very end
  const projectTagOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const projectTagScale = useTransform(scrollYProgress, [0.75, 0.85], [0.8, 1]);

  return (
    <motion.section 
      id="toolkit" 
      ref={containerRef} 
      style={{ backgroundColor, color: textColor }}
      className="relative w-full min-h-[150vh] py-32 overflow-hidden flex flex-col"
    >
      {/* Light noise for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 sticky top-32 h-[80vh] flex flex-col items-center justify-between">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">04 / ECOSYSTEM</span>
          <h2 className="font-bebas text-6xl md:text-8xl tracking-wider uppercase">MY TOOLKIT</h2>
        </div>

        {/* Interactive Radial System */}
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center my-12">
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ scale: radialScale, opacity: radialOpacity, rotate: radialRotate }}
          >
            {/* Center Node */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-current flex items-center justify-center z-20 bg-[#F1EFEA]"
            >
              <span className="font-bebas text-2xl md:text-3xl tracking-widest">NIMISH</span>
            </motion.div>

            {/* Orbiting Domains */}
            {ECOSYSTEM.map((eco, i) => {
              const radius = window.innerWidth < 768 ? 120 : 200;
              const rad = (eco.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div key={eco.domain} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Connection Line */}
                  <motion.div 
                     className="absolute origin-left h-[1px] opacity-20"
                     style={{ 
                       width: radius, 
                       rotate: eco.angle,
                       backgroundColor: textColor 
                     }}
                  />
                  
                  {/* Domain Node */}
                  <motion.div 
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.5, ease: "easeInOut" }}
                    className="absolute pointer-events-auto cursor-pointer flex flex-col items-center gap-2 group"
                    style={{ transform: `translate(${x}px, ${y}px) rotate(${-eco.angle}deg)` }}
                    onMouseEnter={() => {
                      setActiveDomain(eco);
                      setCursorVariant("hover");
                    }}
                    onMouseLeave={() => {
                      setActiveDomain(null);
                      setCursorVariant("default");
                    }}
                  >
                    <div className={`w-3 h-3 rounded-full border border-current transition-colors ${activeDomain?.domain === eco.domain ? 'bg-current shadow-[0_0_15px_currentColor]' : 'bg-transparent'}`} />
                    <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase bg-[#F1EFEA] px-2 py-1 rounded">
                      {eco.domain}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Expanded Technologies Tooltip (Centered) */}
          <AnimatePresence>
            {activeDomain && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: "-40%" }}
                animate={{ opacity: 1, scale: 1, y: "-50%" }}
                exit={{ opacity: 0, scale: 0.8, y: "-40%" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col gap-2 p-6 bg-white border shadow-[0_0_50px_rgba(0,0,0,0.1)] rounded-xl"
                style={{ borderColor }}
              >
                <span className="font-mono text-[9px] tracking-widest uppercase opacity-50 mb-2">{activeDomain.domain} STACK</span>
                {activeDomain.tech.map(t => (
                  <span key={t} className="font-bebas text-2xl md:text-3xl tracking-wide opacity-90 whitespace-nowrap">
                    {t}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Transition into Projects */}
        <motion.div 
          className="flex flex-col items-center text-center gap-4 mt-auto mb-12"
          style={{ opacity: projectTagOpacity, scale: projectTagScale }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">SCROLL DOWN TO SEE THESE IN ACTION</span>
          <div className="px-6 py-3 border rounded-full font-bebas text-xl md:text-2xl tracking-widest uppercase flex items-center gap-3 bg-[#0D0D0F] text-[#F1EFEA]">
            <span>PHANTOMPOST</span>
            <span className="opacity-50">→</span>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
