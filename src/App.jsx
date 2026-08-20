import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { useStore } from './store/useStore';
import './index.css';

// Components
import { CustomCursor } from './components/Cursor/CustomCursor';
import { Loader } from './components/Loader/Loader';
import { Navbar } from './components/Navbar/Navbar';
import { GlobalEnvironment } from './components/Background/GlobalEnvironment';

import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Marquee } from './components/Marquee/Marquee';
import { Projects } from './components/Projects/Projects';
import { CurrentlyBuilding } from './components/CurrentlyBuilding/CurrentlyBuilding';
import { DigitalLab } from './components/DigitalLab/DigitalLab';
import { Skills } from './components/Skills/Skills';
import { Journey } from './components/Journey/Journey';
import { Achievements } from './components/Achievements/Achievements';
import { Personality } from './components/Contact/Personality';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const lenisRef = useRef(null);
    const setScrollProgress = useStore((state) => state.setScrollProgress);
    const setScrollVelocity = useStore((state) => state.setScrollVelocity);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.12,
            smoothWheel: true,
            wheelMultiplier: 1.5,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;

        lenis.on('scroll', (e) => {
            ScrollTrigger.update();
            setScrollProgress(e.progress);
            setScrollVelocity(e.velocity);
        });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, [setScrollProgress, setScrollVelocity]);

    return (
        <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-main)] font-sans selection:bg-accent selection:text-black">
            <GlobalEnvironment />
            
            <CustomCursor />
            <Loader />
            <Navbar />
            
            <main className="w-full relative overflow-hidden">
                <Hero />
                <About />
                <Marquee />
                <Projects />
                <CurrentlyBuilding />
                <Skills />
                <DigitalLab />
                <Journey />
                <Achievements />
                <Personality />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
export default App;
