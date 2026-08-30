"use client";

import { motion } from "framer-motion";

export function ContactButton({ label = "Contact Me", onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-all duration-300"
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid #ffffff",
        outlineOffset: "-3px",
      }}
    >
      <span className="relative z-10 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base">
        {label}
      </span>
      {/* Subtle hover glow effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

export function LiveProjectButton({ label = "Live Project", href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 245, 240, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="inline-block rounded-full border-2 border-fg px-8 py-3 sm:px-10 sm:py-3.5 text-fg font-medium uppercase tracking-widest text-sm sm:text-base transition-colors duration-300"
    >
      {label}
    </motion.a>
  );
}
