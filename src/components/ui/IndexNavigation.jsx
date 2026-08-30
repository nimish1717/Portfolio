"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./PhysicsCursor";

const navItems = [
  { id: "chapter-01", label: "01. ENTRY" },
  { id: "chapter-02", label: "02. IDENTITY" },
  { id: "chapter-03", label: "03. EXPERIMENTS" },
  { id: "chapter-04", label: "04. WORK" },
  { id: "chapter-05", label: "05. THINKING" },
  { id: "chapter-06", label: "06. CONTACT" },
];

export function IndexNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setCursorState } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers = navItems.map((item, i) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

    return () => triggers.forEach((t) => t && t.kill());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-4">
      {navItems.map((item, i) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          onMouseEnter={() => setCursorState("menu")}
          onMouseLeave={() => setCursorState("default")}
          className="group flex items-center justify-end gap-3 cursor-none text-right"
        >
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-500 ease-out ${
              activeIndex === i
                ? "text-accent opacity-100 translate-x-0"
                : "text-fg/30 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:text-fg/60"
            }`}
          >
            {item.label}
          </span>
          <div
            className={`h-px transition-all duration-500 ease-out ${
              activeIndex === i
                ? "w-8 bg-accent"
                : "w-2 bg-border group-hover:w-4 group-hover:bg-fg/50"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
