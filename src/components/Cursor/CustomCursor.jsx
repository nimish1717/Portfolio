import { useEffect, useRef } from 'react';
import { useIsTouch } from '../../hooks/useMediaQuery';

/**
 * Multi-state cinematic cursor.
 * States: default | link | project | drag
 * Driven by data-cursor="link|project|drag" attributes.
 * Disabled entirely on touch devices.
 */
export default function CustomCursor() {
  const isTouch = useIsTouch();
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const raf     = useRef(null);
  const state   = useRef('default');

  useEffect(() => {
    if (isTouch) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;

    const lerp = (a, b, t) => a + (b - a) * t;

    // RAFloop for smooth ring following
    const loop = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.095);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.095);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dot) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top  = `${e.clientY}px`;
      }
    };

    const setState = (s) => {
      if (!dot || !ringRef.current) return;
      const prev = state.current;
      if (prev === s) return;
      state.current = s;
      // Remove all states
      dot.classList.remove('s-link', 's-project', 's-drag');
      ringRef.current.classList.remove('s-link', 's-project', 's-drag');
      if (s !== 'default') {
        dot.classList.add(`s-${s}`);
        ringRef.current.classList.add(`s-${s}`);
      }
    };

    const onEnter = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) setState(el.dataset.cursor);
    };
    const onLeave = () => setState('default');

    window.addEventListener('mousemove', onMove, { passive: true });

    // Use event delegation on document
    document.addEventListener('mouseenter', onEnter, true);
    document.addEventListener('mouseleave', onLeave, true);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter, true);
      document.removeEventListener('mouseleave', onLeave, true);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" data-cursor-ignore />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" data-cursor-ignore />
    </>
  );
}
