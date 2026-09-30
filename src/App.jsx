import { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/Cursor/CustomCursor';
import MeshFlow from './components/Background/MeshFlow';
import Navbar from './components/Navigation/Navbar';
import HeroSection from './components/Hero/HeroSection';
import About from './components/About/About';
import ProjectsSection from './components/Projects/ProjectsSection';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  // Always true to bypass loading screen
  const [loaded, setLoaded] = useState(true);

  // Enable Lenis only after load
  useLenis(loaded);

  // --vh for mobile viewport
  useEffect(() => {
    const set = () =>
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return (
    <>
      <CustomCursor />

      <MeshFlow />

      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <About />
        <Skills />
        <ProjectsSection />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
