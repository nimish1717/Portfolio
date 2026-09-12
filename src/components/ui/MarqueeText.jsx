/**
 * Infinite horizontal marquee using CSS animation.
 * Duplicates children to create a seamless loop.
 * Usage: <MarqueeText speed={40} reverse>
 *          <span className="skill-pill">React</span>
 *          ...
 *        </MarqueeText>
 */
export default function MarqueeText({
  children,
  speed = 30,     // seconds for one full loop
  reverse = false,
  gap = 16,
  className = '',
}) {
  // Duplicate content for seamless loop
  const style = {
    animationDuration: `${speed}s`,
    gap: `${gap}px`,
  };

  const trackClass = `marquee-track${reverse ? ' reverse' : ''} ${className}`;

  return (
    <div className="marquee-wrap" aria-hidden="true">
      {/* Two copies — CSS animates translateX(-50%) so the seam is seamless */}
      <div className={trackClass} style={style}>
        {children}
        {children}
      </div>
    </div>
  );
}
