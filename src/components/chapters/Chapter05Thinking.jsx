"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = ["PROBLEM", "IDEA", "CODE", "INTERACTION", "RESULT"];

export function Chapter05Thinking() {
  const chapterRef = useRef(null);
  const textWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = chapterRef.current;
    const texts = textWrapperRef.current.children;

    if (!section || texts.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=250%", // Pin for 2.5x viewport height
        pin: true,
        scrub: 1,
      }
    });

    // Create a sequence where each word fades in, scales up, then fades out, replacing the previous one
    steps.forEach((step, i) => {
      if (i > 0) {
        // Fade out previous
        tl.to(texts[i - 1], { opacity: 0, scale: 1.2, duration: 1, filter: "blur(10px)" }, "seq" + i);
      }
      
      // Fade in current
      tl.fromTo(texts[i], 
        { opacity: 0, scale: 0.8, filter: "blur(10px)" }, 
        { opacity: 1, scale: 1, duration: 1, filter: "blur(0px)" }, 
        "seq" + i
      );
      
      // Hold state slightly
      tl.to(texts[i], { scale: 1.05, duration: 0.5 }, "+=0");
    });

    // Fade out the very last one at the end
    tl.to(texts[texts.length - 1], { opacity: 0, scale: 1.2, duration: 1, filter: "blur(10px)" });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section 
      id="chapter-05"
      ref={chapterRef}
      className="relative w-full h-screen bg-bg overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="absolute top-12 left-6 md:left-12 flex items-center gap-4 text-fg/30 z-20 pointer-events-none">
        <span className="font-bebas text-4xl">05</span>
        <div className="h-px w-8 bg-border" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Thinking</span>
      </div>

      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <span className="font-mono text-[9px] text-accent tracking-[0.4em] uppercase mb-12">
          THE PROCESS
        </span>

        {/* Process Visualization Wrapper */}
        <div ref={textWrapperRef} className="relative w-full h-[200px] flex items-center justify-center">
          {steps.map((step, i) => (
            <h2 
              key={step} 
              className="absolute font-bebas text-[clamp(60px,15vw,250px)] leading-none text-fg tracking-tight mix-blend-difference"
              style={{ opacity: i === 0 ? 1 : 0 }} // First one visible initially for SSR, GSAP takes over
            >
              {step}
            </h2>
          ))}
        </div>
        
        {/* Subtle wireframe overlay in background to match "process" aesthetic */}
        <div className="absolute inset-0 pointer-events-none z-[-1] opacity-5 flex items-center justify-center">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
      </div>
    </section>
  );
}
