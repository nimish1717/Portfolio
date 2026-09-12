import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

// The full paragraph split into words for the Focus Reveal effect
const PARA_WORDS = [
  'Computer', 'Engineering', 'student', 'at', 'Thapar', 'Institute',
  'of', 'Engineering', '&', 'Technology,', 'building', 'software,',
  'interfaces,', 'and', 'interactive', 'digital', 'experiences.',
];

const STATEMENT = 'Engineering that feels like art. Code that moves.';

export default function About() {
  const sectionRef  = useRef(null);
  const wordRefs    = useRef([]);
  const headingRef  = useRef(null);
  const statRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading: clip-path reveal ──
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // ── Focus Reveal: words unblur progressively on scroll ──
      // Each word's scrub window is offset — creates the travelling focus frame
      const words = wordRefs.current.filter(Boolean);
      const total = words.length;

      words.forEach((word, i) => {
        const startFrac = i / total;
        const endFrac   = (i + 2) / total;   // 2-word window always fully sharp

        gsap.fromTo(
          word,
          { '--blur': '8px', '--op': 0.15 },
          {
            '--blur': '0px',
            '--op': 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${75 - startFrac * 30}%`,
              end:   `top ${55 - endFrac * 20}%`,
              scrub: 1.2,
            },
          }
        );
      });

      // ── Statement line ──
      gsap.fromTo(
        statRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section about-section">
      <div className="container">

        {/* Section label */}
        <div className="about-label-row">
          <span className="t-label" style={{ color: 'var(--dim)' }}>02 / About</span>
          <div className="about-line" />
        </div>

        {/* Large heading — clip reveal */}
        <div ref={headingRef} className="about-heading-wrap" style={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}>
          <h2 className="t-display about-heading">
            Crafting<br />
            <em>digital&nbsp;worlds.</em>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="about-body">
          {/* Left: Focus Reveal paragraph */}
          <div className="about-para-col">
            <p className="about-para" aria-label="About Nimish Agrawal">
              {PARA_WORDS.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (wordRefs.current[i] = el)}
                  className="focus-word"
                  style={{
                    filter: 'blur(var(--blur, 8px))',
                    opacity: 'var(--op, 0.15)',
                  }}
                  aria-hidden="true"
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>

            {/* Screen-reader version */}
            <p className="sr-only">
              {PARA_WORDS.join(' ')}
            </p>
          </div>

          {/* Right: Info blocks */}
          <div className="about-info-col">
            {[
              {
                label: 'Education',
                content: 'B.E. Computer Engineering\nThapar Institute · 2023–2027',
              },
              {
                label: 'Focus',
                content: 'Frontend Engineering\nFull-Stack Development\nAI / Machine Learning',
              },
              {
                label: 'Currently',
                content: 'Open to internships &\nfull-time opportunities.',
              },
            ].map((block) => (
              <div key={block.label} className="about-info-block">
                <span className="t-label about-info-label">{block.label}</span>
                <p className="about-info-text">
                  {block.content.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statement */}
        <p ref={statRef} className="about-statement">
          {STATEMENT}
        </p>

      </div>
    </section>
  );
}
