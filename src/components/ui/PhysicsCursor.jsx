"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { gsap } from "gsap";

// Context to manage cursor state globally
const CursorContext = createContext({
  cursorState: "default", // default, view, open, drag, menu
  setCursorState: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }) {
  const [cursorState, setCursorState] = useState("default");
  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
}

export function PhysicsCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const { cursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for highly optimized rendering
    const setX = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });
    const setRotation = gsap.quickTo(cursor, "rotation", { duration: 0.1, ease: "none" });
    const setScaleX = gsap.quickTo(cursor, "scaleX", { duration: 0.15, ease: "power2.out" });
    const setScaleY = gsap.quickTo(cursor, "scaleY", { duration: 0.15, ease: "power2.out" });

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lastMouse = { x: mouse.x, y: mouse.y };
    let raf;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const render = () => {
      const velX = mouse.x - lastMouse.x;
      const velY = mouse.y - lastMouse.y;
      
      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);

      // Only stretch if it's the default dot, not a large state
      if (cursorState === "default") {
        const stretch = Math.min(speed * 0.004, 0.5); 
        setScaleX(1 + stretch);
        setScaleY(1 - stretch * 0.3);
        setRotation(angle);
      } else {
        setScaleX(1);
        setScaleY(1);
        setRotation(0);
      }

      setX(mouse.x);
      setY(mouse.y);

      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [cursorState]);

  if (!isVisible) return null;

  // Visuals based on state
  const isDefault = cursorState === "default";
  
  let text = "";
  if (cursorState === "view") text = "VIEW →";
  if (cursorState === "open") text = "OPEN";
  if (cursorState === "drag") text = "DRAG";
  if (cursorState === "menu") text = "MENU";

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        width: isDefault ? 8 : 80,
        height: isDefault ? 8 : 80,
        backgroundColor: isDefault ? "var(--fg)" : "transparent",
        border: isDefault ? "none" : "1px solid var(--accent)",
        marginLeft: "-50%", 
        marginTop: "-50%",
        transition: "width 0.4s cubic-bezier(0.76, 0, 0.24, 1), height 0.4s cubic-bezier(0.76, 0, 0.24, 1), background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <span
        ref={textRef}
        className="font-mono text-[10px] text-accent uppercase tracking-widest pointer-events-none whitespace-nowrap absolute"
        style={{
          opacity: isDefault ? 0 : 1,
          transform: isDefault ? "scale(0.5)" : "scale(1)",
          transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {text}
      </span>
    </div>
  );
}
