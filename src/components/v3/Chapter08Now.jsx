"use client";

import { motion } from "framer-motion";
import { exploringSkills } from "@/data/skills";
import { projects } from "@/data/projects";
import { useCursor } from "@/components/v3/ui/CustomCursor";

export function Chapter08Now() {
  const { setCursorVariant } = useCursor();
  
  // Real data mapped to now state
  const building = projects[0]?.title || "Full-Stack Applications";
  const learning = exploringSkills[1] || "Generative AI Integration";
  const exploring = exploringSkills[0] || "WebGL";

  return (
    <section id="now" className="relative w-full min-h-screen bg-[#17181B] text-[#F1EFEA] py-32 overflow-hidden border-t border-white/5">
      
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col h-full justify-center">
        
        <div className="flex justify-between items-end mb-24 md:mb-32">
          <h2 className="font-bebas text-6xl md:text-8xl tracking-wider uppercase text-white">NOW</h2>
          <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">08 / STATUS</span>
        </div>

        {/* Status Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* BUILDING */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group flex flex-col gap-6 p-8 md:p-12 border border-white/10 bg-[#0D0D0F] hover:bg-white/[0.02] transition-colors relative overflow-hidden"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(232,255,71,0.5)]" />
                 <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">BUILDING</span>
               </div>
               <span className="font-mono text-[9px] tracking-widest text-white/20">LIVE</span>
            </div>
            <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wide uppercase mt-4">
              {building}
            </h3>
            <div className="mt-auto pt-8 flex items-center justify-between">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">ACTIVE PROJECT</p>
            </div>
          </motion.div>

          {/* LEARNING */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group flex flex-col gap-6 p-8 md:p-12 border border-white/10 bg-[#0D0D0F] hover:bg-white/[0.02] transition-colors relative overflow-hidden"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                 <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">LEARNING</span>
               </div>
               <span className="font-mono text-[9px] tracking-widest text-white/20">IN PROGRESS</span>
            </div>
            <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wide uppercase mt-4">
              {learning}
            </h3>
            <div className="mt-auto pt-8 flex items-center justify-between">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">SKILL ACQUISITION</p>
            </div>
          </motion.div>

          {/* EXPLORING */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex flex-col gap-6 p-8 md:p-12 border border-white/10 bg-[#0D0D0F] hover:bg-white/[0.02] transition-colors relative overflow-hidden"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                 <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">EXPLORING</span>
               </div>
               <span className="font-mono text-[9px] tracking-widest text-white/20">RESEARCH</span>
            </div>
            <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wide uppercase mt-4">
              {exploring}
            </h3>
            <div className="mt-auto pt-8 flex items-center justify-between">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">CREATIVE DOMAIN</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
