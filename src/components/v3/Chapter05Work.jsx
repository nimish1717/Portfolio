"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";
import { projects } from "@/data/projects";

const CATEGORIES = ["ALL", "FULL STACK", "FRONTEND", "AI / ML"];

// Helper to map projects to categories
const getProjectCategory = (project) => {
  if (project.techStack.includes("Next.js") || project.techStack.includes("React") && project.techStack.includes("Node.js")) return "FULL STACK";
  if (project.techStack.includes("Python") || project.techStack.includes("XGBoost")) return "AI / ML";
  return "FRONTEND";
};

export function Chapter05Work() {
  const [filter, setFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);
  const { setCursorVariant, setCursorText } = useCursor();

  const filteredProjects = projects.filter(p => {
    if (filter === "ALL") return true;
    return getProjectCategory(p) === filter;
  });

  return (
    <section id="work" className="relative w-full min-h-screen bg-bg py-32 text-fg overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <h2 className="font-bebas text-4xl md:text-6xl tracking-wider uppercase text-fg/80 mb-2">SELECTED WORK</h2>
            <p className="font-mono text-xs text-fg/40 tracking-widest uppercase">PROJECTS I&apos;VE BUILT — 05 / WORK</p>
          </div>
          
          {/* Dynamic Filter */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs tracking-widest uppercase transition-colors relative ${filter === cat ? 'text-accent' : 'text-fg/50 hover:text-fg'}`}
              >
                {cat}
                {filter === cat && (
                  <motion.div 
                    layoutId="filter-underline"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid / List */}
        <div className="flex flex-col gap-32">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col gap-8 w-full cursor-pointer"
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => {
                  setCursorVariant("text");
                  setCursorText("VIEW");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
              >
                {/* Large Visual */}
                <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-white/5 border border-white/10">
                  <motion.img 
                    src={project.screenshots[0] || "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 group-hover:rotate-1"
                    style={{ filter: "grayscale(100%) contrast(1.2)" }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-[2px]">
                     <span className="font-bebas text-4xl text-white tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">EXPLORE</span>
                  </div>
                </div>

                {/* Typography & Metadata */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-xs text-accent tracking-widest uppercase">0{index + 1} // {getProjectCategory(project)}</span>
                    <h3 className="font-bebas text-4xl md:text-6xl tracking-wider uppercase group-hover:text-accent transition-colors duration-500">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 max-w-sm justify-start md:justify-end">
                    {project.techStack.map(tech => (
                      <span key={tech} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-white/20 rounded-full text-fg/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cinematic Quick View Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg/90 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 p-8 md:p-16 flex flex-col gap-12 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 font-mono text-xs tracking-widest uppercase text-fg/50 hover:text-white"
              >
                CLOSE ✕
              </button>

              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-accent tracking-widest uppercase">{getProjectCategory(selectedProject)}</span>
                <h2 className="font-bebas text-5xl md:text-7xl tracking-wider uppercase text-white">{selectedProject.title}</h2>
                <p className="font-mono text-sm tracking-wide text-fg/60 max-w-2xl">{selectedProject.tagline}</p>
              </div>

              <div className="w-full aspect-video bg-white/5 overflow-hidden">
                <img 
                   src={selectedProject.screenshots[0] || "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"}
                   alt={selectedProject.title}
                   className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-mono text-xs text-accent tracking-widest uppercase">PROBLEM</h4>
                    <p className="text-sm text-fg/80 leading-relaxed">{selectedProject.problemStatement}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-mono text-xs text-accent tracking-widest uppercase">SOLUTION</h4>
                    <p className="text-sm text-fg/80 leading-relaxed">{selectedProject.solutionOverview}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs text-accent tracking-widest uppercase">TECH STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(tech => (
                        <span key={tech} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 bg-white/10 text-fg/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-white/10">
                    {selectedProject.githubLink && (
                      <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="font-mono text-xs tracking-widest uppercase hover:text-accent transition-colors flex items-center gap-2">
                        GITHUB REPOSITORY ↗
                      </a>
                    )}
                    <a href={`/projects/${selectedProject.slug}`} className="font-mono text-xs tracking-widest uppercase hover:text-accent transition-colors flex items-center gap-2 group">
                      OPEN FULL CASE STUDY <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
