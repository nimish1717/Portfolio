"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FluidSculpture } from "@/components/webgl/FluidSculpture";
import { SplitText } from "@/components/ui/SplitText"; // We need to build this utility

export function Chapter01Entry() {
  const chapterRef = useRef(null);
  const textRef = useRef(null);
  const metadataRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      metadataRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: chapterRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(textRef.current, { y: 200, opacity: 0, scale: 0.9, ease: "none" }),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      id="chapter-01" 
      ref={chapterRef}
      className="relative w-full h-screen flex flex-col justify-between pt-8 pb-16 px-6 md:px-12 overflow-hidden"
    >
      <FluidSculpture />

      {/* Header Metadata */}
      <div 
        ref={metadataRef}
        className="relative z-10 flex justify-between items-start w-full font-mono text-[9px] md:text-[11px] uppercase tracking-widest text-fg/40"
      >
        <div className="flex flex-col gap-1">
          <span className="text-fg flex items-center gap-2">
            NIMISH <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          </span>
          <span>AGRAWAL</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span>PORTFOLIO / 2026</span>
          <span>CREATIVE DEVELOPMENT</span>
        </div>
      </div>

      {/* Massive Typography */}
      <div className="relative z-10 pointer-events-none mb-10 md:mb-20 mix-blend-difference">
        <h1 
          ref={textRef}
          className="font-bebas text-[clamp(60px,11vw,200px)] leading-[0.8] text-fg w-full max-w-7xl mx-auto"
        >
          <div className="overflow-hidden">
            <span className="block transform transition-transform">I BUILD</span>
          </div>
          <div className="overflow-hidden">
            <span className="block transform transition-transform">DIGITAL</span>
          </div>
          <div className="overflow-hidden flex items-end gap-6 md:gap-12">
            <span className="block transform transition-transform">EXPERIENCES</span>
            
            {/* Scroll Indicator */}
            <div className="hidden md:flex flex-col gap-2 pb-4 mb-2">
              <div className="w-[1px] h-12 bg-fg/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-accent origin-top animate-scroll-line" />
              </div>
              <span className="font-mono text-[8px] text-fg/40 tracking-widest uppercase writing-vertical-rl">
                SCROLL
              </span>
            </div>
          </div>
        </h1>

        <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-[10px] md:text-xs text-fg/50 tracking-wider">
          <p className="max-w-xs leading-relaxed uppercase">
            Computer Engineering student crafting immersive web experiences with code, motion, and design.
          </p>
          <button className="mt-8 md:mt-0 text-accent border border-accent/20 px-6 py-3 hover:bg-accent hover:text-black transition-colors duration-300 pointer-events-auto cursor-none">
            EXPLORE WORK →
          </button>
        </div>
      </div>
    </section>
  );
}
