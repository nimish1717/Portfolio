import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Marquee = () => {
    const containerRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Setup continuous looping animations
            const tl1 = gsap.to(row1Ref.current, {
                xPercent: -50,
                ease: 'none',
                duration: 10,
                repeat: -1
            });
            
            const tl2 = gsap.to(row2Ref.current, {
                xPercent: 50,
                ease: 'none',
                duration: 15,
                repeat: -1
            });

            // Adjust timeScale based on scroll velocity
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
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
    }, []);

    // Double the words to ensure smooth looping since we are animating to -50% (half width)
    const words1 = ["BUILD", "DESIGN", "EXPERIMENT", "CODE", "BUILD", "DESIGN", "EXPERIMENT", "CODE", "BUILD", "DESIGN", "EXPERIMENT", "CODE", "BUILD", "DESIGN", "EXPERIMENT", "CODE"];
    const words2 = ["BREAK", "REBUILD", "SHIP", "REPEAT", "BREAK", "REBUILD", "SHIP", "REPEAT", "BREAK", "REBUILD", "SHIP", "REPEAT", "BREAK", "REBUILD", "SHIP", "REPEAT"];

    return (
        <section ref={containerRef} className="py-24 overflow-hidden bg-black text-white w-full border-y border-white/5">
            <div className="flex whitespace-nowrap will-change-transform w-fit" ref={row1Ref}>
                {words1.map((word, i) => (
                    <div key={i} className="marquee-text text-[15vw] font-heading font-black px-8 opacity-80 flex items-center gap-8" style={{ WebkitTextStroke: '1px var(--color-text-main)', color: 'transparent' }}>
                        {word}
                        <span className="text-accent text-[5vw]">✱</span>
                    </div>
                ))}
            </div>
            
            <div className="flex whitespace-nowrap will-change-transform w-fit -ml-[100%]" ref={row2Ref}>
                {words2.map((word, i) => (
                    <div key={i} className="marquee-text text-[15vw] font-heading font-black px-8 text-accent flex items-center gap-8">
                        {word}
                        <span className="text-white text-[5vw]">✱</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
