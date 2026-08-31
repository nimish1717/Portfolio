"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { journeyData as journey } from "@/data/journey";
import { useCursor } from "@/components/v3/ui/CustomCursor";

function JourneyNode({ milestone, index, total }) {
  const nodeRef = useRef(null);
  const { setCursorVariant } = useCursor();

  // Track when this specific node is in the center of the viewport
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Animations based on how close the node is to the center
  // 0.5 is exactly center. We want it fully expanded there.
  const isActive = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0]);
  
  const yearScale = useTransform(isActive, [0, 1], [0.5, 1]);
  const yearOpacity = useTransform(isActive, [0, 1], [0.3, 1]);
  const yearColor = useTransform(isActive, [0, 1], ["#9B9A96", "#E8FF47"]); // Muted to Accent

  const contentX = useTransform(isActive, [0, 1], [-50, 0]);
  const contentOpacity = useTransform(isActive, [0, 1], [0, 1]);

  return (
    <div ref={nodeRef} className="relative w-full min-h-[70vh] flex items-center">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 w-full items-center relative z-10">
        
        {/* YEAR (Left) */}
        <div className="md:col-span-4 flex justify-start md:justify-end">
          <motion.h3 
            className="font-bebas text-7xl md:text-9xl tracking-tighter"
            style={{ scale: yearScale, opacity: yearOpacity, color: yearColor }}
          >
            {milestone.year}
          </motion.h3>
        </div>

        {/* NODE POINT (Center) */}
        <div className="hidden md:flex md:col-span-1 justify-center items-center h-full relative">
          <motion.div 
            className="w-4 h-4 rounded-full bg-[#E8FF47] z-20"
            style={{ scale: isActive, opacity: isActive }}
          />
          <div className="w-2 h-2 rounded-full bg-white/20 z-10 absolute" />
        </div>

        {/* CONTENT (Right) */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <motion.div 
            style={{ x: contentX, opacity: contentOpacity }}
            className="flex flex-col gap-6 p-8 md:p-12 border border-white/10 bg-[#202126] relative overflow-hidden group"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
             {/* Micro UI Decorators */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-white/30 uppercase">
               NODE 0{index + 1}
             </span>

             <div className="flex flex-col gap-2">
               <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                 {milestone.role}
               </span>
               <h4 className="font-bebas text-4xl md:text-5xl tracking-wide uppercase text-white">
                 {milestone.title}
               </h4>
             </div>
             
             <p className="font-inter text-sm md:text-base font-light leading-relaxed text-white/60">
               {milestone.description}
             </p>

             <div className="flex flex-wrap gap-2 mt-4">
                {milestone.techStack?.map(t => (
                  <span key={t} className="font-mono text-[9px] tracking-widest uppercase border border-white/10 px-2 py-1 text-white/40">
                    {t}
                  </span>
                ))}
             </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export function Chapter06Experience() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const lineScale = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="relative w-full bg-[#17181B] text-[#F1EFEA] py-32 overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center text-center mb-32">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#9B9A96]">06 / TIMELINE</span>
        <h2 className="font-bebas text-6xl md:text-8xl tracking-wider uppercase mt-4">THE JOURNEY</h2>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">
        
        {/* VERTICAL LINE (Background) */}
        <div className="absolute left-6 md:left-[42%] lg:left-[41.6%] top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />
        
        {/* VERTICAL LINE (Active Illuminated) */}
        <motion.div 
          className="absolute left-6 md:left-[42%] lg:left-[41.6%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent to-transparent hidden md:block origin-top"
          style={{ scaleY: lineScale }}
        />

        <div className="flex flex-col">
          {journey.map((milestone, index) => (
            <JourneyNode 
              key={index} 
              milestone={milestone} 
              index={index} 
              total={journey.length} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
