"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Selected Work.
            </h2>
            <div className="w-20 h-1 bg-[var(--accent)] rounded-full"></div>
          </div>
          <p className="text-neutral-400 max-w-md text-sm">
            A showcase of my strongest engineering projects, ranging from
            real-time distributed systems to machine learning models.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 pt-4 px-6 md:px-12 lg:px-[calc(50vw-576px)]">
        <div className="flex gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="min-w-[85vw] md:min-w-[600px] lg:min-w-[800px] snap-center flex-shrink-0 group"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 transition-all hover:border-[var(--accent)] h-[500px] md:h-[600px]"
              >
                {/* Visual Preview Area */}
                <div className="absolute inset-0 top-0 h-1/2 md:h-3/5 bg-black/50 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900 z-10"></div>
                  {/* Placeholder for project image */}
                  <div className="w-full h-full opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 bg-neutral-800 flex items-center justify-center">
                    <Code2 size={64} className="text-neutral-600" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 flex flex-col justify-end h-1/2 md:h-2/5 bg-neutral-900">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 text-sm md:text-base line-clamp-2 max-w-xl">
                        {project.tagline}
                      </p>
                    </div>
                    <div className="hidden md:flex p-4 rounded-full bg-white/5 group-hover:bg-[var(--accent)] group-hover:text-black transition-colors">
                      <ArrowRight size={24} />
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-white/10 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 text-xs font-mono rounded-full bg-transparent border border-white/20 text-neutral-500">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom CSS to hide scrollbar but keep functionality */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  );
}
