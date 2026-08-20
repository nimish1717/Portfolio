import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useStore } from '../../store/useStore';

export const Personality = () => {
    const containerRef = useRef(null);
    const { setActiveWorld } = useStore();

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('personality'),
                onEnterBack: () => setActiveWorld('personality'),
            });

            const items = gsap.utils.toArray('.floating-text');
            items.forEach((item, i) => {
                // Random floating animation
                gsap.to(item, {
                    y: "random(-20, 20)",
                    x: "random(-20, 20)",
                    rotation: "random(-5, 5)",
                    duration: "random(2, 4)",
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: i * 0.2
                });
                // Scroll parallax
                gsap.to(item, {
                    yPercent: i % 2 === 0 ? -50 : 50,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    return (
        <section ref={containerRef} className="relative min-h-[150vh] w-full pt-[30vh] px-6 md:px-24 pointer-events-none z-10 flex flex-col items-center justify-center">
            
            <div className="z-10 pointer-events-auto text-center">
                <h2 className="text-[5vw] font-heading font-black tracking-tighter uppercase mb-4 text-white mix-blend-difference">
                    BEYOND CODE
                </h2>
                <p className="font-mono text-xs tracking-widest text-[#00aaff] uppercase max-w-sm mx-auto">
                    A distorted reflection of reality.
                </p>
            </div>
            
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-full max-w-5xl relative">
                    <div className="floating-text absolute top-[30%] left-[10%] font-mono text-lg text-white mix-blend-difference font-bold">coffee addiction</div>
                    <div className="floating-text absolute top-[40%] right-[15%] font-mono text-sm text-white mix-blend-difference">design systems</div>
                    <div className="floating-text absolute top-[60%] left-[20%] font-mono text-xl text-white mix-blend-difference font-bold">gym</div>
                    <div className="floating-text absolute top-[70%] right-[25%] font-mono text-md text-white mix-blend-difference italic">late night ideas</div>
                    <div className="floating-text absolute bottom-[30%] left-[40%] font-mono text-sm text-white mix-blend-difference">bad ui decisions</div>
                    <div className="floating-text absolute top-[50%] left-[15%] font-mono text-lg text-[#00aaff] mix-blend-difference">overthinking animations</div>
                    <div className="floating-text absolute top-[55%] right-[10%] font-mono text-sm text-white mix-blend-difference">random thrills</div>
                </div>
            </div>

        </section>
    );
};
