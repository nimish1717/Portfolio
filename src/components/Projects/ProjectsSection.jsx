import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ENRICHED_PROJECTS = [
  {
    id: 'parkease',
    name: 'ParkEase',
    category: 'Parking Management System',
    description: 'A smart parking management platform with real-time availability, dynamic pricing and seamless booking.',
    tech: ['MERN', 'JWT', 'PostgreSQL', 'Dynamic Pricing'],
    link: '#parkease'
  },
  {
    id: 'fixmate',
    name: 'FixMate',
    category: 'AI Home Services Platform',
    description: 'An AI-powered home services platform for service classification and automated work verification.',
    tech: ['MERN', 'Flask', 'EfficientNet', 'JWT', 'ML'],
    link: '#fixmate'
  },
  {
    id: 'velto',
    name: 'Velto',
    category: 'Personal Finance Tracker',
    description: 'A personal finance tracker with interactive charts, authentication and Excel export.',
    tech: ['MERN', 'Charts', 'Authentication', 'Excel Export'],
    link: '#velto'
  },
  {
    id: 'ebookcreator',
    name: 'eBook Creator',
    category: 'Create · Design · Export',
    description: 'A platform for writing, designing and exporting eBooks with live preview capabilities.',
    tech: ['React', 'Node.js', 'Canvas API', 'PDF Generation'],
    link: '#ebookcreator'
  },
  {
    id: 'multifusion',
    name: 'MultiFusion',
    category: 'Stress Detection · ML',
    description: 'A multimodal ML system combining multiple signals for stress detection.',
    tech: ['Python', 'TensorFlow', 'Signal Processing', 'Fusion Models'],
    link: '#multifusion'
  }
];

// Sleek UI Mockups for each project
const MockupUI = ({ id }) => {
  switch(id) {
    case 'parkease':
      return (
        <div className="absolute inset-0 bg-[#0B0C10] flex overflow-hidden font-sans">
           <div className="w-[30%] bg-[#12131A] h-full border-r border-white/5 flex flex-col p-4 sm:p-6 space-y-6">
             <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#46B7FF] rounded-lg flex items-center justify-center font-bold text-black">P</div>
                <div className="w-20 h-4 bg-white/20 rounded" />
             </div>
             <div className="space-y-4 pt-4">
                {[1,2,3,4].map(i => <div key={i} className={`h-8 rounded-md ${i===1?'bg-[#46B7FF]/20 border border-[#46B7FF]/50':'bg-white/5'}`} />)}
             </div>
           </div>
           <div className="flex-1 p-6 sm:p-8 flex flex-col relative">
             <div className="text-2xl sm:text-3xl font-medium text-white mb-2">Find Your <br/><span className="text-[#46B7FF]">Perfect Spot</span></div>
             <div className="w-48 sm:w-64 h-10 bg-white/5 rounded-lg border border-white/10 mb-8" />
             
             <div className="flex space-x-4 mb-8">
                <div className="flex-1 bg-[#12131A] p-3 sm:p-4 rounded-xl border border-white/5">
                   <div className="text-[#46B7FF] text-xl sm:text-2xl font-bold">12</div>
                   <div className="text-white/40 text-[8px] sm:text-[10px]">AVAILABLE</div>
                </div>
                <div className="flex-1 bg-[#12131A] p-3 sm:p-4 rounded-xl border border-white/5">
                   <div className="text-[#46B7FF] text-xl sm:text-2xl font-bold">06</div>
                   <div className="text-white/40 text-[8px] sm:text-[10px]">OCCUPIED</div>
                </div>
             </div>
             
             <div className="flex-1 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                {[...Array(4)].map((_,i) => (
                  <div key={i} className="absolute w-8 h-8 bg-[#46B7FF]/20 rounded-full border border-[#46B7FF]/50 flex items-center justify-center shadow-[0_0_15px_rgba(70,183,255,0.4)]" style={{ top: `${20 + i*20}%`, left: `${15 + i*20}%` }}>
                     <span className="text-[#46B7FF] text-[8px]">P</span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      );
    case 'fixmate':
      return (
        <div className="absolute inset-0 bg-[#0B0C10] flex items-center justify-center p-8 overflow-hidden font-sans">
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
           <div className="w-[300px] h-[500px] bg-[#12131A] rounded-[2rem] border-4 border-gray-800 shadow-2xl flex flex-col overflow-hidden relative z-10">
              <div className="h-12 flex items-center justify-center pt-2"><div className="w-16 h-1.5 bg-gray-700 rounded-full" /></div>
              <div className="px-6 pb-4">
                 <div className="flex items-center space-x-2 mb-6">
                    <div className="w-6 h-6 bg-[#46B7FF] rounded-md" />
                    <div className="text-white font-bold tracking-wider">FixMate</div>
                 </div>
                 <div className="w-full h-10 bg-white/5 rounded-xl mb-6 border border-white/5" />
                 <div className="text-white/80 text-xs font-medium mb-4">Popular Services</div>
                 <div className="flex space-x-3 mb-6">
                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5" />
                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5" />
                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5" />
                 </div>
                 <div className="w-full h-24 bg-[#46B7FF]/10 rounded-xl border border-[#46B7FF]/30 p-4 relative overflow-hidden">
                    <div className="text-[#46B7FF] text-sm font-bold mb-1">AI Verified</div>
                    <div className="text-white/60 text-[10px]">Service completed securely</div>
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#46B7FF]/20 rounded-full blur-xl" />
                 </div>
              </div>
           </div>
        </div>
      );
    case 'velto':
      return (
        <div className="absolute inset-0 bg-[#0B0C10] p-6 sm:p-10 font-sans flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded bg-[#46B7FF] flex items-center justify-center text-black font-bold">V</div>
                 <div className="w-24 h-4 bg-white/20 rounded" />
              </div>
              <div className="w-32 h-8 bg-white/5 rounded-lg border border-white/10" />
           </div>
           <div className="flex space-x-6 flex-1">
              <div className="w-2/3 bg-[#12131A] rounded-2xl border border-white/5 p-6 flex flex-col">
                 <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Total Balance</div>
                 <div className="text-4xl text-white font-light mb-8">$12,450<span className="text-white/20">.00</span></div>
                 <div className="flex-1 flex items-end justify-between space-x-4">
                    {[40, 70, 45, 90, 60, 100, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative h-full flex items-end overflow-hidden group">
                        <div 
                          className="w-full bg-gradient-to-t from-[#46B7FF]/40 to-[#46B7FF] rounded-t-sm transition-all duration-500 group-hover:opacity-80"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                 </div>
              </div>
              <div className="w-1/3 flex flex-col space-y-6">
                 <div className="flex-1 bg-[#12131A] rounded-2xl border border-white/5 p-6">
                    <div className="text-white/50 text-xs mb-4">Expenses</div>
                    <div className="w-full h-full rounded-full border-8 border-white/5 relative flex items-center justify-center">
                       <div className="absolute inset-0 rounded-full border-8 border-[#46B7FF]" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 50%)' }} />
                       <span className="text-white text-lg">68%</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );
    case 'ebookcreator':
      return (
        <div className="absolute inset-0 bg-[#0B0C10] flex overflow-hidden font-sans">
           <div className="w-64 bg-[#12131A] h-full border-r border-white/5 p-6 hidden lg:flex flex-col">
              <div className="text-white font-bold tracking-widest mb-8">EDITOR</div>
              <div className="space-y-4">
                 {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-white/5 rounded w-3/4" />)}
              </div>
           </div>
           <div className="flex-1 bg-[#060608] flex items-center justify-center p-12 relative">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="w-full max-w-lg aspect-[1/1.4] bg-white rounded-md shadow-2xl flex flex-col p-12 space-y-6 transform rotate-2">
                 <div className="w-2/3 h-8 bg-gray-200 rounded" />
                 <div className="w-1/3 h-4 bg-[#46B7FF]/30 rounded mb-8" />
                 <div className="space-y-4 flex-1">
                    <div className="w-full h-3 bg-gray-100 rounded" />
                    <div className="w-full h-3 bg-gray-100 rounded" />
                    <div className="w-5/6 h-3 bg-gray-100 rounded" />
                    <div className="w-full h-3 bg-gray-100 rounded mt-8" />
                    <div className="w-4/5 h-3 bg-gray-100 rounded" />
                 </div>
              </div>
           </div>
        </div>
      );
    case 'multifusion':
      return (
        <div className="absolute inset-0 bg-[#0B0C10] flex flex-col items-center justify-center p-8 overflow-hidden font-sans relative">
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
           <div className="text-[#46B7FF] tracking-widest text-sm mb-16 relative z-10">MULTIMODAL FUSION ARCHITECTURE</div>
           
           <div className="flex space-x-12 relative z-10 mb-16">
             {['ECG SIGNAL', 'TEXT INPUT', 'FACIAL DATA'].map((n) => (
               <div key={n} className="w-32 h-24 bg-[#12131A] rounded-xl border border-white/10 flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(70,183,255,0.05)]">
                 <div className="text-[10px] text-white/50 tracking-widest mb-2">{n}</div>
                 <div className="w-12 h-1 bg-[#46B7FF]/30 rounded-full" />
                 <div className="absolute -bottom-16 left-1/2 w-px h-16 bg-gradient-to-b from-[#46B7FF]/50 to-[#46B7FF]" />
               </div>
             ))}
           </div>
           
           <div className="w-64 py-4 bg-[#46B7FF]/10 rounded-xl border border-[#46B7FF]/50 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(70,183,255,0.2)]">
              <span className="text-white font-bold tracking-widest text-sm">FUSION MODEL</span>
           </div>
        </div>
      );
    default:
      return <div className="absolute inset-0 bg-[#0B0C10]" />;
  }
};

const ProjectCard = ({ project, index, scrollYProgress }) => {
  const total = ENRICHED_PROJECTS.length;
  
  // Calculate specific points to pass to WAAPI safely
  const inputs = Array.from({ length: total }).map((_, i) => i / (total - 1));
  const centerPos = index / (total - 1);

  // Maps progress to scale and opacity
  const scaleOutputs = inputs.map(p => Math.abs(p - centerPos) < 0.01 ? 1 : 0.85);
  const opacityOutputs = inputs.map(p => Math.abs(p - centerPos) < 0.01 ? 1 : 0.4);
  const imageScaleOutputs = inputs.map(p => Math.abs(p - centerPos) < 0.01 ? 1 : 1.05);

  const scale = useTransform(scrollYProgress, inputs, scaleOutputs);
  const opacity = useTransform(scrollYProgress, inputs, opacityOutputs);
  const imageScale = useTransform(scrollYProgress, inputs, imageScaleOutputs);

  return (
    <motion.div 
      style={{ scale, opacity }}
      className="flex w-[85vw] lg:w-[70vw] max-w-[1200px] h-[75vh] max-h-[750px] p-6 lg:p-10 bg-[#060608]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl group flex-shrink-0 relative overflow-hidden"
    >
      {/* Number watermark inside card */}
      <div className="absolute -top-10 -left-10 text-[15rem] font-bebas text-white/[0.02] pointer-events-none z-0 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Left: Text Content (40%) */}
      <div className="w-full lg:w-[40%] pr-0 lg:pr-10 flex flex-col justify-center relative z-10">
        <div className="flex items-center space-x-4 mb-4 lg:mb-6">
           <span className="font-mono text-xs text-gray-500 tracking-widest">{String(index + 1).padStart(2, '0')} / 05</span>
        </div>
        
        <h3 className="text-5xl lg:text-6xl xl:text-7xl font-bebas text-white mb-2 tracking-wide uppercase">{project.name}</h3>
        <p className="font-mono text-[9px] lg:text-[10px] tracking-[0.2em] text-[#46B7FF] uppercase mb-6 lg:mb-8">{project.category}</p>
        
        <p className="text-gray-400 font-montserrat font-light text-xs lg:text-sm leading-relaxed mb-8 max-w-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8 lg:mb-12">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1.5 text-[8px] lg:text-[9px] font-mono border border-white/10 text-gray-400 rounded bg-[#0A0A0F]">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-4 mt-auto lg:mt-0">
           <button 
             className="bg-[#46B7FF] hover:bg-white text-black transition-colors px-6 py-3.5 rounded text-[10px] font-bold tracking-widest flex items-center space-x-2 group/btn" 
             onClick={() => window.open(project.link, '_blank')}
           >
              <span>VIEW PROJECT</span>
              <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
           </button>
           <button 
             className="border border-white/20 hover:border-white text-white transition-colors px-6 py-3.5 rounded text-[10px] font-bold tracking-widest flex items-center space-x-2 group/btn2 hidden sm:flex" 
             onClick={() => window.open(project.link, '_blank')}
           >
              <span>GITHUB</span>
              <ArrowUpRight size={14} className="group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-0.5 transition-transform" />
           </button>
        </div>
      </div>

      {/* Right: Image Preview (60%) */}
      <div className="hidden lg:flex w-[60%] h-full relative rounded-xl overflow-hidden bg-[#0A0A0E] border border-white/5 items-center justify-center relative z-10 group-hover:shadow-[0_0_30px_rgba(70,183,255,0.08)] transition-all duration-700">
         <motion.div style={{ scale: imageScale }} className="w-full h-full relative origin-center">
            <MockupUI id={project.id} />
         </motion.div>
         {/* Subtle overlay to blend edges */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(6,6,8,0.5)_100%)] pointer-events-none" />
      </div>

    </motion.div>
  );
};

export const ProjectsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.round(latest * (ENRICHED_PROJECTS.length - 1));
    if (index >= ENRICHED_PROJECTS.length) index = ENRICHED_PROJECTS.length - 1;
    if (index < 0) index = 0;
    setActiveIndex(index);
  });

  // For 5 items, horizontal translation is perfect with w-max and -100% + 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  return (
    <section id="projects" className="relative w-full bg-[#030305] text-[#EDEAE4] font-sans selection:bg-[#46B7FF] selection:text-black">
      
      {/* 
        ========================================
        DESKTOP EXPERIENCE (Horizontal Pinned Scroll)
        ========================================
      */}
      <div ref={containerRef} className="hidden md:block relative" style={{ height: `${ENRICHED_PROJECTS.length * 100}vh` }}>
        
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#030305] bg-[url('/grid.svg')] bg-[length:50px_50px] bg-center relative">
          <div className="absolute inset-0 bg-[#030305]/95 z-0" />
          
          {/* Top Left Header */}
          <div className="absolute top-12 left-12 lg:left-16 xl:left-24 z-50 pointer-events-none">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#46B7FF] block mb-4">
              04 / PROJECTS
            </span>
            <div className="flex items-start space-x-12">
              <h2 className="text-6xl xl:text-7xl tracking-tight uppercase leading-[0.85]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <span className="block text-[#EDEAE4]">SELECTED</span>
                <span className="block text-[#46B7FF]">WORK.</span>
              </h2>
              <p className="text-[10px] font-mono text-gray-400 mt-2 tracking-widest uppercase max-w-[200px] leading-relaxed hidden xl:block">
                A few things I've built —<br/>turning ideas into real,<br/>working products.
              </p>
            </div>
          </div>

          {/* Top Right Scroll Indicator */}
          <div className="absolute top-16 right-12 lg:right-16 xl:right-24 z-50 pointer-events-none flex items-center space-x-4">
            <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">SCROLL TO EXPLORE</span>
            <div className="w-24 h-px bg-white/20 relative">
              <motion.div 
                 style={{ left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                 className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#46B7FF]"
              />
            </div>
          </div>

          {/* Bottom Left Branding */}
          <div className="absolute bottom-12 left-12 lg:left-16 xl:left-24 z-50 pointer-events-none">
            <div className="text-white text-xs font-bold tracking-widest uppercase mb-1 font-mono">NIMISH AGRAWAL</div>
            <div className="text-gray-500 font-mono text-[9px] tracking-widest uppercase">SOFTWARE ENGINEER · CREATIVE DEVELOPER</div>
          </div>

          {/* Bottom Right Progress Indicator */}
          <div className="absolute bottom-12 right-12 lg:right-16 xl:right-24 z-50 pointer-events-none flex items-center space-x-6">
            <span className="font-mono text-[10px] tracking-widest text-white">
              {String(activeIndex + 1).padStart(2, '0')} / 05
            </span>
            <div className="flex space-x-2">
               {ENRICHED_PROJECTS.map((_, i) => (
                  <div key={i} className={`h-px transition-all duration-300 ${i === activeIndex ? 'w-10 bg-[#46B7FF]' : 'w-4 bg-white/20'}`} />
               ))}
            </div>
          </div>

          {/* Scrolling Horizontal Track */}
          {/* Note: Viewport width is 100vw, Card width is 70vw. 
              To perfectly center the first card, left padding is exactly (100 - 70) / 2 = 15vw.
              Gap is 5vw. So pl-[15vw] pr-[15vw] gap-[5vw] with w-max perfectly aligns everything! */}
          <motion.div 
            style={{ x, width: 'max-content' }} 
            className="flex items-center h-screen px-[15vw] gap-[5vw] z-10"
          >
            {ENRICHED_PROJECTS.map((project, i) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={i} 
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
          
        </div>
      </div>

      {/* 
        ========================================
        MOBILE EXPERIENCE (Vertical Sequence)
        ========================================
      */}
      <div className="md:hidden flex flex-col px-6 pt-32 pb-24 bg-[#030305]">
        
        {/* Mobile Header */}
        <div className="mb-20">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#46B7FF] block mb-4">
            04 / PROJECTS
          </span>
          <h2 className="text-6xl tracking-tight uppercase leading-[0.85]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <span className="block text-[#EDEAE4]">SELECTED</span>
            <span className="block text-[#46B7FF]">WORK.</span>
          </h2>
          <p className="text-[10px] font-mono text-gray-500 mt-6 tracking-widest uppercase leading-relaxed">
            A few things I've built —<br/>turning ideas into real,<br/>working products.
          </p>
        </div>

        {/* Mobile Projects */}
        <div className="flex flex-col space-y-16">
          {ENRICHED_PROJECTS.map((project, i) => (
            <div key={project.id} className="flex flex-col border border-white/10 rounded-2xl bg-[#060608] p-6 overflow-hidden relative">
               <div className="flex items-center space-x-4 mb-4">
                 <span className="font-mono text-xs text-gray-500 tracking-widest">{String(i + 1).padStart(2, '0')} / 05</span>
               </div>
               
               <h3 className="text-4xl font-bebas text-white mb-2 tracking-wider uppercase">{project.name}</h3>
               <p className="font-mono text-[9px] tracking-[0.2em] text-[#46B7FF] uppercase mb-6">{project.category}</p>
               
               <div className="w-full h-48 bg-[#0A0A0E] border border-white/5 rounded-xl mb-6 relative overflow-hidden">
                  <MockupUI id={project.id} />
               </div>

               <p className="text-gray-400 font-montserrat font-light text-xs leading-relaxed mb-6">
                 {project.description}
               </p>

               <div className="flex flex-wrap gap-2 mb-8">
                 {project.tech.map(t => (
                   <span key={t} className="px-2 py-1 text-[8px] font-mono border border-white/10 text-gray-400 rounded bg-[#0A0A0F]">
                     {t}
                   </span>
                 ))}
               </div>

               <button 
                 className="w-full bg-[#46B7FF] text-black py-4 rounded text-[10px] font-bold tracking-widest flex items-center justify-center space-x-2" 
                 onClick={() => window.open(project.link, '_blank')}
               >
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight size={14} />
               </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
