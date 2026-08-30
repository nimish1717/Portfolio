"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/components/ui/PhysicsCursor";

export function Chapter06Contact() {
  const chapterRef = useRef(null);
  const orbRef = useRef(null);
  const textRef = useRef(null);
  const { setCursorState } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const section = chapterRef.current;

    // Glowing orb parallax and scale
    gsap.fromTo(orbRef.current, 
      { scale: 0.5, y: 200, opacity: 0 },
      { 
        scale: 1, 
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center center",
          scrub: 1
        }
      }
    );

    // Text reveal
    const lines = textRef.current.children;
    gsap.fromTo(lines,
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section 
      id="chapter-06"
      ref={chapterRef}
      className="relative w-full min-h-screen bg-bg overflow-hidden flex flex-col justify-between pt-32 pb-8 px-6 md:px-12"
    >
      <div className="absolute top-12 left-6 md:left-12 flex items-center gap-4 text-fg/30 z-20 pointer-events-none">
        <span className="font-bebas text-4xl">06</span>
        <div className="h-px w-8 bg-border" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Contact</span>
      </div>

      {/* Massive Glowing Orb (Film end aesthetic) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div 
          ref={orbRef}
          className="w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-accent opacity-20 blur-[100px] md:blur-[150px] mix-blend-screen"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mt-20">
        
        {/* Main CTA */}
        <h2 
          ref={textRef}
          className="font-bebas text-[clamp(50px,8vw,140px)] leading-[0.85] text-fg tracking-tight perspective-[1000px]"
        >
          <div className="overflow-hidden origin-bottom"><div className="transform-style-3d">LET&apos;S</div></div>
          <div className="overflow-hidden origin-bottom"><div className="transform-style-3d">BUILD</div></div>
          <div className="overflow-hidden origin-bottom"><div className="transform-style-3d text-accent">SOMETHING</div></div>
          <div className="overflow-hidden origin-bottom"><div className="transform-style-3d">WORTH</div></div>
          <div className="overflow-hidden origin-bottom"><div className="transform-style-3d">REMEMBERING.</div></div>
        </h2>

        {/* Links */}
        <div className="flex flex-col gap-4 text-right mt-16 md:mt-0">
          <a 
            href="mailto:contact@example.com" 
            className="font-mono text-xs md:text-sm text-fg/60 hover:text-accent uppercase tracking-widest transition-colors cursor-none"
            onMouseEnter={() => setCursorState("view")}
            onMouseLeave={() => setCursorState("default")}
          >
            EMAIL ↗
          </a>
          <a 
            href="#" 
            className="font-mono text-xs md:text-sm text-fg/60 hover:text-accent uppercase tracking-widest transition-colors cursor-none"
            onMouseEnter={() => setCursorState("view")}
            onMouseLeave={() => setCursorState("default")}
          >
            GITHUB ↗
          </a>
          <a 
            href="#" 
            className="font-mono text-xs md:text-sm text-fg/60 hover:text-accent uppercase tracking-widest transition-colors cursor-none"
            onMouseEnter={() => setCursorState("view")}
            onMouseLeave={() => setCursorState("default")}
          >
            LINKEDIN ↗
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-border mt-32 pt-8 flex justify-between items-center font-mono text-[9px] text-fg/30 uppercase tracking-[0.2em]">
        <span>NIMISH AGRAWAL © 2026</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </section>
  );
}
