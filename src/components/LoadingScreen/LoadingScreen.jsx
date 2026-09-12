import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const panelRef = useRef(null);
  const barRef   = useRef(null);
  const numRef   = useRef(null);
  const countRef = useRef({ val: 0 });

  useEffect(() => {
    const duration = 2000; // ms
    const start = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const display  = Math.floor(eased * 100);

      if (numRef.current) {
        numRef.current.textContent = String(display).padStart(2, '0');
      }
      if (barRef.current) {
        barRef.current.style.width = `${display}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Slide panel up
        setTimeout(() => {
          gsap.to(panelRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power3.inOut',
            onComplete: () => onComplete?.(),
          });
        }, 180);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading portfolio">
      {/* Count */}
      <span ref={numRef} className="loading-number" aria-hidden="true">
        00
      </span>

      {/* Label */}
      <span className="loading-label" aria-hidden="true">Loading</span>

      {/* Progress bar */}
      <div className="loading-bar-track" aria-hidden="true">
        <div ref={barRef} className="loading-bar-fill" />
      </div>

      {/* Panel that slides away */}
      <div ref={panelRef} className="loading-panel" aria-hidden="true" />
    </div>
  );
}
