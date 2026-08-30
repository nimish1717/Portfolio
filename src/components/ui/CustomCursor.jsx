"use client";

import { useEffect, useRef, useState } from "react";
import { useCursor } from "./CursorContext";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // High performance setters
    const setX = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });
    const setRotation = gsap.quickTo(cursor, "rotation", { duration: 0.1, ease: "none" });
    const setScaleX = gsap.quickTo(cursor, "scaleX", { duration: 0.1, ease: "none" });
    const setScaleY = gsap.quickTo(cursor, "scaleY", { duration: 0.1, ease: "none" });

    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;
    let raf;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const render = () => {
      // Calculate velocity
      velX = mouse.x - lastX;
      velY = mouse.y - lastY;
      
      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);

      // Apply stretching based on velocity (only if not hovering something big)
      if (cursorType === "default" || cursorType === "pointer") {
        const stretch = Math.min(speed * 0.005, 0.5); // Max stretch 1.5
        setScaleX(1 + stretch);
        setScaleY(1 - stretch * 0.5);
        setRotation(angle);
      } else {
        setScaleX(1);
        setScaleY(1);
        setRotation(0);
      }

      setX(mouse.x);
      setY(mouse.y);

      lastX = mouse.x;
      lastY = mouse.y;

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [cursorType]);

  if (!isVisible) return null;

  // Determine cursor styles based on state
  let width = 12;
  let height = 12;
  let bg = "#f0f0e8";
  let opacity = 1;
  let mixBlend = "difference";

  if (cursorType === "view" || cursorType === "project" || cursorType === "contact") {
    width = 100;
    height = 100;
    bg = "#e8ff47"; // Acid lime
    mixBlend = "normal";
  } else if (cursorType === "pointer" || cursorType === "magnetic") {
    width = 40;
    height = 40;
    bg = "transparent";
    mixBlend = "difference";
  } else if (cursorType === "hidden") {
    opacity = 0;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center rounded-full"
      style={{
        width,
        height,
        backgroundColor: bg,
        opacity,
        mixBlendMode: mixBlend,
        transform: "translate(-50%, -50%)",
        transition: "width 0.4s cubic-bezier(0.76, 0, 0.24, 1), height 0.4s cubic-bezier(0.76, 0, 0.24, 1), background-color 0.3s ease",
        border: cursorType === "pointer" || cursorType === "magnetic" ? "1px solid rgba(240, 240, 232, 0.5)" : "none",
        marginLeft: "-50%", // Offset compensation for GSAP x/y which are relative to top/left 0
        marginTop: "-50%",
      }}
    >
      <span
        ref={textRef}
        className="font-mono text-[10px] text-bg uppercase tracking-widest pointer-events-none"
        style={{
          opacity: cursorText ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {cursorText}
      </span>
    </div>
  );
}
