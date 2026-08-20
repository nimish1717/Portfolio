import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CaseStudyOverlay = ({ project, onClose }) => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';

        if (!overlayRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(overlayRef.current, {
                yPercent: 100,
            }, {
                yPercent: 0,
                duration: 0.8,
                ease: 'expo.inOut'
            })
            .fromTo('.case-study-item', {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power3.out'
            }, "-=0.3");
        }, overlayRef);

        return () => {
            document.body.style.overflow = 'auto';
            ctx.revert();
        };
    }, []);

    const handleClose = () => {
        gsap.to(overlayRef.current, {
            yPercent: 100,
            duration: 0.8,
            ease: 'expo.inOut',
            onComplete: onClose
        });
    };

    const sections = [
        { num: "01", title: "THE IDEA", text: "Conceptualization and vision for a modern digital experience." },
        { num: "02", title: "THE PROBLEM", text: "Identifying friction points in conventional interfaces." },
        { num: "03", title: "THE APPROACH", text: "Designing from first principles with a focus on interaction." },
        { num: "04", title: "THE TECHNOLOGY", text: project.tech.join(" / ") },
        { num: "05", title: "THE INTERACTION", text: "Micro-interactions and fluid motion mapping." },
        { num: "06", title: "THE RESULT", text: "A cohesive, performant, and engaging user journey." },
    ];

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[100] w-full h-full bg-black text-white overflow-y-auto" style={{ backgroundColor: project.bg }}>
            
            <div className="sticky top-0 w-full p-6 md:p-12 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
                <div className="text-xs font-mono tracking-widest uppercase text-white/50">CASE STUDY / {project.id}</div>
                <button onClick={handleClose} className="text-xs font-mono tracking-widest uppercase hover:text-accent transition-colors cursor-pointer" data-cursor="CLICK">
                    [ CLOSE ]
                </button>
            </div>

            <div ref={contentRef} className="max-w-4xl mx-auto px-6 md:px-12 pb-32 pt-12 flex flex-col min-h-screen">
                
                <h1 className="case-study-item text-6xl md:text-[8vw] font-heading font-black uppercase tracking-tighter leading-none mb-24" style={{ color: project.color }}>
                    {project.title}
                </h1>

                <div className="flex flex-col gap-24">
                    {sections.map((sec) => (
                        <div key={sec.num} className="case-study-item flex flex-col md:flex-row gap-8 md:gap-24 items-start border-t border-white/10 pt-8">
                            <div className="flex flex-col w-full md:w-1/3">
                                <span className="text-3xl font-heading font-bold text-white/20 mb-2">{sec.num}</span>
                                <span className="text-sm font-mono tracking-widest uppercase" style={{ color: project.color }}>{sec.title}</span>
                            </div>
                            <div className="w-full md:w-2/3 text-xl md:text-3xl font-heading font-medium leading-snug">
                                {sec.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
