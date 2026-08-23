"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, FileText, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Data Flow Visualization */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[var(--accent)] opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-start pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-[var(--accent-muted)] mb-6 text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-neutral-300 font-mono text-xs">
            Computer Engineering @ Thapar Institute
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 text-gradient uppercase"
        >
          Nimish
          <br />
          Agrawal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-neutral-400 max-w-2xl mb-8 font-light"
        >
          I build scalable web applications, intelligent systems, and digital
          experiences that solve real problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="#projects"
            className="group relative inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10">View Projects</span>
            <ChevronRight
              size={18}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
            <div className="absolute inset-0 bg-[var(--accent)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
          </Link>

          <Link
            href="#resume"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-colors"
          >
            <FileText size={18} />
            <span>Resume</span>
          </Link>

          <div className="flex items-center gap-2 ml-2">
            <Link
              href="https://github.com/nimishagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors hover:text-white text-neutral-400"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href="https://linkedin.com/in/nimishagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors hover:text-white text-neutral-400"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500"
      >
        <span className="text-xs font-mono uppercase tracking-widest">
          Scroll to explore
        </span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
