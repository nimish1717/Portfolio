"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > previous) {
      setHidden(true); // Hide when scrolling down
    } else {
      setHidden(false); // Show when scrolling up
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 pb-4 px-4"
    >
      <nav
        className={cn(
          "flex items-center gap-1 md:gap-2 p-1.5 rounded-full glass transition-all duration-500",
          isScrolled
            ? "shadow-[0_0_30px_rgba(0,240,255,0.15)] border-[var(--accent-muted)] scale-95 md:scale-100 bg-black/60 backdrop-blur-xl"
            : "scale-100 bg-white/5 backdrop-blur-md border-white/10"
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setActiveSection(item.name)}
            className="relative px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-full"
          >
            {activeSection === item.name && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 bg-[var(--accent-muted)] rounded-full border border-[var(--accent)]"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            <span className={cn("relative z-10 transition-colors", activeSection === item.name ? "text-white font-bold" : "")}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
