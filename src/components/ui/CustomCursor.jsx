"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { cursorType } = useCursor();

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 240, 255, 0)", // Fix Framer Motion transparent animation bug
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference",
    },
    pointer: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "var(--accent)",
      border: "none",
      mixBlendMode: "difference",
      scale: 1.2,
    },
    view: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "var(--accent)",
      border: "none",
      mixBlendMode: "normal",
      scale: 1,
    }
  };

  // Only render on desktop to prevent issues on touch devices
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-black font-bold text-sm tracking-widest"
        variants={variants}
        animate={cursorType}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        {cursorType === "view" && <span>VIEW</span>}
      </motion.div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          body {
            cursor: none;
          }
          a, button, [role="button"] {
            cursor: none;
          }
        }
      `}} />
    </>
  );
}
