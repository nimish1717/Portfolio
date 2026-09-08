import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;

    const handleMouseMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      // Move dot immediately
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor="disable"]');
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select');

      if (target) {
        cursor.classList.add('cursor-hidden');
        dot.classList.add('cursor-hidden');
      } else if (interactive) {
        cursor.classList.add('cursor-hover');
        cursor.classList.remove('cursor-hidden');
        dot.classList.remove('cursor-hidden');
      } else {
        cursor.classList.remove('cursor-hover');
        cursor.classList.remove('cursor-hidden');
        dot.classList.remove('cursor-hidden');
      }
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      cursor.style.left = posRef.current.x + 'px';
      cursor.style.top = posRef.current.y + 'px';

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </>
  );
}
