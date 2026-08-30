"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * SplitText — animates each word (or char) with a clip reveal from below.
 *
 * Props:
 *   text        – string to split
 *   el          – "h1" | "h2" | "p" | "span" etc.
 *   className   – class applied to the outer wrapper
 *   delay       – initial delay before animation (seconds)
 *   stagger     – stagger between words (seconds)
 *   duration    – animation duration per word (seconds)
 *   once        – only animate once (default true)
 *   splitBy     – "words" | "chars" (default "words")
 */
export function SplitText({
  text = "",
  el: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.08,
  duration = 0.85,
  once = true,
  splitBy = "words",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const tokens =
    splitBy === "chars"
      ? text.split("").map((c) => (c === " " ? "\u00A0" : c))
      : text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-hidden
      >
        {tokens.map((token, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ marginRight: splitBy === "words" ? "0.3em" : undefined }}
          >
            <motion.span className="inline-block" variants={child}>
              {token}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
