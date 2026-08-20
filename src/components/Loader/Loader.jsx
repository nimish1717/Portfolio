import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Loader = () => {
    const loaderRef = useRef(null);
    const metaRef = useRef(null);
    const nimishRef = useRef(null);
    const agrawalRef = useRef(null);
    const containerRef = useRef(null);
    const scanlineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (loaderRef.current) {
                        // Keep loader container in DOM but pointer-events-none, 
                        // or fade it out completely to reveal Hero below.
                        gsap.to(loaderRef.current, {
                            opacity: 0,
                            duration: 1,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                loaderRef.current.style.display = 'none';
                            }
                        });
                    }
                }
            });

            // 1. Start dark, reveal metadata
            tl.to(metaRef.current, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }, 0.5);

            // 2. Magnetic pull of "NIMISH" letters
            const chars = gsap.utils.toArray('.nimish-char');
            
            // Set initial random scattered positions
            gsap.set(chars, {
                x: () => gsap.utils.random(-window.innerWidth/2, window.innerWidth/2),
                y: () => gsap.utils.random(-window.innerHeight/2, window.innerHeight/2),
                rotationZ: () => gsap.utils.random(-90, 90),
                opacity: 0,
                scale: 0.5
            });

            tl.to(chars, {
                x: 0,
                y: 0,
                rotationZ: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'expo.out',
                stagger: 0.1
            }, 1.5);

            // 3. Scanline effect over NIMISH
            tl.fromTo(scanlineRef.current, {
                yPercent: -100,
                opacity: 0
            }, {
                yPercent: 100,
                opacity: 0.8,
                duration: 0.5,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: 1
            }, 3);

            // Quick distortion effect
            tl.to(nimishRef.current, {
                skewX: 10,
                scaleY: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            }, 3);

            // 4. AGRAWAL forms underneath
            tl.fromTo(agrawalRef.current, {
                y: 20,
                opacity: 0,
                clipPath: 'inset(100% 0 0 0)'
            }, {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0 0 0)',
                duration: 0.8,
                ease: 'power3.out'
            }, 3.5);

            // 5. Compression into center
            tl.to(containerRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 1,
                ease: 'expo.inOut'
            }, 4.5);
            
            tl.to(metaRef.current, {
                opacity: 0,
                duration: 0.5
            }, 4.5);

        }, loaderRef);
        return () => ctx.revert();
    }, []);

    const name = "NIMISH".split("");

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[9000] bg-black text-white flex flex-col items-center justify-center overflow-hidden">
            
            {/* Metadata */}
            <div ref={metaRef} className="absolute top-8 left-8 font-mono text-[10px] uppercase tracking-widest text-white/50 opacity-0 flex flex-col gap-1">
                <span>NIMISH AGRAWAL</span>
                <span>SYSTEM / 001</span>
                <span>CREATIVE ENGINEERING</span>
                <span>INDIA</span>
            </div>

            {/* Main Composition */}
            <div ref={containerRef} className="relative flex flex-col items-center justify-center mix-blend-difference z-10">
                <div ref={nimishRef} className="relative font-heading font-black text-6xl md:text-[8vw] tracking-tighter leading-none flex overflow-hidden">
                    {name.map((char, i) => (
                        <span key={i} className="nimish-char inline-block">{char}</span>
                    ))}
                    <div ref={scanlineRef} className="absolute inset-0 w-full h-[2px] bg-accent opacity-0 pointer-events-none"></div>
                </div>
                
                <div ref={agrawalRef} className="font-heading font-black text-5xl md:text-[6vw] tracking-tighter leading-none text-white/80 mt-[-1vw]">
                    AGRAWAL
                </div>
            </div>
            
            {/* Background grain/noise overlay for cinematic feel */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
    );
};
