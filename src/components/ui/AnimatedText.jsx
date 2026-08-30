"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Character({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative inline-block">
      <span className="absolute opacity-0">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function Word({ children, progress, range }) {
  const amount = children.length;
  const step = 1 / amount;
  return (
    <span className="relative inline-block mr-[0.25em] mt-2">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step * (range[1] - range[0]);
        const end = range[0] + (i + 1) * step * (range[1] - range[0]);
        return (
          <Character key={`char_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Character>
        );
      })}
    </span>
  );
}

export function AnimatedText({ text, className = "" }) {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.3"], // Begins revealing slightly above bottom, finishes revealing slightly above center
  });

  const words = text.split(" ");

  return (
    <p ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`word_${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
