import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HeroScene } from './HeroScene';

export const Hero = () => {
    const containerRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const subRef = useRef(null);
    const sceneWrapperRef = useRef(null);
    const metaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the hero section and animate its contents
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=150%', // Scroll for 1.5x height
                    scrub: 1,
                    pin: true,
                }
            });

            tl.to(textRef1.current, {
                xPercent: -50,
                opacity: 0,
                duration: 1
            }, 0)
            .to(textRef2.current, {
                xPercent: 50,
                opacity: 0,
                duration: 1
            }, 0)
            .to([subRef.current, metaRef.current], {
                yPercent: -50,
                opacity: 0,
                duration: 0.5
            }, 0)
            .to(sceneWrapperRef.current, {
                scale: 5,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.in'
            }, 0);

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-black z-10">
            {/* 3D Canvas Background */}
            <div ref={sceneWrapperRef} className="absolute inset-0 w-full h-full z-0 opacity-90 mix-blend-screen pointer-events-auto flex justify-center items-center origin-center">
                <div className="w-full h-full md:w-[120%] md:h-[120%]">
                    <HeroScene />
                </div>
            </div>

            <div className="relative z-10 w-full px-6 md:px-12 pointer-events-none flex flex-col justify-center h-full pt-20">
                
                <div className="flex flex-col md:flex-row justify-between w-full h-full">
                    {/* Left Column: Big Text */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] font-heading font-black tracking-tighter uppercase mix-blend-difference text-white">
                            <div ref={textRef1} className="origin-left">NIMISH</div>
                            <div ref={textRef2} className="origin-right">AGRAWAL</div>
                        </h1>
                        <div ref={subRef} className="mt-8 md:mt-12 text-sm md:text-lg max-w-sm font-mono tracking-wide uppercase text-white/80 border-l-2 border-accent pl-4">
                            I BUILD DIGITAL<br />
                            EXPERIENCES<br />
                            THAT <span className="text-accent">LIVE</span> ONLINE.
                        </div>
                    </div>

                    {/* Right Column: Metadata */}
                    <div ref={metaRef} className="flex flex-col justify-end text-[10px] md:text-xs font-mono tracking-widest text-white/50 uppercase pb-12 gap-1 text-right">
                        <div>COMPUTER ENGINEERING</div>
                        <div>FRONTEND DEVELOPER</div>
                        <div>AI / ML</div>
                        <div>UI / UX</div>
                        <div className="text-accent">CREATIVE TECHNOLOGY</div>
                    </div>
                </div>
                
                <div className="absolute bottom-12 left-6 md:left-12 flex justify-start items-center w-full uppercase text-[10px] md:text-xs font-mono tracking-widest text-white/40">
                    <div className="flex items-center gap-4">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                        <span>SCROLL TO EXPLORE</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
