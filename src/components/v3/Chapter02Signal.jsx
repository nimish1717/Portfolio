"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";

const DOMAINS = [
  {
    id: "build",
    title: "BUILD",
    desc: "Robust full-stack architectures & scalable systems.",
    theme: "bg-mode-charcoal",
    bgClass: "bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[size:100px] opacity-20",
    color: "text-accent"
  },
  {
    id: "design",
    title: "DESIGN",
    desc: "Premium UI/UX, interaction design, & cinematic interfaces.",
    theme: "bg-mode-surface",
    bgClass: "bg-gradient-to-br from-white/5 to-transparent",
    color: "text-white"
  },
  {
    id: "explore",
    title: "EXPLORE",
    desc: "AI integrations, WebGL, motion physics & creative dev.",
    theme: "bg-mode-graphite",
    bgClass: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent",
    color: "text-accent"
  }
];

const CAPABILITIES = [
  {
    category: "FRONTEND",
    desc: "Building highly interactive, performance-driven interfaces with modern web standards.",
    tech: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP"]
  },
  {
    category: "BACKEND",
    desc: "Designing secure, scalable APIs and microservices for data-heavy applications.",
    tech: ["Node.js", "Express", "RESTful APIs", "Authentication"]
  },
  {
    category: "AI / ML",
    desc: "Integrating predictive models and generative AI into production environments.",
    tech: ["Python", "TensorFlow", "Scikit-Learn", "OpenAI APIs"]
  },
  {
    category: "DATABASES",
    desc: "Structuring and optimizing data storage for fast retrieval and complex querying.",
    tech: ["MongoDB", "PostgreSQL", "Mongoose", "SQL"]
  },
  {
    category: "UI / UX",
    desc: "Crafting wireframes, design systems, and cinematic interactions for the web.",
    tech: ["Figma", "Interaction Design", "Prototyping", "Wireframing"]
  },
  {
    category: "TOOLS",
    desc: "Version control, deployment pipelines, and modern developer tooling.",
    tech: ["Git", "GitHub", "Vercel", "Postman", "C++"]
  }
];

export function Chapter02Signal() {
  const [activeDomain, setActiveDomain] = useState("build");
  const [hoveredCapability, setHoveredCapability] = useState(null);
  const { setCursorVariant } = useCursor();

  return (
    <section id="signal" className={`relative w-full min-h-screen py-32 transition-colors duration-1000 ${
      activeDomain === "build" ? "bg-[#0D0D0F]" : 
      activeDomain === "design" ? "bg-[#202126]" : "bg-[#17181B]"
    }`}>
      
      {/* Dynamic Backgrounds based on Active Domain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <AnimatePresence mode="wait">
           <motion.div 
             key={activeDomain}
             initial={{ opacity: 0, scale: 1.05 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1 }}
             className={`absolute inset-0 ${DOMAINS.find(d => d.id === activeDomain).bgClass}`}
           />
         </AnimatePresence>
         {/* Technical Grid specifically for BUILD */}
         {activeDomain === "build" && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"
           />
         )}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col gap-32">
        
        {/* DOMAINS */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10">
          {DOMAINS.map((domain, i) => (
            <div 
              key={domain.id}
              onMouseEnter={() => {
                setActiveDomain(domain.id);
                setCursorVariant("hover");
              }}
              onMouseLeave={() => setCursorVariant("default")}
              className={`flex flex-col gap-6 p-8 md:p-12 cursor-pointer transition-colors duration-500 border-r border-white/10 last:border-r-0 ${
                activeDomain === domain.id ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs tracking-widest text-white/30 uppercase">0{i+1}</span>
                {activeDomain === domain.id && (
                   <motion.div layoutId="domain-indicator" className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                )}
              </div>
              <h3 className={`font-bebas text-5xl md:text-7xl tracking-wide uppercase transition-colors duration-500 ${
                activeDomain === domain.id ? domain.color : "text-white/30"
              }`}>
                {domain.title}
              </h3>
              <p className="font-mono text-xs leading-relaxed text-white/50 tracking-wide uppercase">
                {domain.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CAPABILITIES MATRIX */}
        <div className="flex flex-col gap-12">
           <div className="flex justify-between items-end border-b border-white/10 pb-4">
             <h4 className="font-bebas text-3xl text-white tracking-widest uppercase">CAPABILITIES</h4>
             <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">SYSTEM ARCHITECTURE</span>
           </div>
           
           <div className="flex flex-col">
             {CAPABILITIES.map((cap, i) => (
               <div 
                 key={cap.category}
                 className="group border-b border-white/5 relative overflow-hidden"
                 onMouseEnter={() => setHoveredCapability(i)}
                 onMouseLeave={() => setHoveredCapability(null)}
               >
                 <div className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 cursor-default z-10 relative">
                   <h5 className="font-bebas text-4xl md:text-5xl text-white/80 group-hover:text-white transition-colors uppercase w-full md:w-1/3">
                     {cap.category}
                   </h5>
                   
                   <div className="w-full md:w-2/3 flex justify-end">
                      <div className="flex flex-wrap gap-2 md:gap-4 justify-end">
                        {cap.tech.map(t => (
                          <span key={t} className="font-mono text-[10px] tracking-widest uppercase border border-white/10 px-3 py-1.5 rounded text-white/60 group-hover:border-white/30 group-hover:text-white transition-colors bg-white/[0.01] backdrop-blur-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                   </div>
                 </div>

                 {/* Expandable Details Area */}
                 <AnimatePresence>
                   {hoveredCapability === i && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.4, ease: "easeInOut" }}
                       className="overflow-hidden"
                     >
                       <div className="pb-8 flex flex-col md:flex-row gap-8 items-start">
                         <div className="w-full md:w-1/3" />
                         <p className="w-full md:w-2/3 text-lg font-light text-white/70 leading-relaxed text-right font-inter">
                           {cap.desc}
                         </p>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
                 
                 {/* Hover Background Accent */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
}
