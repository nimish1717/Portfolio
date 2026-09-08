import { useState, useEffect, Suspense } from 'react';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Career from './components/Career';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loaded]);

  // Set --vh CSS variable for mobile viewport
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', window.innerHeight + 'px');
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <>
      <CustomCursor />

      {!loaded && (
        <LoadingScreen onComplete={() => setLoaded(true)} />
      )}

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Career />
            <Suspense fallback={null}>
              <TechStack />
            </Suspense>
            <Contact />
          </main>
        </>
      )}
    </>
  );
}

export default App;
