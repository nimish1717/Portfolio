"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { projects } from "@/data/projects";
import { useCursor } from "@/components/ui/CursorContext";

export function Projects() {
  const { cursorChangeHandler } = useCursor();

  return (
    <section id="projects" className="py-32 relative bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-[#a855f7] font-mono text-xs tracking-widest uppercase mb-4">
              Featured Projects
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Things I've <span className="text-[#a855f7]">built.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-mono text-sm tracking-widest uppercase group"
          >
            <span>View All Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-16 pt-4 px-6 md:px-12 lg:px-[calc(50vw-640px)]">
        <div className="flex gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="min-w-[85vw] md:min-w-[600px] lg:min-w-[800px] snap-center flex-shrink-0 group"
              onMouseEnter={() => cursorChangeHandler("view")}
              onMouseLeave={() => cursorChangeHandler("default")}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block relative aspect-video rounded-3xl overflow-hidden glass border border-white/10 group-hover:border-[#a855f7] transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]"
              >
                <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-luminosity group-hover:mix-blend-normal"
                    style={{ backgroundImage: `url(${project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Subtle purple glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7] rounded-full mix-blend-screen opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700"></div>
                </div>
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-lg mb-6 line-clamp-2 max-w-2xl">
                      {project.tagline}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-neutral-300 backdrop-blur-md group-hover:border-[#a855f7]/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
