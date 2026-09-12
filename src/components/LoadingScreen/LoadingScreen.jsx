import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null);
  const panelRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let progress = 0;
    const duration = 2200; // ms
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const display = Math.floor(eased * 100);

      setCount(display);
      if (barRef.current) {
        barRef.current.style.width = `${display}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Done — slide panel up and reveal
        setTimeout(() => {
          gsap.to(panelRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power3.inOut',
            onComplete: () => {
              onComplete?.();
            },
          });
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <div ref={screenRef} className="loading-screen">
      {/* Count */}
      <div
        ref={countRef}
        className="loading-count select-none"
        aria-hidden="true"
      >
        {String(count).padStart(2, '0')}
      </div>

      {/* Label */}
      <span className="loading-label">Initializing</span>

      {/* Progress bar */}
      <div className="loading-bar-wrap">
        <div ref={barRef} className="loading-bar" />
      </div>

      {/* Slide-away panel */}
      <div ref={panelRef} className="loading-panel" />
    </div>
  );
}
