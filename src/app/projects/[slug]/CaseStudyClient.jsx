"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";

export default function CaseStudyClient({ project }) {
  const containerRef = useRef(null);
  const { setCursorVariant, setCursorText } = useCursor();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Pinned Image transforms based on narrative sections
  // 0.0 - 0.2: HERO (Scale 1)
  // 0.2 - 0.4: PROBLEM (Grayscale / blur)
  // 0.4 - 0.6: SOLUTION (Scale up, bright)
  // 0.6 - 0.8: FEATURES (Shift left)
  // 0.8 - 1.0: RESULT (Fade out slightly)

  const imageScale = useTransform(smoothProgress, [0, 0.4, 0.6], [1, 0.9, 1.1]);
  const imageFilter = useTransform(
    smoothProgress, 
    [0, 0.2, 0.4, 0.6], 
    ["grayscale(0.5) blur(0px)", "grayscale(1) blur(5px)", "grayscale(0) blur(0px)", "grayscale(0) blur(0px)"]
  );
  const imageX = useTransform(smoothProgress, [0.6, 0.8], ["0%", "-10%"]);
  const imageOpacity = useTransform(smoothProgress, [0.8, 1], [0.5, 0.2]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      
      {/* PINNED BACKGROUND VISUAL */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
         <motion.div 
           className="w-full h-full relative"
           style={{ scale: imageScale, filter: imageFilter, x: imageX, opacity: imageOpacity }}
         >
           <img 
             src={project.screenshots[0] || "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"}
             alt={project.title}
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0F] via-[#0D0D0F]/80 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-transparent to-transparent" />
         </motion.div>
      </div>

      {/* SCROLLING NARRATIVE CONTENT */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
        
        {/* 01 HERO */}
        <div className="h-screen flex items-center px-6 md:px-24 pointer-events-auto">
          <div className="flex flex-col gap-6 max-w-4xl">
            <h1 className="font-bebas text-6xl md:text-9xl tracking-tighter uppercase text-white leading-[0.85]">
              {project.title}
            </h1>
            <p className="font-inter text-lg md:text-2xl text-white/70 font-light max-w-2xl">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {project.techStack.map(t => (
                <span key={t} className="font-mono text-[10px] tracking-widest uppercase border border-white/20 px-4 py-2 rounded-full text-white/50 backdrop-blur-sm bg-black/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 02 CONTEXT & PROBLEM */}
        <div className="h-screen flex items-center px-6 md:px-24 pointer-events-auto">
          <div className="flex flex-col gap-6 max-w-2xl bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-accent">THE PROBLEM</span>
            <p className="font-inter text-lg md:text-xl leading-relaxed text-white/80">
              {project.problemStatement}
            </p>
          </div>
        </div>

        {/* 03 SOLUTION & IMPLEMENTATION */}
        <div className="h-screen flex items-center px-6 md:px-24 pointer-events-auto">
          <div className="flex flex-col gap-12 max-w-3xl bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-xl">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-accent">THE SOLUTION</span>
              <p className="font-inter text-lg md:text-xl leading-relaxed text-white/80">
                {project.solutionOverview}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-white/40">ENGINEERING</span>
                <p className="font-inter text-sm text-white/60 leading-relaxed">
                  {project.engineeringChallenges}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-white/40">DESIGN</span>
                <p className="font-inter text-sm text-white/60 leading-relaxed">
                  {project.designDecisions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 04 FEATURES */}
        <div className="h-screen flex items-center justify-end px-6 md:px-24 pointer-events-auto">
          <div className="flex flex-col gap-8 max-w-2xl bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-accent">KEY FEATURES</span>
            <ul className="flex flex-col gap-6">
              {project.keyFeatures.map((feature, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-[10px] text-accent mt-1.5 opacity-50">0{i+1}</span>
                  <span className="font-inter text-lg text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 05 OUTRO / LINKS */}
        <div className="h-screen flex items-center justify-center text-center px-6 pointer-events-auto">
          <div className="flex flex-col gap-12 items-center">
            <h2 className="font-bebas text-6xl md:text-8xl tracking-tighter uppercase text-white">
              EXPLORE THE WORK
            </h2>
            <div className="flex gap-6">
              {project.githubLink && (
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bebas text-3xl md:text-4xl tracking-widest text-accent hover:text-white transition-colors"
                  onMouseEnter={() => { setCursorVariant("text"); setCursorText("GITHUB"); }}
                  onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
                >
                  SOURCE CODE ↗
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
