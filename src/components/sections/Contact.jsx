"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-32 relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Abstract background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="p-12 md:p-20 rounded-3xl glass border-[var(--accent-muted)] shadow-[0_0_50px_rgba(0,240,255,0.05)]"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Let's build
            <br />
            something together.
          </h2>

          <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto font-light">
            Whether you have an ambitious project, a complex problem to solve,
            or just want to connect—my inbox is always open.
          </p>

          <a
            href="mailto:contact@nimishagrawal.com"
            className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 mb-12"
          >
            <span className="relative z-10">Say Hello</span>
            <ArrowRight
              size={24}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
            <div className="absolute inset-0 bg-[var(--accent)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Magnetic>
              <Link
                href="https://github.com/nimishagrawal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
              >
                <FaGithub size={20} />
                <span className="font-mono text-sm">GitHub</span>
              </Link>
            </Magnetic>

            <span className="text-white/20 hidden md:inline">/</span>

            <Magnetic>
              <Link
                href="https://linkedin.com/in/nimishagrawal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
                <span className="font-mono text-sm">LinkedIn</span>
              </Link>
            </Magnetic>

            <span className="text-white/20 hidden md:inline">/</span>

            <Magnetic>
              <Link
                href="#resume"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
              >
                <FileText size={20} />
                <span className="font-mono text-sm">Resume</span>
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
