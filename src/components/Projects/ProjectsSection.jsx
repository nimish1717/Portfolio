import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
        <div className="absolute inset-0 bg-[#151013] flex overflow-hidden font-sans">
           <div className="w-[30%] bg-[#0C080A] h-full border-r border-white/5 flex flex-col p-4 sm:p-6 space-y-6">
             <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#FF7B00] rounded-lg flex items-center justify-center font-bold text-black">P</div>
                <div className="w-20 h-4 bg-white/20 rounded" />
             </div>
             <div className="space-y-4 pt-4">
                {[1,2,3,4].map(i => <div key={i} className={`h-8 rounded-md ${i===1?'bg-[#FF7B00]/20 border border-[#FF7B00]/50':'bg-white/5'}`} />)}
             </div>
           </div>
           <div className="flex-1 p-6 sm:p-8 flex flex-col relative">
             <div className="text-2xl sm:text-3xl font-medium text-white mb-2">Find Your <br/><span className="text-[#FF7B00]">Perfect Spot</span></div>
             <div className="w-48 sm:w-64 h-10 bg-white/5 rounded-lg border border-white/10 mb-8" />
             
             <div className="flex space-x-4 mb-8">
                <div className="flex-1 bg-[#0C080A] p-3 sm:p-4 rounded-xl border border-white/5">
                   <div className="text-[#FF7B00] text-xl sm:text-2xl font-bold">12</div>
                   <div className="text-white/40 text-[8px] sm:text-[10px]">AVAILABLE</div>
                </div>
                <div className="flex-1 bg-[#0C080A] p-3 sm:p-4 rounded-xl border border-white/5">
                   <div className="text-[#FF7B00] text-xl sm:text-2xl font-bold">06</div>
                   <div className="text-white/40 text-[8px] sm:text-[10px]">OCCUPIED</div>
                </div>
             </div>
             
             <div className="flex-1 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                {[...Array(4)].map((_,i) => (
                  <div key={i} className="absolute w-8 h-8 bg-[#FF7B00]/20 rounded-full border border-[#FF7B00]/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,123,0,0.4)]" style={{ top: `${20 + i*20}%`, left: `${15 + i*20}%` }}>
                     <span className="text-[#FF7B00] text-[8px]">P</span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      );
    case 'fixmate':
      return (
        <div className="absolute inset-0 bg-[#151013] flex items-center justify-center p-8 overflow-hidden font-sans">
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
           <div className="w-[300px] h-[500px] bg-[#0C080A] rounded-[2rem] border-4 border-gray-800 shadow-2xl flex flex-col overflow-hidden relative z-10">
              <div className="h-12 flex items-center justify-center pt-2"><div className="w-16 h-1.5 bg-gray-700 rounded-full" /></div>
              <div className="px-6 pb-4">
                 <div className="flex items-center space-x-2 mb-6">
                    <div className="w-6 h-6 bg-[#FF7B00] rounded-md" />
                    <div className="text-white font-bold tracking-wider">FixMate</div>
                 </div>
                 <div className="w-full h-10 bg-white/5 rounded-xl mb-6 border border-white/5" />
                 <div className="text-white/80 text-xs font-medium mb-4">Popular Services</div>
                 <div className="flex space-x-3 mb-6">
                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5" />
                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5" />
                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5" />
                 </div>
                 <div className="w-full h-24 bg-[#FF7B00]/10 rounded-xl border border-[#FF7B00]/30 p-4 relative overflow-hidden">
                    <div className="text-[#FF7B00] text-sm font-bold mb-1">AI Verified</div>
                    <div className="text-white/60 text-[10px]">Service completed securely</div>
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#FF7B00]/20 rounded-full blur-xl" />
                 </div>
              </div>
           </div>
        </div>
      );
    case 'velto':
      return (
        <div className="absolute inset-0 bg-[#151013] p-6 sm:p-10 font-sans flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded bg-[#FF7B00] flex items-center justify-center text-black font-bold">V</div>
                 <div className="w-24 h-4 bg-white/20 rounded" />
              </div>
              <div className="w-32 h-8 bg-white/5 rounded-lg border border-white/10" />
           </div>
           <div className="flex space-x-6 flex-1">
              <div className="w-2/3 bg-[#0C080A] rounded-2xl border border-white/5 p-6 flex flex-col">
                 <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Total Balance</div>
                 <div className="text-4xl text-white font-light mb-8">$12,450<span className="text-white/20">.00</span></div>
                 <div className="flex-1 flex items-end justify-between space-x-4">
                    {[40, 70, 45, 90, 60, 100, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative h-full flex items-end overflow-hidden group">
                        <div 
                          className="w-full bg-gradient-to-t from-[#FF7B00]/40 to-[#FF7B00] rounded-t-sm transition-all duration-500 group-hover:opacity-80"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                 </div>
              </div>
              <div className="w-1/3 flex flex-col space-y-6">
                 <div className="flex-1 bg-[#0C080A] rounded-2xl border border-white/5 p-6">
                    <div className="text-white/50 text-xs mb-4">Expenses</div>
                    <div className="w-full h-full rounded-full border-8 border-white/5 relative flex items-center justify-center">
                       <div className="absolute inset-0 rounded-full border-8 border-[#FF7B00]" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 50%)' }} />
                       <span className="text-white text-lg">68%</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );
    case 'ebookcreator':
      return (
        <div className="absolute inset-0 bg-[#151013] flex overflow-hidden font-sans">
           <div className="w-64 bg-[#0C080A] h-full border-r border-white/5 p-6 hidden lg:flex flex-col">
              <div className="text-white font-bold tracking-widest mb-8">EDITOR</div>
              <div className="space-y-4">
                 {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-white/5 rounded w-3/4" />)}
              </div>
           </div>
           <div className="flex-1 bg-[#151013] flex items-center justify-center p-12 relative">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="w-full max-w-lg aspect-[1/1.4] bg-white rounded-md shadow-2xl flex flex-col p-12 space-y-6 transform rotate-2">
                 <div className="w-2/3 h-8 bg-gray-200 rounded" />
                 <div className="w-1/3 h-4 bg-[#FF7B00]/30 rounded mb-8" />
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
        <div className="absolute inset-0 bg-[#151013] flex flex-col items-center justify-center p-8 overflow-hidden font-sans relative">
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
           <div className="text-[#FF7B00] tracking-widest text-sm mb-16 relative z-10">MULTIMODAL FUSION ARCHITECTURE</div>
           
           <div className="flex space-x-12 relative z-10 mb-16">
             {['ECG SIGNAL', 'TEXT INPUT', 'FACIAL DATA'].map((n) => (
               <div key={n} className="w-32 h-24 bg-[#0C080A] rounded-xl border border-white/10 flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(255,123,0,0.05)]">
                 <div className="text-[10px] text-white/50 tracking-widest mb-2">{n}</div>
                 <div className="w-12 h-1 bg-[#FF7B00]/30 rounded-full" />
                 <div className="absolute -bottom-16 left-1/2 w-px h-16 bg-gradient-to-b from-[#FF7B00]/50 to-[#FF7B00]" />
               </div>
             ))}
           </div>
           
           <div className="w-64 py-4 bg-[#FF7B00]/10 rounded-xl border border-[#FF7B00]/50 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(255,123,0,0.2)]">
              <span className="text-white font-bold tracking-widest text-sm">FUSION MODEL</span>
           </div>
        </div>
      );
    default:
      return <div className="absolute inset-0 bg-[#151013]" />;
  }
};

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        let containerWidth = containerRef.current.scrollWidth;
        return (containerWidth - window.innerWidth);
      };

      const tween = gsap.to(containerRef.current, {
        x: () => -getScrollAmount(),
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * 1.5}`,
        pin: true,
        animation: tween,
        scrub: true,
        invalidateOnRefresh: true,
      });
    });

    // Mobile: no pin, just vertical list
    mm.add("(max-width: 767px)", () => {
       const cards = gsap.utils.toArray('.mobile-card');
       cards.forEach((card) => {
         gsap.from(card, {
           opacity: 0,
           y: 50,
           duration: 0.8,
           scrollTrigger: {
             trigger: card,
             start: "top 85%",
             toggleActions: "play none none reverse"
           }
         });
       });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-[#0C080A] text-white font-sans selection:bg-[#FF7B00] selection:text-black overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[#0C080A] bg-[url('/grid.svg')] bg-[length:50px_50px] bg-center opacity-30 z-0 pointer-events-none" />
      
      {/* DESKTOP HORIZONTAL SCROLL */}
      <div className="hidden md:flex h-screen items-center px-12 lg:px-24 gap-12 lg:gap-20" ref={containerRef}>
        
        {/* Intro Slide */}
        <div className="w-[35vw] min-w-[350px] max-w-[500px] flex-shrink-0 flex flex-col justify-center relative z-10">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#FF7B00] block mb-6">
            04 / PROJECTS
          </span>
          <h2 className="text-7xl lg:text-[8rem] tracking-tight uppercase leading-[0.85]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <span className="block text-white">SELECTED</span>
            <span className="block text-[#FF7B00]">WORK.</span>
          </h2>
          <p className="text-xs lg:text-sm font-mono text-gray-500 tracking-widest uppercase leading-relaxed mt-8">
            Scroll to explore some of the things I've built. Turning ideas into real, working products.
          </p>
          <div className="mt-12 flex items-center space-x-4">
             <div className="h-px w-16 bg-[#FF7B00]"></div>
             <span className="text-[10px] font-mono tracking-widest text-[#FF7B00]">SCROLL</span>
          </div>
        </div>

        {ENRICHED_PROJECTS.map((project, i) => (
          <div key={project.id} className="w-[75vw] max-w-[850px] h-[70vh] max-h-[600px] flex-shrink-0 bg-[#151013]/90 backdrop-blur-md rounded-2xl border border-[#FF7B00]/20 overflow-hidden flex shadow-[0_0_30px_rgba(255,123,0,0.05)] hover:shadow-[0_0_50px_rgba(255,123,0,0.2)] hover:border-[#FF7B00]/50 transition-all duration-500 relative group">
             
             {/* Left/Top Content */}
             <div className="w-[45%] p-8 lg:p-10 flex flex-col justify-between relative z-10 bg-[#151013]">
               <div>
                  <div className="flex items-center space-x-3 mb-6 lg:mb-8">
                    <span className="font-mono text-xs text-gray-500 tracking-widest">{String(i + 1).padStart(2, '0')} / {String(ENRICHED_PROJECTS.length).padStart(2, '0')}</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-6xl font-bebas text-white mb-2 tracking-wide uppercase">{project.name}</h3>
                  <p className="font-mono text-[9px] lg:text-[10px] tracking-[0.2em] text-[#FF7B00] uppercase mb-4 lg:mb-6">{project.category}</p>
                  
                  <p className="text-gray-400 font-montserrat font-light text-xs lg:text-sm leading-relaxed">
                    {project.description}
                  </p>
               </div>

               <div>
                  <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1.5 text-[9px] font-mono border border-white/10 text-gray-400 rounded bg-[#1E151A]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                     <button 
                       className="bg-[#FF7B00] hover:bg-white text-black transition-colors px-6 py-3 rounded text-[10px] font-bold tracking-widest flex items-center space-x-2 group/btn" 
                       onClick={() => window.open(project.link, '_blank')}
                     >
                        <span>VIEW</span>
                        <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                     </button>
                     <button 
                       className="border border-white/20 hover:border-white text-white transition-colors px-6 py-3 rounded text-[10px] font-bold tracking-widest flex items-center space-x-2 group/btn2" 
                       onClick={() => window.open(project.link, '_blank')}
                     >
                        <span>GITHUB</span>
                        <ArrowUpRight size={14} className="group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-0.5 transition-transform" />
                     </button>
                  </div>
               </div>
             </div>

             {/* Right Image area */}
             <div className="w-[55%] relative h-full bg-[#1E151A] border-l border-white/5 overflow-hidden">
               <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out">
                  <MockupUI id={project.id} />
               </div>
               {/* Subtle gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#151013] via-transparent to-transparent opacity-80" />
             </div>

          </div>
        ))}

        {/* End spacing */}
        <div className="w-[10vw] flex-shrink-0" />
      </div>

      {/* MOBILE VERTICAL LAYOUT */}
      <div className="md:hidden flex flex-col px-6 py-32 bg-[#0C080A] relative z-10">
        <div className="mb-20">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#FF7B00] block mb-4">
            04 / PROJECTS
          </span>
          <h2 className="text-6xl tracking-tight uppercase leading-[0.85]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <span className="block text-white">SELECTED</span>
            <span className="block text-[#FF7B00]">WORK.</span>
          </h2>
          <p className="text-[10px] font-mono text-gray-500 mt-6 tracking-widest uppercase leading-relaxed">
            Scroll to explore some of the things I've built.
          </p>
        </div>

        <div className="flex flex-col space-y-16">
          {ENRICHED_PROJECTS.map((project, i) => (
            <div key={project.id} className="mobile-card flex flex-col rounded-2xl bg-[#151013] border border-white/10 overflow-hidden relative">
               
               <div className="w-full h-48 bg-[#1E151A] border-b border-white/5 relative overflow-hidden">
                  <MockupUI id={project.id} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151013] via-transparent to-transparent opacity-90" />
               </div>

               <div className="p-6">
                 <div className="flex items-center space-x-3 mb-4">
                   <span className="font-mono text-[10px] text-gray-500 tracking-widest">{String(i + 1).padStart(2, '0')} / {String(ENRICHED_PROJECTS.length).padStart(2, '0')}</span>
                 </div>
                 
                 <h3 className="text-4xl font-bebas text-white mb-1 tracking-wider uppercase">{project.name}</h3>
                 <p className="font-mono text-[9px] tracking-[0.2em] text-[#FF7B00] uppercase mb-4">{project.category}</p>
                 
                 <p className="text-gray-400 font-montserrat font-light text-xs leading-relaxed mb-6">
                   {project.description}
                 </p>

                 <div className="flex flex-wrap gap-2 mb-6">
                   {project.tech.map(t => (
                     <span key={t} className="px-2 py-1 text-[8px] font-mono border border-white/10 text-gray-400 rounded bg-[#1E151A]">
                       {t}
                     </span>
                   ))}
                 </div>

                 <div className="flex items-center gap-3">
                    <button 
                      className="flex-1 bg-[#FF7B00] text-black py-3 rounded text-[10px] font-bold tracking-widest flex items-center justify-center space-x-2" 
                      onClick={() => window.open(project.link, '_blank')}
                    >
                       <span>VIEW</span>
                       <ArrowUpRight size={14} />
                    </button>
                    <button 
                      className="flex-1 border border-white/20 text-white py-3 rounded text-[10px] font-bold tracking-widest flex items-center justify-center space-x-2" 
                      onClick={() => window.open(project.link, '_blank')}
                    >
                       <span>GITHUB</span>
                       <ArrowUpRight size={14} />
                    </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
