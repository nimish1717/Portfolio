"use client";

import { useRef, useCallback } from "react";

/**
 * Magnetic — wraps children and applies a magnetic pull toward the cursor
 * on hover. Uses requestAnimationFrame for smooth GPU-driven transforms.
 *
 * Props:
 *   strength  – how strong the pull is (0–1, default 0.35)
 *   className – wrapper className
 */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const bounds = useRef(null);
  const rafId = useRef(null);
  const current = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    if (!bounds.current) {
      bounds.current = el.getBoundingClientRect();
    }

    const b = bounds.current;
    const cx = b.left + b.width / 2;
    const cy = b.top + b.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;

    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const ease = 0.14;
      current.current.x += (dx - current.current.x) * ease;
      current.current.y += (dy - current.current.y) * ease;
      el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
    });
  }, [strength]);

  const onMouseEnter = useCallback(() => {
    const el = ref.current;
    if (el) bounds.current = el.getBoundingClientRect();
  }, []);

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    const el = ref.current;
    if (!el) return;

    // Spring back to origin
    let { x, y } = current.current;
    function springBack() {
      x *= 0.7;
      y *= 0.7;
      el.style.transform = `translate(${x}px, ${y}px)`;
      if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
        rafId.current = requestAnimationFrame(springBack);
      } else {
        el.style.transform = "translate(0px, 0px)";
        current.current = { x: 0, y: 0 };
      }
    }
    rafId.current = requestAnimationFrame(springBack);
    bounds.current = null;
  }, []);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
