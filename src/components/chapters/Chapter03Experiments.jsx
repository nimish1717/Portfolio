"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/components/ui/PhysicsCursor";

const tech = [
  "React", "Next.js", "GSAP", "Three.js", "WebGL", "TypeScript", 
  "Tailwind", "Framer Motion", "Node.js", "Python", "MongoDB", "C++"
];

export function Chapter03Experiments() {
  const chapterRef = useRef(null);
  const containerRef = useRef(null);
  const { setCursorState } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = containerRef.current.children;
    
    // Set random initial positions
    gsap.set(items, {
      x: () => Math.random() * 400 - 200,
      y: () => Math.random() * 200 - 100,
      opacity: 0,
      scale: 0.5
    });

    // Animate in on scroll
    ScrollTrigger.create({
      trigger: chapterRef.current,
      start: "top 60%",
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: "expo.out",
        });
      }
    });
    
    // Parallax floating effect on scroll
    gsap.to(items, {
      y: (i) => (i % 2 === 0 ? -100 : 100),
      x: (i) => (i % 3 === 0 ? 50 : -50),
      ease: "none",
      scrollTrigger: {
        trigger: chapterRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section 
      id="chapter-03"
      ref={chapterRef}
      className="relative w-full min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute top-32 left-6 md:left-12 flex items-center gap-4 text-fg/30 z-10 pointer-events-none">
        <span className="font-bebas text-4xl">03</span>
        <div className="h-px w-8 bg-border" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Experiments</span>
      </div>

      <div className="relative z-10 text-center pointer-events-none mix-blend-difference mb-12">
        <h2 className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase mb-4">
          WHAT I PLAY WITH
        </h2>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-24 px-6 z-20"
      >
        {tech.map((t, i) => (
          <div 
            key={i}
            className="font-bebas text-[clamp(40px,6vw,100px)] leading-none text-fg/20 hover:text-accent transition-colors duration-500 cursor-none select-none mix-blend-difference"
            onMouseEnter={(e) => {
              setCursorState("view");
              gsap.to(e.target, { scale: 1.2, duration: 0.4, ease: "back.out(2)" });
            }}
            onMouseLeave={(e) => {
              setCursorState("default");
              gsap.to(e.target, { scale: 1, duration: 0.4, ease: "power2.out" });
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
