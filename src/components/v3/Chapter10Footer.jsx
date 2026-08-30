"use client";

import { useCursor } from "@/components/v3/ui/CustomCursor";

const NAV_LINKS = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "TOOLKIT", href: "#toolkit" },
  { label: "LAB", href: "#lab" },
  { label: "CONTACT", href: "#contact" }
];

const SOCIAL_LINKS = [
  { label: "GITHUB", href: "https://github.com/nimishagrawal" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/nimishagrawal" },
  { label: "EMAIL", href: "mailto:nimish.agrawal@example.com" },
  { label: "RESUME", href: "/resume.pdf" }
];

export function Chapter10Footer() {
  const { setCursorVariant } = useCursor();

  return (
    <footer className="w-full bg-bg text-fg pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col gap-24">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="font-bebas text-6xl md:text-8xl tracking-tight leading-[0.8] text-white">
              NIMISH<br/>AGRAWAL
            </h2>
            <p className="font-mono text-sm tracking-widest text-fg/50 uppercase mt-4">
              BUILDING DIGITAL EXPERIENCES.
            </p>
          </div>
          
          <div className="flex gap-16">
            {/* Site Nav */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-widest text-fg/30 uppercase mb-2">INDEX</span>
              {NAV_LINKS.map(link => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="font-bebas text-xl md:text-2xl tracking-wide text-fg/70 hover:text-white transition-colors group flex items-center gap-2"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="group-hover:underline decoration-accent underline-offset-4">{link.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent text-sm">↓</span>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-widest text-fg/30 uppercase mb-2">SOCIAL</span>
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bebas text-xl md:text-2xl tracking-wide text-fg/70 hover:text-white transition-colors group flex items-center gap-2"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="group-hover:underline decoration-accent underline-offset-4">{link.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent text-sm">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <span className="font-mono text-[10px] tracking-widest text-fg/40 uppercase">
            © {new Date().getFullYear()} NIMISH AGRAWAL. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-widest text-fg/30 uppercase">AVAILABLE FOR HIRE</span>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
}
