"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  // High performance spring physics
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  // Slower spring for the trail effect
  const trailSpringConfig = { damping: 30, stiffness: 100, mass: 1 };
  const trailX = useSpring(0, trailSpringConfig);
  const trailY = useSpring(0, trailSpringConfig);

  useEffect(() => {
    // Disable on mobile/touch devices for performance
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const updateMousePosition = (e) => {
      if (isMobile) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY, trailX, trailY, isMobile]);

  // Handle global hiding of native cursor when custom cursor is active
  useEffect(() => {
    if (!isMobile) {
      document.documentElement.classList.add('custom-cursor-active');
    } else {
      document.documentElement.classList.remove('custom-cursor-active');
    }
  }, [isMobile]);

  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "#D7E2EA",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "difference",
      opacity: 1
    },
    hover: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(215, 226, 234, 0.1)",
      border: "1px solid rgba(215, 226, 234, 0.5)",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "normal",
      opacity: 1
    },
    text: {
      height: 80,
      width: 80,
      backgroundColor: "#D7E2EA",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "difference",
      opacity: 1
    },
    project: {
      height: 120,
      width: 120,
      backgroundColor: "rgba(215, 226, 234, 0)",
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(215, 226, 234, 0.2)",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "normal",
      opacity: 1
    },
    hidden: {
      opacity: 0,
      height: 0,
      width: 0,
      x: "-50%",
      y: "-50%",
    }
  };

  return (
    <CursorContext.Provider value={{ setCursorVariant, setCursorText }}>
      {children}
      {!isMobile && (
        <>
          {/* Main Cursor */}
          <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-[#0C0C0C] font-inter font-bold text-xs uppercase tracking-widest text-center"
            style={{ x: cursorX, y: cursorY }}
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
          >
            {(cursorVariant === "text" || cursorVariant === "project") && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cursorVariant === "project" ? "text-[#D7E2EA]" : ""}
              >
                {cursorText}
              </motion.span>
            )}
          </motion.div>
          
          {/* Mouse Trail */}
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D7E2EA]/20 pointer-events-none z-[9998]"
            style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
            animate={{ 
              opacity: cursorVariant === "default" ? 1 : 0,
              scale: cursorVariant === "default" ? 1 : 0
            }}
          />
        </>
      )}
    </CursorContext.Provider>
  );
}
