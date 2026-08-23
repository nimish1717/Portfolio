"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star } from "lucide-react";
import { achievementsData } from "@/data/achievements";

export function Achievements() {
  // Utility to map icons, in a real scenario this might be in the data
  const getIcon = (index) => {
    switch (index % 3) {
      case 0:
        return <Award size={32} className="text-[var(--accent)]" />;
      case 1:
        return <Trophy size={32} className="text-[var(--accent)]" />;
      default:
        return <Star size={32} className="text-[var(--accent)]" />;
    }
  };

  return (
    <section id="achievements" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Milestones & Achievements.
          </h2>
          <div className="w-20 h-1 bg-[var(--accent)] rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl glass border-white/5 hover:border-[var(--accent-muted)] hover:bg-white/5 transition-all group flex flex-col h-full relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-500"></div>

              <div className="mb-6 p-4 bg-white/5 rounded-xl inline-flex w-fit">
                {getIcon(index)}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-[var(--accent)] font-mono text-sm mb-4">
                {achievement.date}
              </p>

              <p className="text-neutral-400 mt-auto leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
