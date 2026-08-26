"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Magnetic } from "@/components/ui/Magnetic";
import { TechCubeNetwork } from "@/components/ui/TechCubeNetwork";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#050505]">
      
      {/* 3D Network on the right (or full bg on mobile) */}
      <div className="absolute inset-0 md:left-1/2 md:w-1/2 z-0">
        <TechCubeNetwork />
      </div>
      
      {/* Subtle lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6d28d9] rounded-full blur-[150px] opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col md:flex-row items-center">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#a855f7] font-mono text-sm md:text-base tracking-widest mb-4 uppercase">
              // Hello, I'm
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-white leading-tight">
              NIMISH <br className="hidden md:block" />
              AGRAWAL <span className="text-[#a855f7]">//</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-neutral-300 font-medium mb-6">
              Software Engineer <span className="text-neutral-600">|</span> AI/ML Enthusiast <span className="text-neutral-600">|</span> Problem Solver
            </h2>

            <p className="text-neutral-400 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
              I build intelligent systems and scalable applications that solve real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Magnetic>
              <Link
                href="#projects"
                className="group flex items-center justify-center gap-2 bg-[#6d28d9] hover:bg-[#5b21b6] text-white px-8 py-3.5 rounded-sm font-medium transition-colors tracking-wide text-sm"
              >
                <span>EXPLORE MY WORK</span>
              </Link>
            </Magnetic>

            <Magnetic>
              <Link
                href="#resume"
                className="flex items-center justify-center gap-2 text-white px-4 py-3.5 hover:text-[#a855f7] transition-colors tracking-wide text-sm font-medium"
              >
                <span>VIEW RESUME</span>
                <Download size={16} />
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Side Empty for 3D Model Desktop */}
        <div className="hidden md:block w-full md:w-1/2 h-[600px] pointer-events-none">
          {/* Reserved for TechCubeNetwork overlay */}
        </div>

        {/* Vertical Socials (Desktop only) */}
        <div className="hidden lg:flex flex-col gap-6 absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <Magnetic>
            <Link href="https://github.com/nimishagrawal" target="_blank" className="text-neutral-500 hover:text-white transition-colors">
              <FaGithub size={20} />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="https://linkedin.com/in/nimishagrawal" target="_blank" className="text-neutral-500 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </Link>
          </Magnetic>
          <div className="h-12 w-[1px] bg-neutral-800 mx-auto mt-4"></div>
        </div>

      </div>
    </section>
  );
}
