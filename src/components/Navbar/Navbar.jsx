import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
export const Navbar = () => {
    const navRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 50) {
                if (currentScrollY > lastScrollY) {
                    setIsVisible(false); // Scrolling down
                } else {
                    setIsVisible(true); // Scrolling up
                }
            } else {
                setIsVisible(true); // At top
            }
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        if (navRef.current) {
            gsap.to(navRef.current, {
                yPercent: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, [isVisible]);
    return (<nav ref={navRef} className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 mix-blend-difference flex justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest">
      <div className="font-heading font-black text-xl tracking-tighter w-1/4">N/A</div>
      
        <ul className="hidden md:flex justify-center gap-12 w-2/4">
          <li data-cursor="VIEW"><button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer">WORK</button></li>
          <li data-cursor="VIEW"><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer">ABOUT</button></li>
          <li data-cursor="VIEW"><button onClick={() => document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer">LAB</button></li>
          <li data-cursor="VIEW"><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer">CONTACT</button></li>
        </ul>
      
      <div className="w-1/4 flex justify-end">
        <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors" data-cursor="CLICK">
          AVAILABLE FOR WORK <span className="w-2 h-2 rounded-full bg-accent"></span>
        </button>
        {/* Mobile menu toggle */}
        <button className="block md:hidden" data-cursor="OPEN">
          MENU
        </button>
      </div>
    </nav>);
};
