"use client";

import { useCursor } from "@/components/v3/ui/CustomCursor";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { label: "WORK", href: "work" },
  { label: "ABOUT", href: "about" },
  { label: "TOOLKIT", href: "toolkit" },
  { label: "LAB", href: "lab" },
  { label: "CONTACT", href: "contact" }
];

const SOCIAL_LINKS = [
  { label: "GITHUB", href: "https://github.com/nimishagrawal" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/nimishagrawal" },
  { label: "EMAIL", href: "mailto:nimish.agrawal@example.com" },
  { label: "RESUME", href: "/resume.pdf" }
];

export function Chapter10Footer() {
  const { setCursorVariant, setCursorText } = useCursor();
  const lenis = useLenis();

  const handleNavClick = (id) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.5 });
    }
  };

  return (
    <footer className="w-full bg-[#0D0D0F] text-[#F1EFEA] pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl flex flex-col gap-24 relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">
          
          <div className="flex flex-col gap-6">
            <h2 className="font-bebas text-[5rem] md:text-[8rem] lg:text-[10rem] tracking-tighter leading-[0.75] text-white">
              NIMISH<br/><span className="text-white/40">AGRAWAL</span>
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase border border-white/10 px-3 py-1.5 rounded-full">
                BUILDING DIGITAL EXPERIENCES.
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-16 lg:gap-24">
            {/* Site Nav */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase flex items-center gap-2">
                <div className="w-1 h-1 bg-white/30" /> INDEX
              </span>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map(link => (
                  <button 
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="font-bebas text-2xl md:text-3xl tracking-wide text-white/60 hover:text-white transition-colors group flex items-center justify-between w-32"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-accent">↓</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase flex items-center gap-2">
                <div className="w-1 h-1 bg-white/30" /> SOCIAL
              </span>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map(link => (
                  <a 
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bebas text-2xl md:text-3xl tracking-wide text-white/60 hover:text-white transition-colors group flex items-center justify-between w-32"
                    onMouseEnter={() => {
                      setCursorVariant("text");
                      setCursorText(link.label === "RESUME" ? "PDF" : "VISIT");
                    }}
                    onMouseLeave={() => {
                      setCursorVariant("default");
                      setCursorText("");
                    }}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
            © {new Date().getFullYear()} NIMISH AGRAWAL. ALL RIGHTS RESERVED.
          </span>
          
          <button 
            onClick={() => lenis?.scrollTo(0, { duration: 2 })}
            className="font-mono text-[9px] tracking-[0.2em] text-white/50 hover:text-white transition-colors uppercase flex items-center gap-2"
          >
            BACK TO TOP ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
