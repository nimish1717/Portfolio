import { useMagnetic } from '../../animations/useMagnetic';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const links = [
    { label: 'EMAIL ME', href: 'mailto:hello@example.com', primary: true },
    { label: 'GITHUB', href: '#' },
    { label: 'LINKEDIN', href: '#' },
    { label: 'INSTAGRAM', href: '#' },
];

export const Contact = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={containerRef} className="w-full relative bg-black text-white p-6 md:p-12 py-16 md:py-24 border-t border-white/10">
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
                
                {/* Left: Big headline */}
                <div className="w-full lg:w-5/12 contact-reveal">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[0.9] uppercase">
                        LET'S MAKE<br/>
                        SOMETHING<br/>
                        <span className="text-accent">WEIRD.</span>
                    </h2>
                </div>

                {/* Center: Description */}
                <div className="w-full lg:w-3/12 contact-reveal">
                    <p className="text-sm md:text-base text-white/60 leading-relaxed font-mono">
                        Have an idea?<br/>
                        Want to build something<br/>
                        meaningful and fun?<br/>
                        Let's talk.
                    </p>
                </div>

                {/* Right: Link buttons */}
                <div className="w-full lg:w-4/12 flex flex-col gap-0">
                    {links.map((link, i) => (
                        <a 
                            key={link.label}
                            href={link.href}
                            className={`contact-reveal flex items-center justify-between py-4 border-b border-white/10 group transition-colors hover:bg-white/5 px-4 -mx-4 ${i === 0 ? 'border-t' : ''}`}
                            data-cursor="CLICK"
                        >
                            <span className={`font-mono text-xs md:text-sm uppercase tracking-widest ${link.primary ? 'text-white font-bold' : 'text-white/60'} group-hover:text-accent transition-colors`}>
                                {link.label}
                            </span>
                            <span className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all text-lg">→</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
