"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { SkillsOrbital } from "@/components/ui/SkillsOrbital";

export function Skills() {
  return (
    <section id="skills" className="py-32 relative bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col xl:flex-row items-center gap-12">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full xl:w-1/3 flex flex-col items-start z-20"
        >
          <p className="text-[#a855f7] font-mono text-xs tracking-widest uppercase mb-4">
            Skills
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight text-white">
            Technologies <br />
            <span className="text-[#a855f7]">I work</span> with.
          </h2>
          
          <Magnetic>
            <Link
              href="#projects"
              className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-mono text-sm tracking-widest uppercase"
            >
              <span>Explore All Skills</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </Magnetic>
        </motion.div>

        {/* Right: Orbital Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full xl:w-2/3 relative"
        >
          <SkillsOrbital />
        </motion.div>

      </div>
    </section>
  );
}
