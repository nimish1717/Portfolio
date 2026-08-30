"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CursorContext";
import { Magnetic } from "@/components/ui/Magnetic";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cursorChangeHandler } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      // Give menu time to close
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[200] mix-blend-difference"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className="flex items-center justify-between px-6 md:px-10 py-5"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Magnetic strength={0.2}>
            <Link
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="font-bebas text-2xl text-white tracking-tight leading-none hover:text-accent transition-colors duration-200"
              onMouseEnter={() => cursorChangeHandler("pointer")}
              onMouseLeave={() => cursorChangeHandler("default")}
              aria-label="Back to top"
            >
              NA.
            </Link>
          </Magnetic>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Magnetic strength={0.15}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-mono text-[11px] text-white/80 hover:text-white uppercase tracking-widest relative group transition-colors duration-200"
                    onMouseEnter={() => cursorChangeHandler("pointer")}
                    onMouseLeave={() => cursorChangeHandler("default")}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                  </button>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 relative z-[300]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onMouseEnter={() => cursorChangeHandler("pointer")}
            onMouseLeave={() => cursorChangeHandler("default")}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-white"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[190] bg-bg flex flex-col justify-center px-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav>
              <ul className="list-none space-y-2" role="list">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.05 * i,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                    >
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="font-bebas text-[clamp(52px,10vw,90px)] text-fg hover:text-accent transition-colors duration-200 leading-tight block"
                      >
                        {link.label}
                      </button>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="absolute bottom-8 left-8 font-mono text-xs text-fg/30 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              nimishagrawal.dev · 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
