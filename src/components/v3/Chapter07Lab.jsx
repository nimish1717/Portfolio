"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";

const EXPERIMENTS = [
  {
    id: "magnetic",
    title: "MAGNETIC FIELD",
    desc: "Interactive cursor physics and magnetic pull.",
    component: MagneticLab
  },
  {
    id: "type",
    title: "TYPE DISTORTION",
    desc: "Mouse-controlled typography distortion and stretching.",
    component: TypeLab
  },
  {
    id: "particle",
    title: "PARTICLE FIELD",
    desc: "Interactive particle grid avoiding the cursor.",
    component: ParticleLab
  },
  {
    id: "color",
    title: "COLOR SYSTEM",
    desc: "Dynamic HSL generation based on pointer coordinates.",
    component: ColorLab
  }
];

// --- Mini Labs Components ---

function MagneticLab({ isExpanded }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 }); // Magnetic pull factor
  };

  return (
    <div 
      ref={ref} 
      className="w-full h-full flex items-center justify-center bg-[#0D0D0F]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      <motion.div 
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={`rounded-full border border-accent flex items-center justify-center text-accent font-bebas ${isExpanded ? 'w-48 h-48 text-4xl' : 'w-24 h-24 text-xl'}`}
      >
        PULL
      </motion.div>
    </div>
  );
}

function TypeLab({ isExpanded }) {
  const [stretch, setStretch] = useState(1);
  const handleMouseMove = (e) => {
    const normX = e.clientX / window.innerWidth;
    setStretch(0.5 + normX * 2);
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#17181B] overflow-hidden" onMouseMove={handleMouseMove}>
      <motion.div 
        animate={{ scaleX: stretch }}
        className={`font-bebas text-[#F1EFEA] tracking-tighter ${isExpanded ? 'text-9xl' : 'text-5xl md:text-7xl'}`}
      >
        DISTORT
      </motion.div>
    </div>
  );
}

function ParticleLab() {
  const dots = useMemo(() => Array.from({ length: 150 }), []);
  
  return (
    <div className="w-full h-full bg-[#0D0D0F] p-4 flex flex-wrap gap-2 content-center justify-center overflow-hidden">
      {dots.map((_, i) => (
        <motion.div 
          key={i}
          className="w-1.5 h-1.5 bg-white/20 rounded-full"
          whileHover={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
}

function ColorLab({ isExpanded }) {
  const [color, setColor] = useState("hsl(200, 10%, 15%)");
  
  const handleMouseMove = (e) => {
    const h = (e.clientX / window.innerWidth) * 360;
    const s = 50 + (e.clientY / window.innerHeight) * 50;
    setColor(`hsl(${h}, ${s}%, 50%)`);
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center transition-colors duration-200"
      style={{ backgroundColor: color }}
      onMouseMove={handleMouseMove}
    >
      <span className={`font-mono text-white/50 mix-blend-difference ${isExpanded ? 'text-2xl' : 'text-xs'}`}>
        {color}
      </span>
    </div>
  );
}

// --- Main Chapter Component ---

export function Chapter07Lab() {
  const [hoveredExp, setHoveredExp] = useState(null);
  const [activeExperiment, setActiveExperiment] = useState(null);
  const { setCursorVariant, setCursorText } = useCursor();

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveExperiment(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="lab" className="relative w-full min-h-screen bg-[#0D0D0F] text-[#F1EFEA] py-32 overflow-hidden flex flex-col">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4">I LIKE TO BREAK THINGS</p>
            <h2 className="font-bebas text-6xl md:text-8xl tracking-wider uppercase text-white mb-4">THE LAB</h2>
            <p className="font-mono text-sm tracking-wide text-white/50 max-w-md">Experiments with motion, interfaces, generative logic and interaction.</p>
          </div>
          <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">07 / EXPERIMENTS</span>
        </div>

        {/* Playground Grid (Accordion Flex) */}
        <div className="flex-1 w-full h-[50vh] md:h-[60vh] flex flex-col md:flex-row gap-2 md:gap-4 mt-8">
          {EXPERIMENTS.map((exp, i) => {
            const isHovered = hoveredExp === exp.id;
            return (
              <motion.div 
                key={exp.id}
                layout
                onMouseEnter={() => {
                  setHoveredExp(exp.id);
                  setCursorVariant("text");
                  setCursorText("PLAY");
                }}
                onMouseLeave={() => {
                  setHoveredExp(null);
                  setCursorVariant("default");
                  setCursorText("");
                }}
                onClick={() => setActiveExperiment(exp)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col overflow-hidden cursor-pointer border border-white/5 bg-white/[0.01] transition-[flex] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isHovered ? "flex-[3]" : hoveredExp ? "flex-1" : "flex-1 md:flex-[1.5]"
                }`}
              >
                {/* Pointer events none so it doesn't trap hover state of grid item */}
                <div className="absolute inset-0 pointer-events-none">
                   <exp.component isExpanded={false} />
                </div>
                
                {/* Overlay for non-hovered state */}
                <div className={`absolute inset-0 bg-black/40 transition-colors duration-500 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
                
                {/* Labels */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-1 z-10">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-accent">0{i+1}</span>
                  <h3 className="font-bebas text-2xl md:text-3xl tracking-wide uppercase text-white truncate">
                    {exp.title}
                  </h3>
                  {isHovered && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="font-mono text-[9px] text-white/50 mt-2 truncate"
                    >
                      {exp.desc}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Interactive Canvas */}
      <AnimatePresence>
        {activeExperiment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0D0D0F] flex flex-col"
          >
            {/* Header */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-white">
               <div className="flex flex-col">
                 <span className="font-mono text-[10px] text-accent tracking-widest uppercase">EXPERIMENT</span>
                 <h2 className="font-bebas text-4xl tracking-widest">{activeExperiment.title}</h2>
               </div>
               <button 
                  onClick={() => setActiveExperiment(null)}
                  className="font-mono text-[10px] tracking-widest uppercase text-white/50 hover:text-white pointer-events-auto border border-white/20 px-6 py-2 rounded-full hover:bg-white/10 transition-colors"
               >
                 CLOSE [ESC]
               </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 w-full h-full cursor-crosshair">
               <activeExperiment.component isExpanded={true} />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
