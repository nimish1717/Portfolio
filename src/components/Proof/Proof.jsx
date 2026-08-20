import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useStore } from '../../store/useStore';

export const Proof = () => {
    const containerRef = useRef(null);
    const { setActiveWorld } = useStore();

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('proof'),
                onEnterBack: () => setActiveWorld('proof'),
            });
            
            gsap.fromTo('.proof-item', 
                { opacity: 0, x: 50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.proof-list',
                        start: 'top 80%',
                        scrub: true,
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    return (
        <section ref={containerRef} className="relative min-h-[200vh] w-full pt-[30vh] pb-[50vh] px-6 md:px-24 pointer-events-none z-10 flex flex-col justify-start gap-[20vh]">
            
            <div className="w-full max-w-2xl pointer-events-auto">
                <h2 className="text-[6vw] font-heading font-black tracking-tighter uppercase text-white mix-blend-difference leading-none mb-4">
                    PROOF
                </h2>
                <div className="font-mono text-sm tracking-widest text-[#ff3366] border-l border-[#ff3366]/30 pl-4 uppercase">
                    EXPERIENCE & RECOGNITION
                </div>
            </div>

            <div className="proof-list w-full max-w-xl self-end pointer-events-auto flex flex-col gap-12 mt-12">
                
                <div className="proof-item flex flex-col gap-2">
                    <div className="text-[10px] font-mono tracking-widest text-[#ff3366]">2023 - PRESENT</div>
                    <h3 className="text-2xl font-heading font-black text-white">LEAD CREATIVE ENGINEER</h3>
                    <p className="font-mono text-xs text-white/50 uppercase">STUDIO FREIGHT</p>
                    <p className="font-mono text-xs text-white/30 uppercase mt-2 border-l border-white/10 pl-4">
                        Led a team of 4 engineers building awwwards-winning interactive experiences for global brands.
                    </p>
                </div>

                <div className="proof-item flex flex-col gap-2">
                    <div className="text-[10px] font-mono tracking-widest text-[#ff3366]">2022</div>
                    <h3 className="text-2xl font-heading font-black text-white">AWWWARDS SITE OF THE DAY</h3>
                    <p className="font-mono text-xs text-white/50 uppercase">PHANTOMPOST LAUNCH</p>
                    <p className="font-mono text-xs text-white/30 uppercase mt-2 border-l border-white/10 pl-4">
                        Recognized for outstanding creative direction and technical execution in WebGL.
                    </p>
                </div>

                <div className="proof-item flex flex-col gap-2">
                    <div className="text-[10px] font-mono tracking-widest text-[#ff3366]">2021 - 2023</div>
                    <h3 className="text-2xl font-heading font-black text-white">FULLSTACK DEVELOPER</h3>
                    <p className="font-mono text-xs text-white/50 uppercase">TECH INNOVATION LABS</p>
                    <p className="font-mono text-xs text-white/30 uppercase mt-2 border-l border-white/10 pl-4">
                        Architected high-performance Node.js microservices and React frontends handling 1M+ daily requests.
                    </p>
                </div>
                
                <div className="proof-item flex flex-col gap-2 mt-8">
                    <button className="self-start px-6 py-3 border border-[#ff3366]/50 text-[#ff3366] text-xs font-mono uppercase tracking-widest hover:bg-[#ff3366] hover:text-white transition-colors">
                        DOWNLOAD RESUME
                    </button>
                </div>

            </div>

        </section>
    );
};
