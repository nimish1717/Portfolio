"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Chapter03About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax elements
  const imgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-32 bg-[#17181B] text-white overflow-hidden">
      
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white" />
         <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white" />
         <div className="absolute top-[20%] left-0 w-full h-[1px] bg-white" />
         <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-white" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Large Statement */}
        <div className="mb-24 md:mb-40 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <span className="font-mono text-xs tracking-widest text-accent uppercase">03 / IDENTITY</span>
            <h2 className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.85] uppercase">
              I BUILD DIGITAL <br/>
              <span className="text-white/40">EXPERIENCES.</span>
            </h2>
          </motion.div>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: Portrait & Timeline */}
          <div className="lg:col-span-5 flex flex-col gap-16 relative">
            
            {/* Portrait */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-black border border-white/10 group">
              <motion.img 
                style={{ y: imgY }}
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Nimish Agrawal"
                className="absolute inset-0 w-full h-[140%] object-cover object-center grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
              {/* Coordinates / Metadata */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest text-white/50 uppercase">
                LAT: 30.3544° N <br/>
                LON: 76.3683° E
              </div>
            </div>

            {/* Personal Timeline */}
            <div className="flex flex-col gap-8 relative">
               <div className="absolute left-1 top-2 bottom-2 w-[1px] bg-white/10" />
               {[
                 { year: "2023", label: "START", desc: "Thapar Institute." },
                 { year: "2024", label: "BUILD", desc: "Full-Stack & AWS." },
                 { year: "2025", label: "EXPLORE", desc: "AI / ML Integration." },
                 { year: "2026", label: "SHIP", desc: "Graduation." }
               ].map((item, i) => (
                 <motion.div 
                   key={item.year}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: i * 0.1 }}
                   className="flex items-start gap-8 pl-8 relative"
                 >
                   <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-bg border border-white/40 -translate-x-1" />
                   <div className="flex flex-col gap-1">
                     <span className="font-bebas text-2xl tracking-widest text-accent">{item.year}</span>
                     <span className="font-mono text-[10px] tracking-widest text-white/80 uppercase">{item.label}</span>
                     <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase mt-1">{item.desc}</span>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* RIGHT: Bio & Bento */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-7 flex flex-col gap-16 lg:pt-24"
          >
            {/* Bio */}
            <div className="flex flex-col gap-6 font-inter text-lg md:text-xl font-light leading-relaxed text-white/70">
              <p>
                I am a software engineer focused on building highly scalable full-stack architectures 
                and crafting premium digital experiences. I believe that engineering is not just about 
                logic—it&apos;s about creating systems that feel alive.
              </p>
              <p>
                Currently pursuing Computer Engineering at Thapar Institute of Engineering & Technology, 
                I divide my time between deep-diving into backend infrastructure, integrating machine 
                learning models, and pushing the boundaries of frontend interaction design.
              </p>
            </div>

            {/* Bento Grid Metadata */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="col-span-2 p-6 border border-white/10 bg-white/[0.02] flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase">EDUCATION</span>
                <h4 className="font-bebas text-3xl tracking-widest uppercase">THAPAR INSTITUTE</h4>
                <p className="font-mono text-xs tracking-widest text-white/50 uppercase">COMPUTER ENGINEERING / 2023 - 2027</p>
              </div>

              <div className="p-6 border border-white/10 bg-white/[0.02] flex flex-col justify-between min-h-[160px]">
                <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">ACHIEVEMENT</span>
                <h4 className="font-bebas text-2xl tracking-widest text-white/90 leading-tight">AMAZON ML<br/>SUMMER SCHOOL</h4>
              </div>

              <div className="p-6 border border-white/10 bg-white/[0.02] flex flex-col justify-between min-h-[160px]">
                <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">ACHIEVEMENT</span>
                <h4 className="font-bebas text-2xl tracking-widest text-white/90 leading-tight">JPMORGAN<br/>CODE FOR GOOD</h4>
              </div>

              <div className="col-span-2 p-6 border border-white/10 bg-white/[0.02] flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">CURRENT FOCUS</span>
                <div className="flex flex-wrap gap-3">
                  {["WEBGL", "GENERATIVE AI", "DISTRIBUTED SYSTEMS", "INTERACTION DESIGN"].map(f => (
                    <span key={f} className="font-mono text-[10px] tracking-widest text-white border border-white/20 px-3 py-1.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
