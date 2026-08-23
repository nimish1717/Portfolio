"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { journeyData } from "@/data/journey";

export function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="py-32 relative" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The Journey.
          </h2>
          <div className="w-20 h-1 bg-[var(--accent)] rounded-full mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 md:hidden"></div>

          {/* Animated Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-[var(--accent)] -translate-x-1/2 hidden md:block origin-top shadow-[0_0_10px_var(--accent)]"
          />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-0.5 bg-[var(--accent)] -translate-x-1/2 md:hidden origin-top shadow-[0_0_10px_var(--accent)]"
          />

          <div className="space-y-16">
            {journeyData.map((node, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="relative flex items-center md:justify-between flex-col md:flex-row gap-8 md:gap-0"
                >
                  {/* Node Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-black -translate-x-1/2 z-10 shadow-[0_0_10px_var(--accent)]"
                  />

                  {/* Desktop Layout - Alternating */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`hidden md:block w-[45%] ${isEven ? "text-right pr-8" : "text-left pl-8 ml-auto"}`}
                  >
                    <span className="text-sm font-mono text-[var(--accent)] mb-2 inline-block">
                      {node.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {node.title}
                    </h3>
                    <p className="text-neutral-400">{node.description}</p>
                  </motion.div>

                  {/* Mobile Layout - Left Aligned */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="block md:hidden pl-12 w-full"
                  >
                    <span className="text-sm font-mono text-[var(--accent)] mb-2 block">
                      {node.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {node.title}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {node.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
