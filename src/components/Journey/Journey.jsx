import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const milestones = [
    { year: '2023', title: 'START', desc: 'Discovered the gap between design and engineering. Started learning frontend basics.' },
    { year: '2024', title: 'BUILD', desc: 'Explored ML, React, and built initial products. Focused on logic and structure.' },
    { year: '2025', title: 'SHIP', desc: 'PhantomPost, major UI/UX challenges. Bridging the gap between code and aesthetics.' },
    { year: '2026', title: 'EXPLORE', desc: 'Creative coding, WebGL, pushing interaction boundaries.' },
    { year: '2027', title: 'NEXT', desc: 'Building systems that shouldn\'t look possible.' }
];

const processSteps = ["IDEA", "BREAK", "DESIGN", "BUILD", "BREAK AGAIN", "SHIP"];

export const Journey = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const processRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            // Process Flow Animation
            const steps = gsap.utils.toArray('.process-step');
            const arrows = gsap.utils.toArray('.process-arrow');
            
            gsap.fromTo([...steps, ...arrows], 
                { opacity: 0, y: 20 },
                {
                    opacity: 1, 
                    y: 0, 
                    stagger: 0.1,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: processRef.current,
                        start: "top 80%",
                        end: "center center",
                        scrub: 1
                    }
                }
            );

            // Draw line on scroll
            gsap.fromTo(lineRef.current, { scaleY: 0 }, {
                scaleY: 1,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom bottom",
                    scrub: 1
                }
            });
            
            // Reveal milestones
            const items = gsap.utils.toArray('.milestone-item');
            items.forEach((item, i) => {
                gsap.fromTo(item, {
                    x: 50,
                    opacity: 0,
                    scale: 0.9
                }, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        end: "center center",
                        scrub: 1
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full relative bg-black text-white p-6 md:p-12 md:py-24 xl:w-2/3 xl:float-right flex flex-col border-t border-l border-white/10 min-h-screen border-b">
            
            <div className="flex justify-between items-start mb-24 flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/3">
                    <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter uppercase mb-4">
                        PROCESS &<br/>JOURNEY
                    </h2>
                    <p className="font-mono text-xs text-white/50 max-w-xs uppercase tracking-widest leading-relaxed">
                        The chaos behind the aesthetic.
                    </p>
                </div>

                <div ref={processRef} className="w-full md:w-2/3 flex flex-wrap items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs font-bold tracking-widest text-white/70">
                    {processSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-4">
                            <span className={`process-step px-3 py-1 border border-white/20 rounded-full ${step.includes('BREAK') ? 'text-accent border-accent/50 bg-accent/5' : ''}`}>
                                {step}
                            </span>
                            {i < processSteps.length - 1 && (
                                <span className="process-arrow text-white/30">→</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="relative flex-1 pl-4 md:pl-24 max-w-3xl">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-24 top-2 bottom-0 w-[1px] bg-white/10">
                    <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-accent to-purple-500"></div>
                </div>

                <div className="flex flex-col gap-24 mt-4">
                    {milestones.map((m, i) => (
                        <div key={m.year} className="milestone-item flex w-full relative pl-12 md:pl-16 group">
                            
                            {/* Year Marker */}
                            <div className="absolute -left-16 md:-left-32 top-0 w-24 text-right hidden md:block">
                                <span className="text-4xl font-heading font-black text-white/10 group-hover:text-white/30 transition-colors duration-500">{m.year}</span>
                            </div>

                            <div className="w-full flex flex-col justify-center">
                                <div className="text-xs font-mono mb-2 flex items-center gap-4">
                                    <span className="text-white/30 md:hidden">{m.year}</span> 
                                    <span className="text-2xl font-heading font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors">{m.title}</span>
                                </div>
                                <p className="text-white/60 text-sm font-mono tracking-wide max-w-md mt-2 leading-relaxed">
                                    {m.desc}
                                </p>
                            </div>

                            {/* Dot */}
                            <div className="absolute left-[-6px] top-2 w-3.5 h-3.5 bg-black border-2 border-white/30 rounded-full z-10 group-hover:border-accent group-hover:bg-accent shadow-[0_0_15px_rgba(204,255,0,0)] group-hover:shadow-[0_0_15px_rgba(204,255,0,0.5)] transition-all duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
