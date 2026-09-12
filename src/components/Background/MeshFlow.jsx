import { useEffect, useRef } from 'react';
import { useIsTouch } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Mesh Flow background — Canvas 2D dot grid.
 * Dots bend like a rubber sheet around the cursor (Gaussian warp).
 * Extremely subtle. Content must remain readable.
 * Disabled on touch and reduced-motion.
 */
export default function MeshFlow() {
  const canvasRef = useRef(null);
  const isTouch   = useIsTouch();
  const reduced   = useReducedMotion();

  useEffect(() => {
    if (isTouch || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, cols, rows, points;
    const SPACING = 42;
    const DOT_R   = 0.8;
    const SIGMA   = 130;    // Gaussian spread radius
    const STRENGTH = 28;    // max displacement px
    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      cols = Math.ceil(W / SPACING) + 1;
      rows = Math.ceil(H / SPACING) + 1;
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points.push({ x: c * SPACING, y: r * SPACING });
        }
      }
    };

    build();
    window.addEventListener('resize', build);

    const onMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const draw = () => {
      // Smooth mouse
      mouse.x = lerp(mouse.x, mouse.tx, 0.08);
      mouse.y = lerp(mouse.y, mouse.ty, 0.08);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(237,234,228,0.18)';

      for (const p of points) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist2 = dx * dx + dy * dy;
        const sigma2 = SIGMA * SIGMA;

        // Gaussian weight — 1 at centre, 0 far away
        const g = Math.exp(-dist2 / (2 * sigma2));

        // Displacement pulls point TOWARD cursor
        const ox = p.x - dx * g * (STRENGTH / Math.sqrt(dist2 + 1));
        const oy = p.y - dy * g * (STRENGTH / Math.sqrt(dist2 + 1));

        ctx.beginPath();
        ctx.arc(ox, oy, DOT_R * (1 + g * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
      window.removeEventListener('mousemove', onMove);
    };
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.35,
      }}
    />
  );
}
