import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useStore } from '../../store/useStore';

export const DigitalLab = () => {
    const containerRef = useRef(null);
    const { setActiveWorld } = useStore();

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('lab'),
                onEnterBack: () => setActiveWorld('lab'),
            });
            
            gsap.fromTo('.lab-text', 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0, 
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    return (
        <section id="lab" ref={containerRef} className="relative min-h-[150vh] w-full pt-[30vh] px-6 md:px-24 pointer-events-none z-10">
            
            <div className="w-full max-w-2xl pointer-events-auto">
                <h2 className="lab-text text-[6vw] font-heading font-black tracking-tighter uppercase text-white mix-blend-difference leading-none mb-4">
                    DIGITAL<br/>LAB
                </h2>
                <div className="lab-text font-mono text-sm tracking-widest text-[#00ffcc] border-l border-[#00ffcc]/30 pl-4 uppercase">
                    EXPERIMENTAL CONTAINMENT
                </div>
                <p className="lab-text font-mono text-[10px] tracking-widest text-white/50 uppercase mt-8 max-w-sm">
                    Move your cursor. The containment units react to physical disturbance.
                </p>
            </div>

            <div className="absolute top-[80vh] right-12 md:right-24 font-mono text-[10px] md:text-xs text-[#00ffcc]/50 text-right pointer-events-auto">
                <div className="border border-[#00ffcc]/20 bg-[#00ffcc]/5 p-4 backdrop-blur-md">
                    [WARNING: UNSTABLE PROTOTYPES]<br/>
                    SYSTEM 08 INITIATED
                </div>
            </div>

        </section>
    );
};
