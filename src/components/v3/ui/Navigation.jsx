"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";

const NAV_ITEMS = [
  { label: "ENTRY", id: "entry" },
  { label: "SIGNAL", id: "signal" },
  { label: "ABOUT", id: "about" },
  { label: "TOOLKIT", id: "toolkit" },
  { label: "WORK", id: "work" },
  { label: "EXPERIENCE", id: "experience" },
  { label: "LAB", id: "lab" },
  { label: "NOW", id: "now" },
  { label: "CONTACT", id: "contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("entry");
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section tracker
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
      let current = "entry";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    setCmdOpen(false);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.5 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-colors duration-500 mix-blend-difference ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
      >
        <div
          className="font-bebas text-2xl tracking-wider cursor-pointer select-none text-white flex items-center gap-4"
          onClick={() => lenis ? lenis.scrollTo(0, { duration: 1.5 }) : window.scrollTo(0,0)}
        >
          <span>N<span className="text-accent">A</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex gap-4 items-center">
            {NAV_ITEMS.filter(item => ["work", "about", "toolkit", "lab", "contact"].includes(item.id)).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-[10px] font-mono tracking-widest uppercase relative group transition-colors ${
                  activeSection === item.id ? "text-accent" : "text-white/50 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-md text-[10px] font-mono tracking-widest text-white/50 hover:text-white hover:border-white/50 transition-colors"
          >
            <span>MENU</span>
            <span className="bg-white/10 px-1 rounded">⌘K</span>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-50 relative w-8 h-8 justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-[2px] bg-white transition-transform ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`}></span>
          <span className={`block w-6 h-[2px] bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-[2px] bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
        </button>
      </header>

      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* CMD+K Menu */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setCmdOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-[#17181B] border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0D0D0F]">
                <span className="font-mono text-xs tracking-widest text-white/40">COMMAND MENU</span>
                <span className="font-mono text-[10px] tracking-widest text-white/40 bg-white/5 px-2 py-1 rounded">ESC TO CLOSE</span>
              </div>
              <div className="p-2 max-h-[60vh] overflow-y-auto">
                <div className="flex flex-col gap-1 p-2">
                  <span className="font-mono text-[10px] tracking-widest text-accent mb-2 px-2">NAVIGATION</span>
                  {NAV_ITEMS.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="text-left font-bebas text-2xl md:text-3xl tracking-wide px-4 py-3 hover:bg-white/5 rounded-lg text-white/70 hover:text-white transition-colors group flex justify-between items-center"
                    >
                      <span>GO TO {item.label}</span>
                      <span className="font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-white/30 tracking-widest">0{i+1}</span>
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col gap-1 p-2 mt-4 border-t border-white/5 pt-4">
                  <span className="font-mono text-[10px] tracking-widest text-accent mb-2 px-2">EXTERNAL</span>
                  <a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-left font-bebas text-xl md:text-2xl tracking-wide px-4 py-2 hover:bg-white/5 rounded-lg text-white/70 hover:text-white transition-colors flex justify-between items-center">
                    DOWNLOAD RESUME
                  </a>
                  <a href="https://github.com/nimishagrawal" target="_blank" rel="noreferrer" className="text-left font-bebas text-xl md:text-2xl tracking-wide px-4 py-2 hover:bg-white/5 rounded-lg text-white/70 hover:text-white transition-colors flex justify-between items-center">
                    GITHUB
                  </a>
                  <a href="https://linkedin.com/in/nimishagrawal" target="_blank" rel="noreferrer" className="text-left font-bebas text-xl md:text-2xl tracking-wide px-4 py-2 hover:bg-white/5 rounded-lg text-white/70 hover:text-white transition-colors flex justify-between items-center">
                    LINKEDIN
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0D0D0F] flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-bebas text-5xl tracking-widest hover:text-accent transition-colors text-white"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm tracking-widest border border-white/20 px-6 py-3 rounded-full mt-4 text-white"
            >
              DOWNLOAD RESUME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
