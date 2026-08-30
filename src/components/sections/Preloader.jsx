"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hasVisited] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("na-visited") === "1";
  });

  useEffect(() => {
    // Skip preloader on revisit
    if (hasVisited) {
      onComplete?.();
      return;
    }

    // Counter animation: 0 → 100 over ~2.5s
    let start = null;
    let rafId;
    const duration = 2500;

    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const eased =
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(100);
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("na-visited", "1");
          setTimeout(() => onComplete?.(), 900);
        }, 300);
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [hasVisited, onComplete]);

  // If already visited, render nothing
  if (hasVisited) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9990] bg-bg flex flex-col overflow-hidden"
          exit="exit"
          variants={{
            exit: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
          }}
        >
          {/* Top panel slides up */}
          <motion.div
            className="flex-1 bg-bg"
            variants={{
              exit: {
                y: "-100%",
                transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
              },
            }}
          />
          {/* Bottom panel slides down */}
          <motion.div
            className="flex-1 bg-bg"
            variants={{
              exit: {
                y: "100%",
                transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
              },
            }}
          />

          {/* Content overlay — absolutely positioned so split panels move behind it */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 pointer-events-none z-10">
            {/* Top row */}
            <div className="flex justify-between items-start">
              <motion.span
                className="font-mono text-xs text-fg/40 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Portfolio 2025
              </motion.span>
              <motion.span
                className="font-mono text-xs text-fg/40 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Loading...
              </motion.span>
            </div>

            {/* Center name */}
            <div className="flex flex-col gap-2 overflow-hidden">
              {["NIMISH", "AGRAWAL"].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.div
                    className="text-[clamp(52px,9vw,120px)] leading-none font-bebas text-fg"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + i * 0.12,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div className="flex justify-between items-end">
              <motion.span
                className="font-mono text-xs text-fg/40 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                Frontend Developer · AI/ML · UI/UX
              </motion.span>

              {/* Counter */}
              <motion.div
                className="font-bebas text-[clamp(48px,6vw,80px)] text-accent leading-none tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {String(count).padStart(2, "0")}
              </motion.div>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-accent z-20"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
