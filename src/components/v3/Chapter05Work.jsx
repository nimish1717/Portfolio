"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { useCursor } from "@/components/v3/ui/CustomCursor";
import Link from "next/link";

const ANIMATION_TYPES = [
  "clip-path", "scale-parallax", "mask-reveal", "displacement", "split-image"
];

function ProjectCard({ project, index, total }) {
  const containerRef = useRef(null);
  const { setCursorVariant, setCursorText } = useCursor();
  
  // Track scroll specifically for this card to shrink it when the next one scrolls over
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -10]);

  const animationType = ANIMATION_TYPES[index % ANIMATION_TYPES.length];

  return (
    <motion.div 
      ref={containerRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center p-6 md:p-12 overflow-hidden bg-[#0D0D0F] border-t border-white/5"
      style={{ zIndex: index, scale, opacity, y: yOffset, rotateX, transformPerspective: 1000, transformOrigin: "top" }}
    >
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-between relative">
        
        {/* TOP */}
        <div className="flex justify-between items-start z-20 mix-blend-difference overflow-hidden">
           <motion.h3 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-10%" }}
             variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
             className="font-bebas text-4xl md:text-6xl tracking-wider text-white uppercase max-w-lg flex flex-wrap gap-x-2"
           >
             {project.title.split(" ").map((word, i) => (
               <span key={i} className="overflow-hidden inline-block">
                 <motion.span 
                   variants={{ hidden: { y: "100%" }, visible: { y: "0%", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                   className="inline-block"
                 >
                   {word}
                 </motion.span>
               </span>
             ))}
           </motion.h3>
           <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
             0{index + 1} / 0{total}
           </span>
        </div>

        {/* CENTER: HUGE VISUAL */}
        <div 
          className="absolute inset-0 flex items-center justify-center p-12 md:p-32 z-10 pointer-events-none"
        >
           <motion.div 
             className="w-full h-full relative overflow-hidden"
             initial={
               animationType === "clip-path" ? { clipPath: "inset(100% 0 0 0)" } :
               animationType === "mask-reveal" ? { opacity: 0, y: 100 } :
               { scale: 0.8, opacity: 0 }
             }
             whileInView={
               animationType === "clip-path" ? { clipPath: "inset(0% 0 0 0)" } :
               animationType === "mask-reveal" ? { opacity: 1, y: 0 } :
               { scale: 1, opacity: 1 }
             }
             viewport={{ once: true, margin: "-20%" }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           >
             <img 
               src={project.screenshots[0] || "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"}
               alt={project.title}
               className="w-full h-full object-cover grayscale opacity-70"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-transparent to-transparent opacity-80" />
           </motion.div>
        </div>

        {/* SIDE METADATA (Desktop) */}
        <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-8 z-20 w-48 text-right mix-blend-difference text-white">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] tracking-widest uppercase opacity-40">YEAR</span>
            <span className="font-mono text-xs tracking-widest uppercase">2024</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] tracking-widest uppercase opacity-40">CATEGORY</span>
            <span className="font-mono text-xs tracking-widest uppercase">{project.category || "FULL STACK"}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] tracking-widest uppercase opacity-40">STACK</span>
            <div className="flex flex-col gap-1">
              {project.techStack.slice(0,4).map(t => (
                <span key={t} className="font-mono text-xs tracking-widest uppercase">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-end z-20 gap-8">
           <p className="font-inter font-light text-sm md:text-base text-white/60 max-w-md mix-blend-difference">
             {project.tagline}
           </p>
           
           <div className="flex gap-4">
              <Link 
                href={`/projects/${project.slug}`}
                className="font-bebas text-3xl tracking-widest uppercase text-accent hover:text-white transition-colors"
                onMouseEnter={() => {
                  setCursorVariant("text");
                  setCursorText("CASE STUDY");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
              >
                CASE STUDY →
              </Link>
           </div>
        </div>

      </div>
    </motion.div>
  );
}

export function Chapter05Work() {
  return (
    <section id="work" className="relative w-full bg-[#0D0D0F] text-[#F1EFEA]">
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.slug || index} 
          project={project} 
          index={index} 
          total={projects.length} 
        />
      ))}
    </section>
  );
}
