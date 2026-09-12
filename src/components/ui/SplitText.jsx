import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into individual character spans and animates them in on scroll.
 * Usage: <SplitText text="Hello World" className="display-xl" stagger={0.04} />
 */
export default function SplitText({
  text,
  className = '',
  stagger = 0.04,
  delay = 0,
  trigger = null,       // pass a ref to use as trigger; defaults to self
  start = 'top 85%',
  once = true,
  tag: Tag = 'span',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.split-char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: '105%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.75,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger?.current || el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [text, stagger, delay, trigger, start, once]);

  // Split by word, then by char — preserves spaces between words
  const words = text.split(' ');

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              className="split-char"
              style={{ display: 'inline-block' }}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.25em' }} aria-hidden="true" />
          )}
        </span>
      ))}
    </Tag>
  );
}
