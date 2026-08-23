"use client";

import { motion } from "framer-motion";
import { skillsData, exploringSkills } from "@/data/skills";

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Technical Arsenal.
          </h2>
          <div className="w-20 h-1 bg-[var(--accent)] rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="p-6 rounded-2xl glass border-white/5 hover:border-[var(--accent-muted)] transition-colors group"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-[var(--accent)] font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                  0{index + 1}.
                </span>
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full bg-white/5 text-neutral-300 border border-white/5 hover:border-[var(--accent)] hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Exploring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-2xl glass border-[var(--accent-muted)] bg-[var(--accent-muted)] flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Currently Exploring
            </h3>
            <p className="text-neutral-400 max-w-md text-sm">
              I'm always learning. Here are the technologies and concepts I'm
              currently diving into to expand my engineering capabilities.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {exploringSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent)] text-black shadow-[0_0_15px_var(--accent-muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
