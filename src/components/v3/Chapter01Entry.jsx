"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";

export function Chapter01Entry() {
  const containerRef = useRef(null);
  const { setCursorVariant, setCursorText } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // We pin this section for 300vh to give a long scrub timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress for physics-based interpolations
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // SCROLL STATES
  // 0.00 - 0.15: STATE 01 (Name dominates)
  // 0.15 - 0.30: STATE 02 (Avatar emerges/scales up)
  // 0.30 - 0.45: STATE 03 (Name splits)
  // 0.45 - 0.60: STATE 04 (Technical metadata rearranges)
  // 0.60 - 0.75: STATE 05 (Avatar moves aside)
  // 0.75 - 0.90: STATE 06 (Intro statement appears)
  // 0.90 - 1.00: STATE 07 (Transforms to next chapter)

  // Name splitting
  const nimishX = useTransform(smoothProgress, [0.3, 0.45], ["0%", "-50vw"]);
  const nimishY = useTransform(smoothProgress, [0.6, 0.75], ["0%", "-50vh"]);
  const nimishOpacity = useTransform(smoothProgress, [0.6, 0.8], [1, 0]);

  const agrawalX = useTransform(smoothProgress, [0.3, 0.45], ["0%", "50vw"]);
  const agrawalY = useTransform(smoothProgress, [0.6, 0.75], ["0%", "50vh"]);
  const agrawalOpacity = useTransform(smoothProgress, [0.6, 0.8], [1, 0]);

  // Avatar transformations
  // State 02: emerges (scale goes up)
  // State 05: moves aside
  const avatarScale = useTransform(smoothProgress, [0, 0.15, 0.3, 0.6, 0.75], [0.8, 1.2, 1, 1, 0.5]);
  const avatarX = useTransform(smoothProgress, [0, 0.6, 0.75], ["-50%", "-50%", "20%"]);
  const avatarY = useTransform(smoothProgress, [0, 0.6, 0.75], ["-50%", "-50%", "-20%"]);
  
  // Mouse parallax for avatar
  const avatarRotateY = useTransform(smoothProgress, [0, 1], [mousePosition.x * 30, mousePosition.x * 30 + 45]);
  const avatarRotateX = useTransform(smoothProgress, [0, 1], [mousePosition.y * -30, mousePosition.y * -30 - 20]);

  const avatarFilter = useTransform(
    smoothProgress, 
    [0, 0.4, 0.8], 
    [
      "sepia(0.8) hue-rotate(180deg) brightness(0.9) contrast(1.2)", 
      "sepia(0.3) hue-rotate(200deg) brightness(1.2) contrast(1.5)", 
      "sepia(1) hue-rotate(180deg) brightness(0.2) contrast(1)"
    ]
  );
  
  // Metadata rail fades
  const metaRailOpacity = useTransform(smoothProgress, [0.4, 0.5], [1, 0]);
  
  // Intro statement (State 06)
  const introOpacity = useTransform(smoothProgress, [0.7, 0.8, 0.9, 1], [0, 1, 1, 0]);
  const introY = useTransform(smoothProgress, [0.7, 0.8, 0.9, 1], ["20%", "0%", "0%", "-20%"]);

  // Global exit
  const containerOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0]);

  const enterTransition = { duration: 1.5, ease: [0.16, 1, 0.3, 1] };

  return (
    <section ref={containerRef} id="entry" className="relative w-full h-[300vh] bg-bg">
      <motion.div 
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center pointer-events-none"
        style={{ opacity: containerOpacity }}
      >
        
        {/* VERTICAL DATA RAIL (Left) */}
        <motion.div 
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-12 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-fg/40 z-30 pointer-events-none"
          style={{ opacity: metaRailOpacity }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...enterTransition, delay: 0.8 }}
        >
          <div className="flex flex-col gap-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span>BASED IN INDIA</span>
          </div>
          <div className="flex flex-col gap-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span>COMPUTER ENGINEERING</span>
          </div>
          <div className="flex flex-col gap-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span>FRONTEND / AI / UI</span>
          </div>
          <div className="flex flex-col gap-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span>2026</span>
          </div>
        </motion.div>

        {/* TOP METADATA (Right) */}
        <motion.div
           className="absolute right-6 md:right-12 top-24 md:top-32 flex flex-col items-end gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-fg/40 z-30"
           style={{ opacity: metaRailOpacity }}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ ...enterTransition, delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>AVAILABLE FOR</span>
          </div>
          <span>SOFTWARE / CREATIVE DEV</span>
        </motion.div>

        {/* BOTTOM METADATA (Right) */}
        <motion.div
           className="absolute right-6 md:right-12 bottom-12 flex flex-col items-end gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-fg/40 z-30"
           style={{ opacity: metaRailOpacity }}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ ...enterTransition, delay: 1.2 }}
        >
          <span>THAPAR INSTITUTE OF ENG & TECH</span>
          <span>01 / ENTRY</span>
        </motion.div>

        {/* DIGITAL AVATAR */}
        <motion.div 
          className="absolute top-1/2 left-1/2 z-10 w-[300px] sm:w-[450px] md:w-[600px] aspect-square rounded-full mix-blend-screen pointer-events-auto"
          style={{ 
            scale: avatarScale, 
            rotateY: avatarRotateY, 
            rotateX: avatarRotateX,
            x: avatarX,
            y: avatarY,
            transformPerspective: 1000
          }}
          initial={{ opacity: 0, scale: 0.5, y: "-40%", x: "-50%" }}
          animate={{ opacity: 0.8, scale: 1, y: "-50%", x: "-50%" }}
          transition={{ ...enterTransition, delay: 0.5 }}
          onMouseEnter={() => {
            setCursorVariant("text");
            setCursorText("DISCOVER");
          }}
          onMouseLeave={() => {
            setCursorVariant("default");
            setCursorText("");
          }}
        >
          {/* Avatar Container with glowing effect */}
          <div className="relative w-full h-full overflow-hidden rounded-full mask-image-radial bg-fg/5 shadow-[0_0_80px_rgba(255,255,255,0.05)]">
            <motion.img 
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Digital Avatar"
              className="absolute inset-0 w-full h-full object-cover scale-110"
              style={{ filter: avatarFilter }}
            />
            {/* Tech noise & particles overlay */}
            <div className="absolute inset-0 bg-black opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 border-[0.5px] border-fg/10 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border-[0.5px] border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Mouse-reactive glow */}
            <div 
              className="absolute w-full h-full rounded-full bg-accent mix-blend-overlay blur-[50px] pointer-events-none transition-transform duration-500"
              style={{ 
                opacity: 0.3,
                transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
              }}
            />
          </div>
        </motion.div>

        {/* MAIN TYPOGRAPHY */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full pointer-events-none">
          <div className="overflow-hidden w-full text-center">
            <motion.h1 
              className="font-bebas font-black uppercase tracking-tighter leading-[0.75] text-[clamp(80px,22vw,400px)] whitespace-nowrap text-fg mix-blend-difference"
              style={{ x: nimishX, y: nimishY, opacity: nimishOpacity }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ ...enterTransition, delay: 0.2 }}
            >
              NIMISH
            </motion.h1>
          </div>
          <div className="overflow-hidden w-full text-center mt-2 md:mt-4">
            <motion.h1 
              className="font-bebas font-black uppercase tracking-tighter leading-[0.75] text-[clamp(80px,22vw,400px)] whitespace-nowrap text-fg mix-blend-difference"
              style={{ x: agrawalX, y: agrawalY, opacity: agrawalOpacity }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ ...enterTransition, delay: 0.3 }}
            >
              AGRAWAL
            </motion.h1>
          </div>
        </div>

        {/* STATE 06 INTRO STATEMENT */}
        <motion.div 
          className="absolute z-20 max-w-3xl px-6 text-center font-bebas text-3xl md:text-5xl lg:text-7xl leading-[0.9] tracking-wide"
          style={{ opacity: introOpacity, y: introY }}
        >
          BUILDING <span className="text-accent">DIGITAL EXPERIENCES</span> AT THE INTERSECTION OF <span className="text-accent">ENGINEERING</span> AND <span className="text-accent">DESIGN</span>.
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
          style={{ opacity: metaRailOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enterTransition, delay: 1.4 }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-fg/30">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-fg/50 to-transparent" />
        </motion.div>

      </motion.div>
    </section>
  );
}
