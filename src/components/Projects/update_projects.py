import re

with open('/tmp/ProjectsSection.bak', 'r') as f:
    content = f.read()

# Replace imports
import_from = """import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';"""
import_to = """import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);"""
content = content.replace(import_from, import_to)

# The MockupUI is fine.
# Then ProjectCard and ProjectsSection need to be replaced.
# Let's just find where ProjectCard starts and replace until the end of the file.
start_idx = content.find("const ProjectCard =")
if start_idx != -1:
    new_tail = """export const ProjectsSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = cardsRef.current;
      if (!cards || cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          scrub: 1,
          pin: true,
        }
      });

      // Prepare initial states
      gsap.set(cards, { y: '0%', scale: 1, opacity: 1 });
      cards.forEach((card, i) => {
        if (i !== 0) {
          gsap.set(card, { y: '150vh' });
        }
      });

      // Animate the stack
      cards.forEach((card, i) => {
        if (i === 0) return;

        const previousCards = cards.slice(0, i);
        
        tl.to(previousCards, {
          scale: (index) => 1 - (i - index) * 0.05,
          y: (index) => `-${(i - index) * 3}vh`, 
          opacity: (index) => 1 - (i - index) * 0.1,
          ease: 'none',
        }, 'start' + i);

        tl.to(card, {
          y: '0vh',
          ease: 'none',
        }, 'start' + i);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" className="relative w-full bg-[#030305] text-[#EDEAE4] font-sans selection:bg-[#46B7FF] selection:text-black">
      
      {/* 
        ========================================
        DESKTOP EXPERIENCE (Vertical Stacking Scroll)
        ========================================
      */}
      <div ref={containerRef} className="hidden md:block relative h-screen w-full overflow-hidden">
        
        <div className="absolute inset-0 w-full h-full flex flex-col justify-center bg-[#030305] bg-[url('/grid.svg')] bg-[length:50px_50px] bg-center relative">
          <div className="absolute inset-0 bg-[#030305]/95 z-0" />
          
          {/* Top Left Header */}
          <div className="absolute top-12 left-12 lg:left-16 xl:left-24 z-50 pointer-events-none">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#46B7FF] block mb-4">
              04 / PROJECTS
            </span>
            <div className="flex items-start space-x-12">
              <h2 className="text-6xl xl:text-7xl tracking-tight uppercase leading-[0.85]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <span className="block text-[#EDEAE4]">SELECTED</span>
                <span className="block text-[#46B7FF]">WORK.</span>
              </h2>
              <p className="text-[10px] font-mono text-gray-400 mt-2 tracking-widest uppercase max-w-[200px] leading-relaxed hidden xl:block">
                A few things I've built —<br/>turning ideas into real,<br/>working products.
              </p>
            </div>
          </div>

          {/* Top Right Scroll Indicator */}
          <div className="absolute top-16 right-12 lg:right-16 xl:right-24 z-50 pointer-events-none flex items-center space-x-4">
            <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">SCROLL TO EXPLORE</span>
          </div>

          {/* Bottom Left Branding */}
          <div className="absolute bottom-12 left-12 lg:left-16 xl:left-24 z-50 pointer-events-none">
            <div className="text-white text-xs font-bold tracking-widest uppercase mb-1 font-mono">NIMISH AGRAWAL</div>
            <div className="text-gray-500 font-mono text-[9px] tracking-widest uppercase">SOFTWARE ENGINEER · CREATIVE DEVELOPER</div>
          </div>

          {/* Stacking Cards Container */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pt-10">
            {ENRICHED_PROJECTS.map((project, i) => (
              <div 
                key={project.id} 
                ref={(el) => (cardsRef.current[i] = el)}
                className="absolute w-[85vw] lg:w-[70vw] max-w-[1200px] h-[75vh] max-h-[750px] shadow-2xl origin-top"
                style={{ zIndex: i }}
              >
                {/* Card Design */}
                <div className="w-full h-full flex p-6 lg:p-10 bg-[#060608]/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden relative group">
                  {/* Number watermark inside card */}
                  <div className="absolute -top-10 -left-10 text-[15rem] font-bebas text-white/[0.02] pointer-events-none z-0 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Left: Text Content (40%) */}
                  <div className="w-full lg:w-[40%] pr-0 lg:pr-10 flex flex-col justify-center relative z-10">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-6">
                       <span className="font-mono text-xs text-gray-500 tracking-widest">{String(i + 1).padStart(2, '0')} / 05</span>
                    </div>
                    
                    <h3 className="text-5xl lg:text-6xl xl:text-7xl font-bebas text-white mb-2 tracking-wide uppercase">{project.name}</h3>
                    <p className="font-mono text-[9px] lg:text-[10px] tracking-[0.2em] text-[#46B7FF] uppercase mb-6 lg:mb-8">{project.category}</p>
                    
                    <p className="text-gray-400 font-montserrat font-light text-xs lg:text-sm leading-relaxed mb-8 max-w-sm">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 lg:mb-12">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1.5 text-[8px] lg:text-[9px] font-mono border border-white/10 text-gray-400 rounded bg-[#0A0A0F]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 mt-auto lg:mt-0">
                       <button 
                         className="bg-[#46B7FF] hover:bg-white text-black transition-colors px-6 py-3.5 rounded text-[10px] font-bold tracking-widest flex items-center space-x-2 group/btn" 
                         onClick={() => window.open(project.link, '_blank')}
                       >
                          <span>VIEW PROJECT</span>
                          <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                       </button>
                       <button 
                         className="border border-white/20 hover:border-white text-white transition-colors px-6 py-3.5 rounded text-[10px] font-bold tracking-widest flex items-center space-x-2 group/btn2 hidden sm:flex" 
                         onClick={() => window.open(project.link, '_blank')}
                       >
                          <span>GITHUB</span>
                          <ArrowUpRight size={14} className="group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-0.5 transition-transform" />
                       </button>
                    </div>
                  </div>

                  {/* Right: Image Preview (60%) */}
                  <div className="hidden lg:flex w-[60%] h-full relative rounded-xl overflow-hidden bg-[#0A0A0E] border border-white/5 items-center justify-center relative z-10 group-hover:shadow-[0_0_30px_rgba(70,183,255,0.08)] transition-all duration-700">
                     <div className="w-full h-full relative origin-center group-hover:scale-105 transition-transform duration-700">
                        <MockupUI id={project.id} />
                     </div>
                     {/* Subtle overlay to blend edges */}
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(6,6,8,0.5)_100%)] pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* 
        ========================================
        MOBILE EXPERIENCE (Vertical Sequence)
        ========================================
      */}
      <div className="md:hidden flex flex-col px-6 pt-32 pb-24 bg-[#030305]">
        
        {/* Mobile Header */}
        <div className="mb-20">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#46B7FF] block mb-4">
            04 / PROJECTS
          </span>
          <h2 className="text-6xl tracking-tight uppercase leading-[0.85]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <span className="block text-[#EDEAE4]">SELECTED</span>
            <span className="block text-[#46B7FF]">WORK.</span>
          </h2>
          <p className="text-[10px] font-mono text-gray-500 mt-6 tracking-widest uppercase leading-relaxed">
            A few things I've built —<br/>turning ideas into real,<br/>working products.
          </p>
        </div>

        {/* Mobile Projects */}
        <div className="flex flex-col space-y-16">
          {ENRICHED_PROJECTS.map((project, i) => (
            <div key={project.id} className="flex flex-col border border-white/10 rounded-2xl bg-[#060608] p-6 overflow-hidden relative">
               <div className="flex items-center space-x-4 mb-4">
                 <span className="font-mono text-xs text-gray-500 tracking-widest">{String(i + 1).padStart(2, '0')} / 05</span>
               </div>
               
               <h3 className="text-4xl font-bebas text-white mb-2 tracking-wider uppercase">{project.name}</h3>
               <p className="font-mono text-[9px] tracking-[0.2em] text-[#46B7FF] uppercase mb-6">{project.category}</p>
               
               <div className="w-full h-48 bg-[#0A0A0E] border border-white/5 rounded-xl mb-6 relative overflow-hidden">
                  <MockupUI id={project.id} />
               </div>

               <p className="text-gray-400 font-montserrat font-light text-xs leading-relaxed mb-6">
                 {project.description}
               </p>

               <div className="flex flex-wrap gap-2 mb-8">
                 {project.tech.map(t => (
                   <span key={t} className="px-2 py-1 text-[8px] font-mono border border-white/10 text-gray-400 rounded bg-[#0A0A0F]">
                     {t}
                   </span>
                 ))}
               </div>

               <button 
                 className="w-full bg-[#46B7FF] text-black py-4 rounded text-[10px] font-bold tracking-widest flex items-center justify-center space-x-2" 
                 onClick={() => window.open(project.link, '_blank')}
               >
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight size={14} />
               </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
"""
    content = content[:start_idx] + new_tail
    
    with open('/Users/nimishagrawal/Desktop/coding/fullstack/Projects/Porfolio/src/components/Projects/ProjectsSection.jsx', 'w') as f:
        f.write(content)
        
