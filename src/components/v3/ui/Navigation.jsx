"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

const NAV_ITEMS = [
  { label: "WORK", id: "work" },
  { label: "ABOUT", id: "about" },
  { label: "TOOLKIT", id: "toolkit" },
  { label: "LAB", id: "lab" },
  { label: "CONTACT", id: "contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -50, duration: 1.5 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-colors duration-500 ${
          scrolled ? "bg-bg/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div
          className="font-bebas text-2xl tracking-wider cursor-pointer select-none"
          onClick={() => lenis ? lenis.scrollTo(0, { duration: 1.5 }) : window.scrollTo(0,0)}
        >
          N<span className="text-accent">A</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-mono tracking-widest text-white/50 hover:text-white transition-colors uppercase relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all group-hover:w-full"></span>
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-bg transition-colors"
          >
            RESUME ↗
          </a>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-bebas text-5xl tracking-widest hover:text-accent transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm tracking-widest border border-white/20 px-6 py-3 rounded-full mt-4"
            >
              DOWNLOAD RESUME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
