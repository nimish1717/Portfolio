import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const experiments = [
    { id: "EXP-01", name: "FLUID_SIMULATION_WEBGL", status: "CRASHING", error: "OOM on mobile", progress: "45%" },
    { id: "EXP-02", name: "AI_AGENT_UI", status: "ITERATING", error: "None", progress: "80%" },
    { id: "EXP-03", name: "CUSTOM_RENDER_ENGINE", status: "BROKEN", error: "Shader compilation failed", progress: "15%" },
    { id: "EXP-04", name: "TYPOGRAPHY_DISTORTION", status: "STABLE", error: "None", progress: "95%" }
];

export const CurrentlyBuilding = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.exp-row', 
                { opacity: 0, x: -20 },
                { 
                    opacity: 1, 
                    x: 0, 
                    stagger: 0.1, 
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
            
            // Blinking cursor effect
            gsap.to('.blink-cursor', {
                opacity: 0,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "steps(1)"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-[#050505] text-[#00ff00] font-mono p-6 md:p-12 py-24 min-h-[60vh] border-y border-[#00ff00]/20 relative overflow-hidden">
            {/* CRT scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 mix-blend-overlay"></div>
            
            <div className="max-w-5xl mx-auto relative z-20">
                <div className="mb-12">
                    <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-2">
                        &gt; CURRENTLY_BUILDING<span className="blink-cursor">_</span>
                    </h2>
                    <p className="text-xs text-[#00ff00]/60 max-w-md">
                        // I break things to learn how they work. Here are the active, messy, unfinished experiments.
                    </p>
                </div>

                <div className="flex flex-col gap-1 w-full text-[10px] md:text-xs">
                    {/* Header */}
                    <div className="flex border-b border-[#00ff00]/30 pb-2 mb-4 text-[#00ff00]/50 uppercase">
                        <div className="w-1/6">ID</div>
                        <div className="w-2/6">EXPERIMENT</div>
                        <div className="w-1/6 hidden md:block">STATUS</div>
                        <div className="w-2/6 hidden md:block">LAST_ERROR</div>
                        <div className="w-1/6 text-right">PROGRESS</div>
                    </div>

                    {/* Rows */}
                    {experiments.map((exp, i) => (
                        <div key={exp.id} className="exp-row flex items-center py-3 border-b border-[#00ff00]/10 hover:bg-[#00ff00]/10 transition-colors cursor-crosshair group">
                            <div className="w-1/6 text-[#00ff00]/50 group-hover:text-[#00ff00]">{exp.id}</div>
                            <div className="w-2/6 font-bold">{exp.name}</div>
                            <div className={`w-1/6 hidden md:block ${exp.status === 'BROKEN' || exp.status === 'CRASHING' ? 'text-red-500' : 'text-[#00ff00]'}`}>
                                [{exp.status}]
                            </div>
                            <div className="w-2/6 hidden md:block text-[#00ff00]/50 truncate pr-4">
                                {exp.error}
                            </div>
                            <div className="w-1/6 text-right flex items-center justify-end gap-2">
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
