"use client";

import { motion } from "framer-motion";
import { exploringSkills } from "@/data/skills";
import { projects } from "@/data/projects";

export function Chapter08Now() {
  
  // Real data mapped to now state
  const building = projects[0]?.title || "Full-Stack Applications"; // e.g. PhantomPost
  const learning = exploringSkills[1] || "Generative AI Integration";
  const exploring = exploringSkills[0] || "WebGL";

  return (
    <section id="now" className="relative w-full min-h-screen bg-bg text-fg py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col h-full justify-center">
        
        <div className="flex justify-between items-end mb-24 md:mb-32">
          <h2 className="font-bebas text-4xl md:text-6xl tracking-wider uppercase text-fg/80">NOW</h2>
          <span className="font-mono text-xs text-fg/40 tracking-widest uppercase">08 / STATUS</span>
        </div>

        {/* Status Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* BUILDING */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 p-8 md:p-12 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
               <span className="font-mono text-xs tracking-widest uppercase text-fg/60">BUILDING</span>
            </div>
            <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wide uppercase">
              {building}
            </h3>
            <p className="font-mono text-xs text-fg/40 uppercase tracking-widest mt-auto">ACTIVE PROJECT</p>
          </motion.div>

          {/* LEARNING */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6 p-8 md:p-12 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
               <span className="font-mono text-xs tracking-widest uppercase text-fg/60">LEARNING</span>
            </div>
            <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wide uppercase">
              {learning}
            </h3>
            <p className="font-mono text-xs text-fg/40 uppercase tracking-widest mt-auto">SKILL ACQUISITION</p>
          </motion.div>

          {/* EXPLORING */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 p-8 md:p-12 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
               <span className="font-mono text-xs tracking-widest uppercase text-fg/60">EXPLORING</span>
            </div>
            <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wide uppercase">
              {exploring}
            </h3>
            <p className="font-mono text-xs text-fg/40 uppercase tracking-widest mt-auto">CREATIVE RESEARCH</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
