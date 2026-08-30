"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { journeyData } from "@/data/journey";

export function Chapter06Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const timelineHeight = useTransform(smoothProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="experience" className="relative w-full min-h-[200vh] bg-bg py-32 text-fg">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-32 md:mb-48 sticky top-32 z-20 mix-blend-difference pointer-events-none">
          <h2 className="font-bebas text-5xl md:text-7xl lg:text-9xl tracking-wider uppercase text-white">EXPERIENCE</h2>
          <span className="font-mono text-xs text-white/40 tracking-widest uppercase">06 / JOURNEY</span>
        </div>

        {/* Timeline Container */}
        <div className="relative flex flex-col gap-32 md:gap-64 pb-32">
          
          {/* Traveling Indicator Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-accent"
              style={{ height: timelineHeight }}
            />
          </div>

          {/* Timeline Events */}
          {journeyData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isEducation = item.title.includes("Thapar");
            const isAmazon = item.title.includes("Amazon");
            const isJPMorgan = item.title.includes("JPMorgan");

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-200px", once: false }}
                transition={{ duration: 0.5 }}
                className={`relative w-full flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center pl-16 md:pl-0`}
              >
                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-bg border-2 border-white/20 -translate-x-1/2 z-10 transition-colors duration-500 hover:border-accent" />
                
                {/* Content Area */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-24 lg:pr-32 text-left' : 'md:pl-24 lg:pl-32 text-left'}`}>
                  
                  {/* Huge Year Typography */}
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    whileInView={{ scale: 1, y: 0 }}
                    viewport={{ margin: "-100px" }}
                    className="font-bebas text-7xl md:text-9xl tracking-tighter text-white/5 select-none -ml-2"
                  >
                    {item.year.split(" ")[0]}
                  </motion.div>
                  
                  {/* Event Details */}
                  <div className="-mt-6 md:-mt-12 relative z-20 flex flex-col gap-4 bg-bg py-4">
                    <span className="font-mono text-xs text-accent tracking-widest uppercase">{item.year}</span>
                    <h3 className="font-bebas text-3xl md:text-5xl tracking-wide uppercase text-fg/90">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-fg/60 leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>

                  {/* Special Visual Treatments for specific events */}
                  {isEducation && (
                    <div className="mt-8 p-6 border border-white/10 bg-white/[0.02] inline-block">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-fg/40 block mb-2">INSTITUTION</span>
                      <span className="font-bebas text-2xl tracking-widest uppercase text-fg/80">THAPAR INSTITUTE OF ENGINEERING & TECHNOLOGY</span>
                    </div>
                  )}

                  {isAmazon && (
                    <div className="mt-8 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center font-bebas text-2xl text-accent">
                        ML
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-fg/40">SELECTION</span>
                        <span className="font-mono text-xs tracking-widest uppercase text-fg/80">SUMMER SCHOOL COHORT</span>
                      </div>
                    </div>
                  )}
                  
                  {isJPMorgan && (
                    <div className="mt-8 p-4 bg-white/5 border-l-2 border-accent">
                      <span className="font-mono text-xs tracking-widest uppercase text-fg/80 block">CODE FOR GOOD 24-HOUR HACKATHON</span>
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
