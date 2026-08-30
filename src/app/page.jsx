"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhysicsCursor } from "@/components/ui/PhysicsCursor";
import { IndexNavigation } from "@/components/ui/IndexNavigation";

// We will build these next
import { Chapter01Entry } from "@/components/chapters/Chapter01Entry";
import { Chapter02Identity } from "@/components/chapters/Chapter02Identity";
import { Chapter03Experiments } from "@/components/chapters/Chapter03Experiments";
import { Chapter04Work } from "@/components/chapters/Chapter04Work";
import { Chapter05Thinking } from "@/components/chapters/Chapter05Thinking";
import { Chapter06Contact } from "@/components/chapters/Chapter06Contact";

export default function Home() {
  const mainRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);
    // Any global ScrollTriggers (like progress bars or global color shifts) can go here.
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  if (!mounted) return null; // Prevent all SSR hydration mismatches from extensions

  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <PhysicsCursor />
      <IndexNavigation />

      <main ref={mainRef} className="relative w-full overflow-x-hidden">
        <Chapter01Entry />
        <Chapter02Identity />
        <Chapter03Experiments />
        <Chapter04Work />
        <Chapter05Thinking />
        <Chapter06Contact />
      </main>
    </>
  );
}
