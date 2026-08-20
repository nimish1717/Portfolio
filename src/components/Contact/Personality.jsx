import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export const Personality = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
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
    }, []);
    return (
        <section ref={containerRef} className="h-[40vh] md:h-[50vh] xl:min-h-[300px] w-full relative bg-black overflow-hidden flex flex-col p-6 md:p-12 border-b border-white/10">
            <h2 className="text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase mb-12 flex items-center gap-2 text-white/50">
                <span className="w-1.5 h-1.5 bg-accent"></span> OUTSIDE THE CODE
            </h2>
            
            <div className="absolute inset-0 pointer-events-none mt-20">
                <div className="floating-text absolute top-[20%] left-[15%] font-mono text-xs text-white/60">coffee</div>
                <div className="floating-text absolute top-[30%] right-[20%] font-mono text-xs text-white/40">design</div>
                <div className="floating-text absolute top-[60%] left-[25%] font-mono text-[10px] text-white/30">gym</div>
                <div className="floating-text absolute top-[70%] right-[25%] font-mono text-xs text-white/50 italic">late night ideas</div>
                <div className="floating-text absolute bottom-[20%] left-[40%] font-mono text-[10px] text-white/40">bad ui decisions</div>
                <div className="floating-text absolute top-[45%] left-[10%] font-mono text-xs text-white/50">overthinking animations</div>
                <div className="floating-text absolute top-[50%] right-[10%] font-mono text-xs text-white/30">random thrills</div>
            </div>
        </section>
    );
};
