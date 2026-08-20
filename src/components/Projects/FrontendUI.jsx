import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useStore } from '../../store/useStore';

export const FrontendUI = () => {
    const containerRef = useRef(null);
    const setActiveWorld = useStore((state) => state.setActiveWorld);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('frontend'),
                onEnterBack: () => setActiveWorld('frontend'),
            });
            
            const sections = gsap.utils.toArray('.frontend-section');
            sections.forEach((section) => {
                gsap.fromTo(section, { opacity: 0, y: 50 }, {
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
        <section ref={containerRef} className="relative min-h-[400vh] w-full pt-[30vh] pb-[50vh] px-6 md:px-24 pointer-events-none z-10 flex flex-col justify-start gap-[60vh]">
            
            <div className="frontend-section w-full max-w-2xl pointer-events-auto">
                <h2 className="text-[8vw] md:text-[6vw] font-heading font-black tracking-tighter text-white leading-none mb-4">
                    FRONTEND<br/>& UI/UX
                </h2>
                <div className="font-mono text-sm tracking-widest text-blue-400 border-l border-blue-400 pl-4 uppercase">
                    INTERACTIVE DIGITAL EXPERIENCES
                </div>
            </div>

            <div className="frontend-section w-full max-w-sm self-end pointer-events-auto">
                <h3 className="text-3xl font-heading font-black text-white/80 mb-4 text-right">THE PHILOSOPHY</h3>
                <p className="font-mono text-xs text-white/70 leading-relaxed uppercase text-right">
                    The web is not a printed page. It is a spatial environment. Interfaces should feel physical, responsive, and alive.
                </p>
            </div>

            <div className="frontend-section w-full max-w-md pointer-events-auto">
                <h3 className="text-3xl font-heading font-black text-blue-400 mb-4">THE TOOLKIT</h3>
                <div className="grid grid-cols-2 gap-4 font-mono text-xs text-white/80">
                    <div className="border border-white/10 p-4 hover:border-blue-400/50 transition-colors">
                        <span className="text-blue-400 font-bold block mb-1">REACT / TS</span>
                        <span>COMPONENT ARCHITECTURE</span>
                    </div>
                    <div className="border border-white/10 p-4 hover:border-blue-400/50 transition-colors">
                        <span className="text-blue-400 font-bold block mb-1">GSAP</span>
                        <span>COMPLEX TIMELINES</span>
                    </div>
                    <div className="border border-white/10 p-4 hover:border-blue-400/50 transition-colors">
                        <span className="text-blue-400 font-bold block mb-1">THREE.JS</span>
                        <span>WEBGL & SHADERS</span>
                    </div>
                    <div className="border border-white/10 p-4 hover:border-blue-400/50 transition-colors">
                        <span className="text-blue-400 font-bold block mb-1">TAILWIND</span>
                        <span>UTILITY STYLING</span>
                    </div>
                </div>
            </div>

            <div className="frontend-section w-full max-w-sm self-center text-center pointer-events-auto">
                <button className="px-8 py-4 bg-white text-black text-sm font-mono font-bold uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-colors">
                    EXPLORE PROTOTYPES
                </button>
            </div>

        </section>
    );
};
