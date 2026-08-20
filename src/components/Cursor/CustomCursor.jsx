import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorTextRef = useRef(null);
    const [cursorText, setCursorText] = useState('');

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // QuickTo for super smooth performance
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

        const moveCursor = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);

        // Setup interactive elements
        const handleMouseOver = (e) => {
            const target = e.target;
            const interactiveEl = target.closest('[data-cursor], a, button');
            
            if (interactiveEl) {
                const text = interactiveEl.getAttribute('data-cursor') || '';
                setCursorText(text);
                
                // If it's a specific action cursor
                if (text) {
                    gsap.to(cursor, {
                        scale: 5,
                        backgroundColor: 'var(--color-accent-1)', // acid green
                        borderColor: 'transparent',
                        duration: 0.4,
                        ease: 'back.out(1.5)',
                        mixBlendMode: 'normal'
                    });
                } else {
                    // Just a regular hover state (links, buttons without specific text)
                    gsap.to(cursor, {
                        scale: 3,
                        backgroundColor: 'transparent',
                        borderColor: '#fff',
                        borderWidth: '1px',
                        duration: 0.3,
                        ease: 'power2.out',
                        mixBlendMode: 'difference'
                    });
                }
            } else {
                setCursorText('');
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: '#fff',
                    borderColor: 'transparent',
                    duration: 0.3,
                    ease: 'power2.out',
                    mixBlendMode: 'difference'
                });
            }
        };
        window.addEventListener('mouseover', handleMouseOver);
        
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div 
            ref={cursorRef} 
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference hidden md:flex" 
            style={{ willChange: 'transform, width, height' }}
        >
            <span ref={cursorTextRef} className="text-[3px] font-mono font-bold text-black opacity-100 uppercase tracking-widest whitespace-nowrap">
                {cursorText}
            </span>
        </div>
    );
};
