"use client";

import { useState, useRef, useEffect } from "react";
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
      className="w-full h-full flex items-center justify-center bg-zinc-950"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      <motion.div 
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={`rounded-full bg-white flex items-center justify-center text-black font-bebas ${isExpanded ? 'w-48 h-48 text-4xl' : 'w-24 h-24 text-xl'}`}
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
    <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden" onMouseMove={handleMouseMove}>
      <motion.div 
        animate={{ scaleX: stretch }}
        className={`font-bebas text-white tracking-tighter ${isExpanded ? 'text-9xl' : 'text-6xl'}`}
      >
        DISTORT
      </motion.div>
    </div>
  );
}

function ParticleLab() {
  // A simple CSS grid of dots that scale down when hovered
  const dots = Array.from({ length: 100 });
  
  return (
    <div className="w-full h-full bg-black p-8 flex flex-wrap gap-2 content-center justify-center">
      {dots.map((_, i) => (
        <motion.div 
          key={i}
          className="w-2 h-2 bg-white/20 rounded-full"
          whileHover={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
}

function ColorLab({ isExpanded }) {
  const [color, setColor] = useState("hsl(0, 0%, 10%)");
  
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
  const [activeExperiment, setActiveExperiment] = useState(null);
  const { setCursorVariant, setCursorText } = useCursor();

  return (
    <section id="lab" className="relative w-full min-h-screen bg-bg text-fg py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">I LIKE TO BREAK THINGS</p>
            <h2 className="font-bebas text-4xl md:text-6xl tracking-wider uppercase text-fg/80 mb-4">THE LAB</h2>
            <p className="font-mono text-sm tracking-wide text-fg/50 max-w-md">Experiments with motion, interfaces, generative logic and interaction.</p>
          </div>
          <span className="font-mono text-xs text-fg/40 tracking-widest uppercase">07 / LAB</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {EXPERIMENTS.map((exp, i) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col gap-4 cursor-pointer"
              onClick={() => setActiveExperiment(exp)}
              onMouseEnter={() => {
                setCursorVariant("text");
                setCursorText("PLAY");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
            >
              <div className="w-full aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden relative">
                {/* Pointer events none so it doesn't trap hover state of grid item */}
                <div className="absolute inset-0 pointer-events-none group-hover:pointer-events-auto">
                   <exp.component isExpanded={false} />
                </div>
                
                {/* Overlay for non-hovered state */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h3 className="font-bebas text-2xl tracking-wide uppercase text-fg/90 group-hover:text-accent transition-colors">
                    0{i+1} — {exp.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-fg/50 mt-1">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Interactive Canvas */}
      <AnimatePresence>
        {activeExperiment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg flex flex-col"
          >
            {/* Header */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
               <div className="flex flex-col">
                 <span className="font-mono text-xs text-accent tracking-widest uppercase">EXPERIMENT</span>
                 <h2 className="font-bebas text-4xl text-white tracking-widest">{activeExperiment.title}</h2>
               </div>
               <button 
                  onClick={() => setActiveExperiment(null)}
                  className="font-mono text-xs tracking-widest uppercase text-white/50 hover:text-white pointer-events-auto border border-white/20 px-6 py-2 rounded-full"
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
