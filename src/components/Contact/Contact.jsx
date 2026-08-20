import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useStore } from '../../store/useStore';

const links = [
    { label: 'EMAIL ME', href: 'mailto:hello@example.com', primary: true },
    { label: 'GITHUB', href: '#' },
    { label: 'LINKEDIN', href: '#' },
    { label: 'INSTAGRAM', href: '#' },
];

export const Contact = () => {
    const containerRef = useRef(null);
    const { setActiveWorld } = useStore();

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('contact'),
                onEnterBack: () => setActiveWorld('contact'),
            });

            gsap.fromTo('.contact-reveal', 
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    return (
        <section id="contact" ref={containerRef} className="relative min-h-[100vh] w-full pt-[20vh] pb-[20vh] px-6 md:px-24 pointer-events-none z-10">
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start pointer-events-auto">
                
                {/* Left: Big headline */}
                <div className="w-full lg:w-5/12 contact-reveal">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.9] uppercase text-white mix-blend-difference">
                        LET'S MAKE<br/>
                        SOMETHING<br/>
                        <span className="text-[#ffaa00]">WEIRD.</span>
                    </h2>
                </div>

                {/* Center: Description */}
                <div className="w-full lg:w-3/12 contact-reveal">
                    <p className="text-sm md:text-base text-white/60 leading-relaxed font-mono mix-blend-difference">
                        Have an idea?<br/>
                        Want to build something<br/>
                        meaningful and fun?<br/>
                        Let's talk.
                    </p>
                </div>

                {/* Right: Link buttons */}
                <div className="w-full lg:w-4/12 flex flex-col gap-0 border border-white/10 p-6 backdrop-blur-md bg-black/40">
                    {links.map((link, i) => (
                        <a 
                            key={link.label}
                            href={link.href}
                            className={`contact-reveal flex items-center justify-between py-4 border-b border-white/10 group transition-colors hover:bg-white/5 px-4 -mx-4 ${i === 0 ? 'border-t' : ''}`}
                            data-cursor="CLICK"
                        >
                            <span className={`font-mono text-xs md:text-sm uppercase tracking-widest ${link.primary ? 'text-[#ffaa00] font-bold' : 'text-white/60'} group-hover:text-[#ffaa00] transition-colors`}>
                                {link.label}
                            </span>
                            <span className="text-white/30 group-hover:text-[#ffaa00] group-hover:translate-x-1 transition-all text-lg">→</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
