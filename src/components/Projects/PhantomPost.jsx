import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useStore } from '../../store/useStore';

export const PhantomPost = () => {
    const containerRef = useRef(null);
    const setActiveWorld = useStore((state) => state.setActiveWorld);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('phantompost'),
                onEnterBack: () => setActiveWorld('phantompost'),
            });
            
            // UI elements assembly sequence
            const sections = gsap.utils.toArray('.phantom-section');
            sections.forEach((section, i) => {
                gsap.fromTo(section, { opacity: 0, y: 100 }, {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: true,
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    return (
        <section ref={containerRef} className="relative min-h-[400vh] w-full pt-[30vh] pb-[50vh] px-6 md:px-24 pointer-events-none z-10 flex flex-col justify-start gap-[50vh]">
            
            <div className="phantom-section w-full max-w-xl pointer-events-auto">
                <h2 className="text-[10vw] font-heading font-black tracking-tighter text-white mix-blend-difference leading-none">
                    PHANTOM<br/>POST
                </h2>
                <div className="mt-8 font-mono text-sm tracking-widest text-[#9333ea] uppercase border-l border-[#9333ea] pl-4">
                    ANONYMOUS SOCIAL COMMUNICATION
                </div>
            </div>

            <div className="phantom-section w-full max-w-sm self-end text-right pointer-events-auto">
                <h3 className="text-3xl font-heading font-black text-white/50 mb-4">THE IDEA</h3>
                <p className="font-mono text-xs text-white/80 leading-relaxed uppercase">
                    A space where thoughts get wings without being tied to an identity. A purely ephemeral interaction network.
                </p>
            </div>

            <div className="phantom-section w-full max-w-sm pointer-events-auto">
                <h3 className="text-3xl font-heading font-black text-white/50 mb-4">THE PROBLEM</h3>
                <p className="font-mono text-xs text-white/80 leading-relaxed uppercase">
                    Identity on the web has become heavy. Every interaction carries the weight of a profile. How do we remove it?
                </p>
            </div>

            <div className="phantom-section w-full max-w-md self-center text-center pointer-events-auto">
                <h3 className="text-3xl font-heading font-black text-white/50 mb-4">THE SYSTEM</h3>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["REACT", "NODE.JS", "MONGODB", "WEBSOCKETS", "REDIS"].map(t => (
                        <span key={t} className="px-3 py-1 border border-[#9333ea]/30 text-[10px] font-mono text-[#9333ea]">{t}</span>
                    ))}
                </div>
            </div>

            <div className="phantom-section w-full max-w-sm self-end text-right pointer-events-auto">
                <h3 className="text-3xl font-heading font-black text-[#9333ea] mb-4">THE RESULT</h3>
                <p className="font-mono text-xs text-white/80 leading-relaxed uppercase mb-8">
                    A real-time socket-driven architecture supporting thousands of concurrent anonymous connections with absolute zero persistence of identity.
                </p>
                <button className="px-6 py-3 border border-white text-white text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                    EXPLORE PROJECT
                </button>
            </div>

        </section>
    );
};
