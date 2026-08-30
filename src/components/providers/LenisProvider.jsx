"use client";

import { createContext, useContext, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin once at module level (idempotent)
gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;
    let tickerFn;

    async function init() {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Sync Lenis scroll events with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis via GSAP ticker so they share the same RAF loop
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    init();

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
