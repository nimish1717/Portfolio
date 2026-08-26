"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    // Play animation for 3 seconds then hide
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasVisited", "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden cursor-wait"
        >
          {/* Subtle Grid Background appearing */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
            style={{ perspective: "1000px", transformStyle: "preserve-3d", transform: "rotateX(60deg) scale(2) translateY(-100px)" }}
          />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Split layer text effect */}
            <div className="relative">
              <motion.h1 
                initial={{ opacity: 0, y: 20, filter: "blur(10px)", letterSpacing: "1em" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.1em" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-bold font-mono tracking-widest text-white relative z-20"
              >
                NIMISH AGRAWAL
              </motion.h1>
              
              {/* Glitch layers */}
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: [0, 0.5, 0], x: [-10, 5, -5, 0] }}
                transition={{ duration: 0.8, delay: 0.8, times: [0, 0.2, 0.5, 1] }}
                className="text-4xl md:text-7xl font-bold font-mono tracking-widest text-[#00f0ff] absolute top-0 left-0 mix-blend-screen z-10"
              >
                NIMISH AGRAWAL
              </motion.h1>
              
              <motion.h1 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: [0, 0.5, 0], x: [10, -5, 5, 0] }}
                transition={{ duration: 0.8, delay: 0.8, times: [0, 0.2, 0.5, 1] }}
                className="text-4xl md:text-7xl font-bold font-mono tracking-widest text-[#ff003c] absolute top-0 left-0 mix-blend-screen z-10"
              >
                NIMISH AGRAWAL
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 1, duration: 1 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mt-6 max-w-xs"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono"
            >
              Entering digital workspace...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
