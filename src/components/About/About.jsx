import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const About = () => {
    const containerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const line4Ref = useRef(null);
    const invertWordRef = useRef(null);
    const introRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'center center',
                    scrub: 1,
                }
            });

            // Multi-directional line animations
            tl.fromTo(line1Ref.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, 0)
              .fromTo(line2Ref.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, 0.1)
              .fromTo(line3Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, 0.2)
              .fromTo(line4Ref.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 }, 0.3);

            // Invert word
            tl.to(invertWordRef.current, { 
                backgroundColor: 'var(--color-text-main)', 
                color: 'var(--color-bg)',
                duration: 0.1,
                yoyo: true,
                repeat: 3
            }, 0.2);

            // Reveal intro text
            gsap.fromTo(introRef.current, { y: 50, opacity: 0 }, {
                scrollTrigger: {
                    trigger: introRef.current,
                    start: 'top 90%',
                    end: 'center center',
                    scrub: 1,
                },
                y: 0,
                opacity: 1
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="about" className="relative w-full py-32 px-6 md:px-12 flex flex-col justify-center min-h-[120vh] bg-black text-white">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-[95vw] mx-auto w-full relative z-10 flex flex-col justify-between h-full">
                
                <div className="text-[12vw] md:text-[9vw] font-heading font-black leading-[0.85] tracking-tighter uppercase w-full flex flex-col items-start gap-2 md:gap-4 overflow-hidden">
                    <div ref={line1Ref} className="origin-left">I LIKE BUILDING</div>
                    <div ref={line2Ref} className="origin-right text-right self-end md:self-auto md:text-left text-white/50">THINGS THAT</div>
                    <div ref={line3Ref} className="origin-bottom">SHOULDN'T</div>
                    <div ref={line4Ref} className="origin-center text-accent flex gap-4">
                        LOOK <span ref={invertWordRef} className="px-4 transition-colors">POSSIBLE.</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-32 gap-12">
                    
                    <div ref={introRef} className="w-full md:w-1/2 max-w-xl text-sm md:text-base font-mono leading-relaxed text-white/70">
                        "I'm Nimish, a Computer Engineering student who enjoys turning ideas into interactive, meaningful and slightly chaotic digital experiences."
                    </div>

                    <div className="w-full md:w-1/3 flex flex-col gap-6 text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/40">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>LOCATION</span>
                            <span className="text-white">BASED IN INDIA</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>EXPERIENCE</span>
                            <span className="text-white">BUILDING SINCE 2023</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>FOCUS 01</span>
                            <span className="text-white">FRONTEND / AI / ML</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>FOCUS 02</span>
                            <span className="text-white">DESIGN / INTERACTION</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
