import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../../store/useStore';

export const Marquee = () => {
    const containerRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    // Update activeWorld
    const setActiveWorld = useStore((state) => state.setActiveWorld);

    useEffect(() => {
        if (!containerRef.current) return;
        let ctx = gsap.context(() => {
            // Setup continuous looping animations
            const tl1 = gsap.to(row1Ref.current, {
                xPercent: -50,
                ease: 'none',
                duration: 20,
                repeat: -1
            });
            
            const tl2 = gsap.to(row2Ref.current, {
                xPercent: 50,
                ease: 'none',
                duration: 25,
                repeat: -1
            });

            // Adjust timeScale based on scroll velocity and set activeWorld
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => setActiveWorld('marquee'),
                onEnterBack: () => setActiveWorld('marquee'),
                onUpdate: (self) => {
                    const velocity = Math.abs(self.getVelocity());
                    const targetTimeScale = 1 + (velocity / 200); // Scale up speed
                    
                    // Smoothly transition timeScale
                    gsap.to([tl1, tl2], {
                        timeScale: targetTimeScale,
                        duration: 0.2,
                        overwrite: true,
                        onComplete: () => {
                            // Settle back to normal speed when stopped
                            gsap.to([tl1, tl2], {
                                timeScale: 1,
                                duration: 1,
                                ease: 'power2.out'
                            });
                        }
                    });
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    // Double the words to ensure smooth looping since we are animating to -50% (half width)
    const words1 = ["BUILD", "DESIGN", "EXPERIMENT", "CODE", "BUILD", "DESIGN", "EXPERIMENT", "CODE", "BUILD", "DESIGN", "EXPERIMENT", "CODE"];
    const words2 = ["BREAK", "REBUILD", "SHIP", "REPEAT", "BREAK", "REBUILD", "SHIP", "REPEAT", "BREAK", "REBUILD", "SHIP", "REPEAT"];
    const words3 = ["FRONTEND", "WEBGL", "MOTION", "SYSTEMS", "FRONTEND", "WEBGL", "MOTION", "SYSTEMS", "FRONTEND", "WEBGL", "MOTION", "SYSTEMS"];

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden bg-transparent text-white w-full pointer-events-none">
            
            {/* Front Layer */}
            <div className="relative z-10 flex flex-col gap-12">
                <div className="flex whitespace-nowrap w-fit" ref={row1Ref}>
                    {words1.map((word, i) => (
                        <div key={i} className="marquee-text text-[12vw] font-heading font-black px-8 flex items-center gap-8 mix-blend-difference text-white">
                            {word}
                            <span className="text-accent text-[4vw]">✱</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Back Layer (passes behind the canvas) */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full z-[-10] flex flex-col opacity-40">
                <div className="flex whitespace-nowrap w-fit -ml-[50%]" ref={row2Ref}>
                    {words2.map((word, i) => (
                        <div key={i} className="marquee-text text-[15vw] font-heading font-black px-8 text-transparent flex items-center gap-8" style={{ WebkitTextStroke: '2px var(--color-text-main)' }}>
                            {word}
                            <span className="text-white text-[5vw]">✱</span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};
