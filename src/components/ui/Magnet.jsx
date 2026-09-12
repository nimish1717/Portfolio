import { useRef, useEffect } from 'react';

/**
 * Magnetic hover effect — child element follows cursor on hover.
 * Usage: <Magnet strength={25}><button>...</button></Magnet>
 */
export default function Magnet({ children, strength = 25, className = '' }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / rect.width) * strength;
      const dy = ((e.clientY - cy) / rect.height) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onLeave = () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    };

    const onEnter = () => {
      el.style.transition = 'transform 0.15s ease';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={className} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
