"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";
import { achievementsData } from "@/data/achievements";
import { skillsData } from "@/data/skills";
import { projects } from "@/data/projects";

export function Chapter03About() {
  const { setCursorVariant, setCursorText } = useCursor();

  return (
    <section id="about" className="relative w-full min-h-screen bg-bg text-fg py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-24">
          <h2 className="font-bebas text-4xl md:text-6xl tracking-wider uppercase text-fg/80">ABOUT</h2>
          <span className="font-mono text-xs text-fg/40 tracking-widest uppercase">03 / IDENTITY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT: Large Statement & Visual */}
          <div className="lg:col-span-5 flex flex-col gap-16">
            <motion.h3 
              className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.85] tracking-tight text-fg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              I BUILD DIGITAL EXPERIENCES THAT BRIDGE THE GAP BETWEEN <span className="text-accent">ENGINEERING</span> AND <span className="text-accent">AESTHETICS</span>.
            </motion.h3>

            {/* Quiet / Editorial Avatar */}
            <motion.div 
              className="relative w-full aspect-[3/4] overflow-hidden grayscale contrast-125 brightness-75 bg-fg/5"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              onMouseEnter={() => {
                setCursorVariant("text");
                setCursorText("QUIET");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
            >
              <img 
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" 
                alt="Nimish Editorial Portrait"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
              <div className="absolute inset-0 border border-white/10" />
            </motion.div>
          </div>

          {/* RIGHT: Real Information & Data Rail */}
          <div className="lg:col-span-7 flex flex-col gap-24 pt-4 lg:pt-12">
            
            {/* Narrative Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="font-mono text-xs text-accent tracking-widest uppercase">WHO I AM</h4>
                <p className="text-sm md:text-base text-fg/70 leading-relaxed">
                  I am a Computer Engineering student at Thapar Institute of Engineering & Technology, focusing on frontend development, AI/ML, and building interactive digital products.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="font-mono text-xs text-accent tracking-widest uppercase">WHAT I BUILD</h4>
                <p className="text-sm md:text-base text-fg/70 leading-relaxed">
                  I develop full-stack platforms like PhantomPost and Restaurant Management Systems, while exploring the intersection of interfaces and machine learning through ML Fraud Detection projects.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h4 className="font-mono text-xs text-accent tracking-widest uppercase">WHAT I CARE ABOUT</h4>
                <p className="text-sm md:text-base text-fg/70 leading-relaxed">
                  I care deeply about interaction design, responsive layouts, and cinematic digital experiences. I believe software should not only function flawlessly but feel premium and intentional.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h4 className="font-mono text-xs text-accent tracking-widest uppercase">HOW I WORK</h4>
                <p className="text-sm md:text-base text-fg/70 leading-relaxed">
                  I thrive in high-paced environments, continuously learning and experimenting. Whether competing in hackathons or studying at Amazon ML Summer School, I push myself to build better systems.
                </p>
              </motion.div>
            </div>

            {/* Bento Information Moment (Data Rail) */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="p-6 border border-white/5 bg-white/[0.02] flex flex-col gap-2 hover:bg-white/[0.04] transition-colors">
                <span className="font-mono text-[10px] text-fg/40 tracking-widest uppercase">EDUCATION</span>
                <span className="font-bebas text-xl md:text-2xl tracking-wide text-fg/90">THAPAR INST.</span>
                <span className="text-xs text-fg/60">2023 — 2027</span>
              </div>
              
              <div className="p-6 border border-white/5 bg-white/[0.02] flex flex-col gap-2 hover:bg-white/[0.04] transition-colors">
                <span className="font-mono text-[10px] text-fg/40 tracking-widest uppercase">PROJECTS</span>
                <span className="font-bebas text-xl md:text-2xl tracking-wide text-fg/90">{projects.length} MAJOR</span>
                <span className="text-xs text-fg/60">Full-Stack & ML</span>
              </div>

              <div className="p-6 border border-white/5 bg-white/[0.02] flex flex-col gap-2 hover:bg-white/[0.04] transition-colors">
                <span className="font-mono text-[10px] text-fg/40 tracking-widest uppercase">ACHIEVEMENTS</span>
                <span className="font-bebas text-xl md:text-2xl tracking-wide text-fg/90">AMAZON ML</span>
                <span className="text-xs text-fg/60">Summer School</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
