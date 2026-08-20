import { useRef, useState } from 'react';
import gsap from 'gsap';
import { CaseStudyOverlay } from './CaseStudyOverlay';

const projects = [
    {
        id: "01",
        title: "PHANTOMPOST",
        tech: ["REACT", "NODE.JS", "MONGODB", "WEBSOCKETS"],
        desc: "Anonymous social communication platform where thoughts get wings.",
        color: "#9333ea", // purple
        bg: "bg-[#1a0b2e]",
    },
    {
        id: "02",
        title: "AI FRAUD DETECTION",
        tech: ["PYTHON", "SCIKIT-LEARN", "XGBOOST", "PANDAS"],
        desc: "ML project to detect fraudulent transactions using multiple models and data visualization.",
        color: "#ccff00", // green
        bg: "bg-[#0a1f0a]",
    },
    {
        id: "03",
        title: "UI / UX EXPLORATIONS",
        tech: ["FIGMA", "PROTOPIE", "AFTER EFFECTS"],
        desc: "A collection of modern interfaces, animations and design experiments.",
        color: "#f5f5f5", // white
        bg: "bg-[#111111]",
    }
];

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="work" className="w-full relative flex flex-col">
            {/* Header */}
            <div className="w-full py-12 px-6 md:px-12 border-b border-white/10 bg-black">
                <div className="flex justify-between items-center text-xs font-mono tracking-widest uppercase text-white/50">
                    <span>SELECTED WORK</span>
                    <span>VIEW ALL PROJECTS →</span>
                </div>
            </div>

            {/* Project List */}
            {projects.map((project, index) => (
                <div 
                    key={project.id} 
                    className={`min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 border-b border-white/10 transition-colors duration-700 ${project.bg} group cursor-pointer relative overflow-hidden`}
                    data-cursor="VIEW"
                    onClick={() => setSelectedProject(project)}
                >
                    {/* Background Visual Layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)` }}></div>
                    
                    <div className="relative z-10 flex flex-col xl:flex-row w-full items-center gap-12 xl:gap-24">
                        
                        {/* Image Preview Layer */}
                        <div className="w-full xl:w-1/2 aspect-[4/3] rounded-lg overflow-hidden border border-white/10 relative transition-transform duration-700 group-hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                            {/* Placeholder for actual screenshot */}
                            <div className="w-full h-full flex items-center justify-center font-mono text-white/20 text-xs tracking-widest" style={{ backgroundColor: project.color + '20' }}>
                                IMAGE PREVIEW / {project.id}
                            </div>
                        </div>

                        {/* Details Layer */}
                        <div className="w-full xl:w-1/2 flex flex-col items-start text-left">
                            <div className="flex flex-col mb-8">
                                <span className="text-[10vw] xl:text-[8vw] font-heading font-black leading-none tracking-tighter opacity-50 transition-all duration-700 group-hover:opacity-100" style={{ color: project.color }}>
                                    {project.id}
                                </span>
                            </div>
                            
                            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 transition-transform duration-700 origin-left group-hover:scale-105">
                                {project.title}
                            </h2>
                            
                            <p className="text-sm md:text-base font-mono text-white/60 mb-8 max-w-md leading-relaxed">
                                {project.desc}
                            </p>
                            
                            <div className="flex flex-wrap gap-3 mb-12">
                                {project.tech.map(t => (
                                    <span key={t} className="px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-mono tracking-widest text-white/70 group-hover:border-white/50 transition-colors">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            
                            <button className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest transition-colors" style={{ color: project.color }}>
                                VIEW CASE STUDY 
                                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-current group-hover:text-black transition-all">→</span>
                            </button>
                        </div>

                    </div>
                </div>
            ))}

            {selectedProject && (
                <CaseStudyOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    );
};
