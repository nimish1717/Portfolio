import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

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
      // ── Heading: Line stagger reveal ──
      gsap.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // ── Focus Reveal: words unblur progressively on scroll ──
      const words = wordRefs.current.filter(Boolean);
      const total = words.length;

      words.forEach((word, i) => {
        const startFrac = i / total;
        const endFrac   = (i + 2) / total;

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
    <section ref={sectionRef} id="about" className="section about-section relative">
      <div className="container relative z-10">

        {/* Section label */}
        <div className="about-label-row">
          <span className="t-label" style={{ color: 'var(--dim)' }}>02 / About</span>
          <div className="about-line" />
        </div>

        {/* Large heading — line reveal */}
        <div ref={headingRef} className="about-heading-wrap mb-16">
          <h2 className="t-display about-heading leading-[1.1]">
            <span className="block overflow-hidden"><span className="block">Creative</span></span>
            <span className="block overflow-hidden"><span className="block italic text-[#46B7FF]">digital builder.</span></span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-20">
          
          {/* Left: Focus Reveal paragraph */}
          <div className="w-full md:w-[55%]">
            <p className="about-para text-xl md:text-2xl font-light leading-relaxed" aria-label="About Nimish Agrawal">
              {PARA_WORDS.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (wordRefs.current[i] = el)}
                  className="focus-word inline-block mr-2 mb-1"
                  style={{
                    filter: 'blur(var(--blur, 8px))',
                    opacity: 'var(--op, 0.15)',
                  }}
                  aria-hidden="true"
                >
                  {word}
                </span>
              ))}
            </p>
            <p className="sr-only">
              {PARA_WORDS.join(' ')}
            </p>
          </div>

          {/* Right: Target container for Hero Video + Info blocks */}
          <div className="w-full md:w-[40%] flex flex-col">
            {/* Visual Target for Cinematic Video Transition */}
            <div 
              id="about-visual-target" 
              className="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-xl mb-10 opacity-0 pointer-events-none"
            ></div>

            {/* Info blocks below the visual on desktop, below on mobile */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
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
                  <span className="t-label block mb-3 text-[#46B7FF]/70">{block.label}</span>
                  <p className="text-sm font-medium text-gray-300 leading-relaxed">
                    {block.content.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statement */}
        <p ref={statRef} className="about-statement mt-24 text-center text-lg md:text-xl font-medium tracking-wide text-white">
          {STATEMENT}
        </p>

      </div>
    </section>
  );
}
