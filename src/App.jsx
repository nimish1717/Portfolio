import { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CustomCursor from './components/Cursor/CustomCursor';
import MeshFlow from './components/Background/MeshFlow';
import Navbar from './components/Navigation/Navbar';
import HeroSection from './components/Hero/HeroSection';
import About from './components/About/About';
import ProjectsSection from './components/Projects/ProjectsSection';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Currently from './components/Currently/Currently';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CinematicVideo from './components/Background/CinematicVideo';

function App() {
  const [loaded, setLoaded] = useState(false);

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

      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          {/* Global dot-grid background */}
          <MeshFlow />

          <Navbar />

          <main style={{ position: 'relative', zIndex: 1 }}>
            <CinematicVideo />
            <HeroSection />
            <About />
            <Experience />
            <Skills />
            <ProjectsSection />
            <Currently />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
