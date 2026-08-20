import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export const Achievements = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            // Counter animation for numbers
            const counters = gsap.utils.toArray('.counter-val');
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target') || '0');
                const prefix = counter.getAttribute('data-prefix') || '';
                const suffix = counter.getAttribute('data-suffix') || '';
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 80%",
                    },
                    onUpdate: function () {
                        counter.innerHTML = `${prefix}${Math.ceil(parseFloat(this.targets()[0].innerHTML))}${suffix}`;
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);
    return (
        <section ref={containerRef} className="w-full relative bg-black text-white p-6 md:p-12 min-h-[50vh] md:min-h-screen xl:min-h-[600px] flex flex-col overflow-hidden">
            <h2 className="text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase mb-12 flex items-center gap-2 text-white/50">
                <span className="w-1.5 h-1.5 bg-accent"></span> ACHIEVEMENTS
            </h2>
            
            <div className="flex-1 flex flex-col justify-center relative">
                {/* Background Globe Placeholder */}
                <div className="absolute right-0 bottom-0 w-64 h-64 border border-white/5 rounded-full mix-blend-screen opacity-20 bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] pointer-events-none translate-x-1/4 translate-y-1/4"></div>
                
                <div className="flex flex-col mb-12">
                    <div className="text-[15vw] md:text-6xl lg:text-7xl font-heading font-black leading-none text-white tracking-tighter">
                        <span className="counter-val" data-target="100" data-suffix="K+">100K+</span>
                    </div>
                    <h3 className="text-sm font-mono tracking-widest mt-2 uppercase text-white/80">APPLICATIONS<br/>COMPETED</h3>
                    <p className="mt-8 text-[10px] text-white/40 font-mono max-w-[150px] uppercase border-l border-white/20 pl-2">
                        Amazon ML Summer School.<br />Selected participant.
                    </p>
                </div>

                <div className="flex flex-col relative z-10">
                    <h3 className="text-3xl md:text-4xl font-heading font-black tracking-tighter leading-none mb-4 uppercase">TOP<br/>COHORT</h3>
                    <p className="mt-2 text-[10px] text-white/40 font-mono max-w-[150px] uppercase border-l border-white/20 pl-2">
                        JPMorgan Chase Code for Good.<br />Selected participant.
                    </p>
                </div>
            </div>
        </section>
    );
};
