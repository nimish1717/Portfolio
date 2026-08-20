import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../../store/useStore';

const categories = [
    { id: 'FRONTEND', skills: ['REACT', 'TYPESCRIPT', 'JAVASCRIPT', 'TAILWIND', 'GSAP', 'THREE.JS'] },
    { id: 'BACKEND', skills: ['NODE.JS', 'EXPRESS', 'MONGODB', 'POSTGRESQL', 'GRAPHQL', 'REDIS'] },
    { id: 'AI / ML', skills: ['PYTHON', 'PANDAS', 'NUMPY', 'SCIKIT-LEARN', 'XGBOOST', 'SQL'] },
    { id: 'DESIGN', skills: ['FIGMA', 'UI / UX', 'VISUAL DESIGN'] },
    { id: 'MOTION', skills: ['AFTER EFFECTS', 'PROTOPIE', 'ANIMATION'] }
];

export const Skills = () => {
    const containerRef = useRef(null);
    const { setActiveWorld, activeSkillCategory, setActiveSkillCategory } = useStore();
    const [hoveredSkill, setHoveredSkill] = useState(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('skills'),
                onEnterBack: () => setActiveWorld('skills'),
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    const currentSkills = categories.find(c => c.id === activeSkillCategory)?.skills || [];

    return (
        <section ref={containerRef} className="h-screen w-full relative overflow-hidden z-10 flex flex-col pointer-events-none px-6 md:px-12 py-24">
            
            <div className="flex justify-between items-start w-full">
                <div className="pointer-events-auto">
                    <h2 className="text-[6vw] font-heading font-black tracking-tighter uppercase text-white mix-blend-difference leading-none">
                        SYSTEM / 01
                    </h2>
                    <div className="font-mono text-xs tracking-widest text-white/50 uppercase mt-4">
                        TECHNICAL ENVIRONMENT
                    </div>
                </div>

                <div className="flex flex-col gap-2 font-mono text-[10px] md:text-xs text-right pointer-events-auto">
                    {categories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setActiveSkillCategory(cat.id)}
                            className={`text-right tracking-widest transition-colors duration-300 ${activeSkillCategory === cat.id ? 'text-accent' : 'text-white/30 hover:text-white/80'}`}
                        >
                            {cat.id}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center pointer-events-auto">
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                    {currentSkills.map((skill) => (
                        <div 
                            key={skill}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className={`px-6 py-4 border font-mono text-sm tracking-widest uppercase transition-all duration-500 cursor-pointer ${
                                hoveredSkill === skill 
                                ? 'border-accent bg-accent/10 text-accent scale-110 z-10' 
                                : hoveredSkill 
                                    ? 'border-white/5 text-white/20 scale-95 blur-[2px]' 
                                    : 'border-white/20 text-white/80 hover:border-white/50'
                            }`}
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* Simulated Project Connections */}
            <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 flex flex-col items-center gap-2 ${hoveredSkill ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
                <div className="font-mono text-[10px] tracking-widest text-accent uppercase">
                    CONNECTED TO: PORTFOLIO / PHANTOMPOST
                </div>
            </div>

        </section>
    );
};
