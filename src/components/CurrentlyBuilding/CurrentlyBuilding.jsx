import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiments = [
    { id: "EXP-01", name: "FLUID_SIMULATION_WEBGL", status: "CRASHING", error: "OOM on mobile", progress: "45%" },
    { id: "EXP-02", name: "AI_AGENT_UI", status: "ITERATING", error: "None", progress: "80%" },
    { id: "EXP-03", name: "CUSTOM_RENDER_ENGINE", status: "BROKEN", error: "Shader compilation failed", progress: "15%" },
    { id: "EXP-04", name: "TYPOGRAPHY_DISTORTION", status: "STABLE", error: "None", progress: "95%" }
];


import { useStore } from '../../store/useStore';

export const CurrentlyBuilding = () => {
    const containerRef = useRef(null);
    const { setActiveWorld } = useStore();

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('building'),
                onEnterBack: () => setActiveWorld('building'),
            });

            gsap.fromTo('.exp-row', 
                { opacity: 0, x: -50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    stagger: 0.1, 
                    scrollTrigger: {
                        trigger: '.building-data',
                        start: "top 80%",
                        scrub: true,
                    }
                }
            );
            
            gsap.to('.blink-cursor', {
                opacity: 0,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "steps(1)"
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    return (
        <section ref={containerRef} className="relative min-h-[200vh] w-full pt-[30vh] pb-[30vh] px-6 md:px-24 pointer-events-none z-10 flex flex-col justify-start gap-[30vh]">
            
            <div className="w-full max-w-2xl pointer-events-auto">
                <h2 className="text-[6vw] font-heading font-black tracking-tighter text-[#00ff00] leading-none mb-4 uppercase">
                    CURRENTLY<br/>BUILDING<span className="blink-cursor">_</span>
                </h2>
                <div className="font-mono text-sm tracking-widest text-[#00ff00]/50 border-l border-[#00ff00]/30 pl-4 uppercase">
                    ACTIVE CONSTRUCTION ZONE
                </div>
            </div>

            <div className="building-data w-full max-w-5xl self-end pointer-events-auto bg-black/40 backdrop-blur-md border border-[#00ff00]/20 p-8">
                <div className="flex flex-col gap-2 w-full text-[10px] md:text-xs font-mono">
                    <div className="flex border-b border-[#00ff00]/30 pb-4 mb-4 text-[#00ff00]/50 uppercase">
                        <div className="w-1/6">ID</div>
                        <div className="w-2/6">EXPERIMENT</div>
                        <div className="w-1/6 hidden md:block">STATUS</div>
                        <div className="w-2/6 hidden md:block">LAST_ERROR</div>
                        <div className="w-1/6 text-right">PROGRESS</div>
                    </div>

                    {experiments.map((exp, i) => (
                        <div key={exp.id} className="exp-row flex items-center py-4 border-b border-[#00ff00]/10 hover:bg-[#00ff00]/10 transition-colors cursor-crosshair group">
                            <div className="w-1/6 text-[#00ff00]/50 group-hover:text-[#00ff00]">{exp.id}</div>
                            <div className="w-2/6 font-bold text-[#00ff00]">{exp.name}</div>
                            <div className={`w-1/6 hidden md:block ${exp.status === 'BROKEN' || exp.status === 'CRASHING' ? 'text-red-500' : 'text-[#00ff00]'}`}>
                                [{exp.status}]
                            </div>
                            <div className="w-2/6 hidden md:block text-[#00ff00]/50 truncate pr-4">
                                {exp.error}
                            </div>
                            <div className="w-1/6 text-right flex items-center justify-end gap-2 text-[#00ff00]">
                                <div className="w-12 h-1 bg-[#00ff00]/20 rounded-full overflow-hidden hidden md:block">
                                    <div className="h-full bg-[#00ff00]" style={{ width: exp.progress }}></div>
                                </div>
                                <span>{exp.progress}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
