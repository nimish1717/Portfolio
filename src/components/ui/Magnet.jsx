"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export function Magnet({
  children,
  padding = 150,
  disabled = false,
  strength = 1,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < padding) {
        setIsActive(true);
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [padding, disabled, strength]);

  const x = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
      ref={magnetRef}
      className={className}
      style={{
        x,
        y,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
