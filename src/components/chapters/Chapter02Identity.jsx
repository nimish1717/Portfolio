"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/components/ui/PhysicsCursor";

const disciplines = [
  { id: "frontend", label: "FRONTEND", desc: "Crafting interfaces that breathe." },
  { id: "ai-ml", label: "AI / ML", desc: "Building intelligent data systems." },
  { id: "ui-ux", label: "UI / UX", desc: "Designing for human behavior." },
  { id: "creative", label: "CREATIVE DEVELOPMENT", desc: "Blurring the line between art and code." }
];

export function Chapter02Identity() {
  const [activeDiscipline, setActiveDiscipline] = useState(null);
  const chapterRef = useRef(null);
  const titleRef = useRef(null);
  const { setCursorState } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: chapterRef.current,
      start: "top 70%",
      end: "bottom top",
      onEnter: () => gsap.fromTo(titleRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" })
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section 
      id="chapter-02"
      ref={chapterRef}
      className="relative w-full min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center"
    >
      {/* Background Reactive Elements based on hover */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeDiscipline === 'frontend' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeDiscipline === 'ai-ml' ? 'opacity-100' : 'opacity-0'}`}>
           <div className="w-full h-full flex items-center justify-center font-mono text-[8px] tracking-widest text-accent break-all leading-none opacity-30 px-20">
             01001011101010100101100010101010101010110101000010101010101011110010101010100010101010110101
           </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Marker */}
        <div className="mb-24 flex items-center gap-4 text-fg/30">
          <span className="font-bebas text-4xl">02</span>
          <div className="h-px w-8 bg-border" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Identity</span>
        </div>

        {/* Identity Core */}
        <div ref={titleRef} className="flex flex-col md:flex-row gap-12 md:gap-32 items-start md:items-end">
          <h2 className="font-bebas text-[clamp(80px,12vw,220px)] leading-[0.8] tracking-tight">
            NIMISH <br /> AGRAWAL
          </h2>
          
          <div className="flex flex-col gap-6 pb-4">
            {disciplines.map((d) => (
              <div 
                key={d.id}
                className="group relative cursor-none"
                onMouseEnter={() => { setActiveDiscipline(d.id); setCursorState("view"); }}
                onMouseLeave={() => { setActiveDiscipline(null); setCursorState("default"); }}
              >
                <span className={`font-mono text-xs md:text-sm tracking-[0.2em] transition-all duration-300 ${activeDiscipline === d.id ? 'text-accent pl-4' : 'text-fg/50 group-hover:text-fg'}`}>
                  {d.label}
                </span>
                
                {/* Reveal description on hover */}
                <div className={`absolute left-full ml-8 top-1/2 -translate-y-1/2 w-64 pointer-events-none transition-all duration-500 ${activeDiscipline === d.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                   <p className="font-mono text-[10px] text-fg/40 leading-relaxed uppercase hidden md:block">
                     {d.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Subtle statement */}
        <p className="max-w-xl mt-32 font-mono text-[11px] text-fg/40 leading-[2] uppercase tracking-wider text-justify">
          I do not just write code. I architect digital experiences that bridge the gap between complex engineering and human-centered design. Based in India, focused on the global frontier of web technology.
        </p>
      </div>
    </section>
  );
}
