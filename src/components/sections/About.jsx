"use client";

import { motion } from "framer-motion";
import { MapPin, Target, CheckCircle2, GraduationCap } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About Me.
          </h2>
          <div className="w-20 h-1 bg-[var(--accent)] rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-neutral-400 text-lg leading-relaxed"
          >
            <p>
              <strong className="text-white font-medium">
                I don't just write code; I engineer solutions.
              </strong>{" "}
              As a Computer Engineering student at Thapar Institute, my
              fascination lies in the intersection of scalable web architecture
              and intelligent systems.
            </p>
            <p>
              My journey started with building simple interfaces, but it quickly
              evolved into a deep dive into full-stack development and Machine
              Learning. I thrive on deconstructing complex problems, whether
              it's optimizing a React render cycle, designing a robust
              PostgreSQL database, or training a classification model for
              anomaly detection.
            </p>
            <p>
              I believe that the best software is both computationally efficient
              and beautifully designed. An Awwwards-level interface is only as
              good as the reliable, secure, and fast backend that powers it.
            </p>
            <p>
              When I'm not in front of a code editor, you can find me exploring
              new UI/UX trends, participating in hackathons, or continuously
              iterating on side projects.
            </p>
          </motion.div>

          {/* Right: Quick Info & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Visual element / Avatar placeholder */}
            <div className="aspect-video w-full rounded-2xl glass flex items-center justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-muted)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Replace with actual image later */}
              <div className="font-mono text-neutral-600 uppercase tracking-widest text-sm z-10">
                [Creative Illustration / Portrait]
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl glass border-white/5 space-y-2">
                <MapPin className="text-[var(--accent)]" size={24} />
                <h3 className="text-white font-medium">Location</h3>
                <p className="text-sm text-neutral-400">Patiala, India</p>
              </div>
              <div className="p-4 rounded-xl glass border-white/5 space-y-2">
                <Target className="text-[var(--accent)]" size={24} />
                <h3 className="text-white font-medium">Focus</h3>
                <p className="text-sm text-neutral-400">Full Stack & AI/ML</p>
              </div>
              <div className="p-4 rounded-xl glass border-white/5 space-y-2">
                <GraduationCap className="text-[var(--accent)]" size={24} />
                <h3 className="text-white font-medium">Education</h3>
                <p className="text-sm text-neutral-400">Thapar Institute '26</p>
              </div>
              <div className="p-4 rounded-xl glass border-white/5 space-y-2">
                <CheckCircle2 className="text-[var(--accent)]" size={24} />
                <h3 className="text-white font-medium">Availability</h3>
                <p className="text-sm text-neutral-400">
                  Open to Opportunities
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
