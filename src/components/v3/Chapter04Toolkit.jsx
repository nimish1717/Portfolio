"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";
import { skillsData } from "@/data/skills";

export function Chapter04Toolkit() {
  const containerRef = useRef(null);
  const { setCursorVariant, setCursorText } = useCursor();
  
  // Flatten skills for the matrix
  const allSkills = skillsData.flatMap(category => 
    category.skills.map(skill => ({ skill, category: category.title }))
  );

  const [activeSkill, setActiveSkill] = useState(allSkills[0]);

  // Scroll animations for the radial diagram and matrix
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const radialRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const matrixY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="toolkit" className="relative w-full min-h-screen bg-[#EAEAEA] text-[#111111] py-32 overflow-hidden selection:bg-[#111111] selection:text-[#EAEAEA]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col h-full">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16 md:mb-24">
          <h2 className="font-bebas text-4xl md:text-6xl tracking-wider uppercase text-[#111111]/80">MY TOOLKIT</h2>
          <span className="font-mono text-xs text-[#111111]/40 tracking-widest uppercase">04 / STACK</span>
        </div>

        {/* Intro */}
        <div className="mb-24">
          <p className="font-mono text-sm tracking-widest text-[#111111]/60 mb-4">I BUILD ACROSS</p>
          <h3 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.85] text-[#111111]">
            FRONTEND, BACKEND, AI / ML, DATABASES, DESIGN, MOTION, TECHNOLOGY SYSTEMS.
          </h3>
        </div>

        {/* Toolkit Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-12 flex-1 items-center">
          
          {/* LEFT: Radial Diagram & Info Panel */}
          <div className="relative w-full aspect-square flex items-center justify-center">
            
            {/* Info Panel (Dynamic based on hover) */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <motion.h4 
                  key={activeSkill.skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-bebas text-5xl md:text-6xl text-[#111111]"
                >
                  {activeSkill.skill}
                </motion.h4>
                <motion.span 
                  key={activeSkill.category}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs tracking-widest uppercase text-accent"
                >
                  {activeSkill.category}
                </motion.span>
              </div>
            </div>

            {/* Radial Diagram */}
            <motion.div 
              className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border border-[#111111]/10 flex items-center justify-center pointer-events-none"
              style={{ rotate: radialRotation }}
            >
              <div className="absolute w-full h-full border border-[#111111]/5 rounded-full scale-[1.3]" />
              <div className="absolute w-full h-full border border-[#111111]/5 rounded-full scale-[1.6]" />
              
              {/* Center */}
              <div className="font-bebas text-3xl tracking-widest text-[#111111]">NIMISH</div>

              {/* Orbiting Categories */}
              {skillsData.map((cat, i) => {
                const angle = (i / skillsData.length) * 360;
                const radius = 180; // Distance from center
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                return (
                  <div
                    key={cat.title}
                    className="absolute font-mono text-[10px] tracking-widest uppercase text-[#111111]/50 bg-[#EAEAEA] px-2"
                    style={{
                      transform: `translate(${x}px, ${y}px) rotate(${-angle}deg)`,
                      // We inverse the rotation of the parent to keep text readable
                    }}
                  >
                    {cat.title}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT: Technology Matrix */}
          <motion.div 
            className="w-full flex flex-wrap gap-3 md:gap-4 content-start"
            style={{ y: matrixY }}
          >
            {allSkills.map((item, i) => (
              <motion.div
                key={item.skill + i}
                onMouseEnter={() => {
                  setActiveSkill(item);
                  setCursorVariant("text");
                  setCursorText("VIEW");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
                className={`px-4 py-3 border rounded-sm font-mono text-xs md:text-sm tracking-wide cursor-pointer transition-colors duration-300 ${
                  activeSkill.skill === item.skill
                    ? "border-[#111111] bg-[#111111] text-[#EAEAEA]"
                    : "border-[#111111]/20 text-[#111111]/70 hover:border-[#111111]/60"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
