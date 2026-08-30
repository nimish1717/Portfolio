"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useCursor } from "@/components/ui/PhysicsCursor";

export function Chapter04Work() {
  const chapterRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const panelsRef = useRef([]);
  const { setCursorState } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = chapterRef.current;
    const wrapper = scrollWrapperRef.current;
    const panels = panelsRef.current;

    if (!section || !wrapper || panels.length === 0) return;

    // We want the total horizontal scroll width to be (number of panels) * 100vw.
    const amountToScroll = (panels.length - 1) * window.innerWidth;

    gsap.to(wrapper, {
      x: -amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1, // Smooth scrub
        start: "top top",
        end: `+=${amountToScroll}`, // Pin for the exact length of the horizontal scroll
        invalidateOnRefresh: true,
      },
    });

    // Parallax on images within panels
    panels.forEach((panel) => {
      const img = panel.querySelector(".project-image");
      if (img) {
        gsap.fromTo(img, 
          { x: -50, scale: 1.1 },
          { 
            x: 50, 
            scale: 1, 
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById(wrapper.id), // Link to horizontal scroll
              start: "left right",
              end: "right left",
              scrub: true,
            }
          }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section 
      id="chapter-04"
      ref={chapterRef}
      className="relative w-full h-screen bg-bg overflow-hidden flex flex-col justify-center"
    >
      {/* Chapter Marker - Fixed during pin */}
      <div className="absolute top-12 left-6 md:left-12 flex items-center gap-4 text-fg/30 z-20 pointer-events-none mix-blend-difference">
        <span className="font-bebas text-4xl">04</span>
        <div className="h-px w-8 bg-border" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Work</span>
      </div>

      <div 
        ref={scrollWrapperRef}
        id="work-wrapper" // Used for containerAnimation targeting
        className="flex h-full w-max z-10"
      >
        {projects.map((project, i) => (
          <div 
            key={project.slug} 
            ref={el => panelsRef.current[i] = el}
            className="w-screen h-screen flex items-center justify-center relative shrink-0 px-6 md:px-24"
          >
            <div className="w-full max-w-7xl mx-auto h-[70vh] flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              
              {/* Text Info */}
              <div className="w-full md:w-1/3 flex flex-col z-10">
                <span className="font-mono text-[10px] text-accent tracking-[0.3em] mb-4">
                  {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                
                <h3 className="font-bebas text-[clamp(60px,8vw,140px)] leading-[0.8] text-fg tracking-tight mb-8">
                  {project.title}
                </h3>
                
                <div className="flex flex-col gap-2 border-l border-border pl-6">
                  {project.techStack.slice(0,4).map(tech => (
                    <span key={tech} className="font-mono text-[10px] text-fg/40 uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Massive Image Container */}
              <Link 
                href={`/projects/${project.slug}`}
                className="w-full md:w-2/3 h-full relative overflow-hidden group cursor-none"
                onMouseEnter={() => setCursorState("open")}
                onMouseLeave={() => setCursorState("default")}
              >
                {/* Simulated Image (Parallax applied to this via class) */}
                <div className="project-image absolute inset-0 w-[120%] h-full bg-border/20 -left-[10%]">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 mix-blend-overlay opacity-50 group-hover:opacity-10 transition-opacity duration-700" />
                   {/* We don't have real images yet, using a stylized placeholder */}
                   <div className="w-full h-full flex items-center justify-center font-mono text-xs text-fg/20 uppercase tracking-[0.4em] bg-neutral-900 border border-white/5">
                     [ {project.title} Visual ]
                   </div>
                </div>
                
                {/* Hover Distortion/Reveal */}
                <div className="absolute inset-0 bg-accent mix-blend-color z-20 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              </Link>

            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll Progress line at the bottom */}
      <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 h-px bg-border z-20 pointer-events-none">
        <div className="h-full bg-accent origin-left transition-transform duration-75" />
      </div>
    </section>
  );
}
