"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/components/ui/CursorContext";

export function About() {
  const { cursorChangeHandler } = useCursor();

  return (
    <section id="about" className="py-32 relative bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 relative flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
            {/* Soft Purple Glow Behind Image */}
            <div className="absolute inset-0 bg-[#6d28d9] mix-blend-screen opacity-20 blur-3xl"></div>
            {/* Placeholder for Profile Image */}
            <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-sm">
              [ PROFILE_IMAGE_PLACEHOLDER ]
            </div>
          </div>
        </motion.div>

        {/* Right: Content & Info Grid */}
        <div className="w-full md:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-[#a855f7] font-mono text-xs tracking-widest uppercase mb-4">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              I turn ideas into <br />
              <span className="text-[#a855f7]">impact</span> through code.
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-6">
              I'm a Computer Engineering student at Thapar Institute of Engineering & Technology with a strong interest in building AI-powered solutions and full-stack applications.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              I love solving complex problems, optimizing systems, and continuously learning new technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="p-4 rounded-xl glass border border-white/5 bg-white/5">
              <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider block mb-1">Location</span>
              <span className="text-neutral-200 text-sm font-medium">Punjab, India</span>
            </div>
            <div className="p-4 rounded-xl glass border border-white/5 bg-white/5">
              <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider block mb-1">Social</span>
              <div className="flex flex-col text-neutral-200 text-sm font-medium">
                <a href="#" className="hover:text-[#a855f7] transition-colors">@nimishagrawal</a>
              </div>
            </div>
            <div className="p-4 rounded-xl glass border border-white/5 bg-white/5">
              <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider block mb-1">Focus</span>
              <span className="text-neutral-200 text-sm font-medium">Software Development & AI/ML</span>
            </div>
            <div className="p-4 rounded-xl glass border border-white/5 bg-white/5">
              <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider block mb-1">Availability</span>
              <span className="text-neutral-200 text-sm font-medium">Open to internships and opportunities</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
