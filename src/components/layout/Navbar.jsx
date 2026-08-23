"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section intersection logic can be expanded here
      // For now, it relies on basic scrolling or click
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 pb-4 px-4 transition-all duration-300",
        isScrolled ? "bg-transparent" : "bg-transparent",
      )}
    >
      <nav
        className={cn(
          "flex items-center gap-2 p-1.5 rounded-full glass transition-all duration-300",
          isScrolled
            ? "shadow-[0_0_20px_rgba(0,240,255,0.1)] border-[var(--accent-muted)]"
            : "",
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setActiveSection(item.name)}
            className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-full"
          >
            {activeSection === item.name && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
