"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";

const SIGNAL_DATA = {
  build: {
    id: "build",
    title: "BUILD",
    desc: "I BUILD DIGITAL PRODUCTS AND FULL-STACK EXPERIENCES.",
    bgTheme: "bg-black",
    pattern: "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]",
    textColor: "text-white",
    accentColor: "text-blue-500",
  },
  design: {
    id: "design",
    title: "DESIGN",
    desc: "I CARE ABOUT HOW SOFTWARE FEELS, NOT ONLY HOW IT WORKS.",
    bgTheme: "bg-neutral-900",
    pattern: "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]",
    textColor: "text-neutral-100",
    accentColor: "text-orange-500",
  },
  explore: {
    id: "explore",
    title: "EXPLORE",
    desc: "I EXPERIMENT WITH INTERACTION, AI AND DIGITAL EXPERIENCES.",
    bgTheme: "bg-zinc-950",
    pattern: "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]",
    textColor: "text-zinc-100",
    accentColor: "text-purple-500",
  }
};

export function Chapter02Signal() {
  const [activeSignal, setActiveSignal] = useState("build");
  const { setCursorVariant, setCursorText } = useCursor();

  const handleMouseEnter = (id) => {
    setActiveSignal(id);
    setCursorVariant("text");
    setCursorText(id.toUpperCase());
  };

  const handleMouseLeave = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  const activeData = SIGNAL_DATA[activeSignal];

  return (
    <section id="signal" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Dynamic Backgrounds */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSignal + "-bg"}
          className={`absolute inset-0 ${activeData.bgTheme} transition-colors duration-1000 ease-in-out`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className={`absolute inset-0 ${activeData.pattern} opacity-50`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/20 to-bg" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-between">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16 md:mb-24">
          <h2 className="font-bebas text-4xl md:text-6xl tracking-wider uppercase text-fg/80">WHAT I DO</h2>
          <span className="font-mono text-xs text-fg/40 tracking-widest uppercase">02 / SIGNAL</span>
        </div>

        {/* Interactive Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 flex-1">
          {Object.values(SIGNAL_DATA).map((signal) => {
            const isActive = activeSignal === signal.id;
            return (
              <div 
                key={signal.id}
                className="group relative flex flex-col justify-end h-[40vh] md:h-[60vh] border border-white/5 bg-white/[0.02] p-8 cursor-pointer overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-white/20"
                onMouseEnter={() => handleMouseEnter(signal.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background Hover Effect */}
                <div 
                  className={`absolute inset-0 bg-white/5 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
                />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col gap-6">
                  <motion.h3 
                    className={`font-bebas text-5xl md:text-7xl lg:text-8xl tracking-tight transition-colors duration-500 ${isActive ? activeData.accentColor : 'text-fg/20'}`}
                    animate={{ y: isActive ? 0 : 10, scale: isActive ? 1 : 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {signal.title}
                  </motion.h3>
                  
                  <div className="h-[60px] md:h-[80px] overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="font-mono text-xs md:text-sm text-fg/70 leading-relaxed uppercase tracking-wide max-w-xs"
                        >
                          {signal.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
