import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './index.css';
// We'll import components here later as we build them.
import { CustomCursor } from './components/Cursor/CustomCursor';
import { Loader } from './components/Loader/Loader';
import { Navbar } from './components/Navbar/Navbar';
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
    useEffect(() => {
        // Initialize Lenis for smoother scrolling using lerp
        const lenis = new Lenis({
            lerp: 0.12,
            smoothWheel: true,
            wheelMultiplier: 1.5,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;
        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);
    return (<div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-main)] font-sans selection:bg-accent selection:text-black">
      {/* Global background particles */}
      <div className="global-particles" aria-hidden="true" />
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
        
        <div className="flex flex-col xl:flex-row w-full bg-black">
          <DigitalLab />
          
          <div className="w-full xl:w-2/3 flex flex-col md:flex-row border-b xl:border-b-0 border-white/10">
            <div className="w-full md:w-1/2 flex flex-col xl:flex-row border-r border-white/10">
              <div className="w-full xl:w-1/2 flex flex-col border-b xl:border-b-0 xl:border-r border-white/10">
                <Journey />
              </div>
              <div className="w-full xl:w-1/2 flex flex-col">
                <Achievements />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col">
              <Personality />
              <Contact />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>);
}
export default App;
