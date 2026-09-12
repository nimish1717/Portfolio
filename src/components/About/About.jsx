import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from '../ui/FadeIn';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "I'm", "a", "Computer", "Engineering", "undergraduate", "at", "Thapar", "Institute,",
  "building", "software", "that's", "technically", "strong,", "visually", "polished,",
  "and", "genuinely", "useful.", "I", "care", "about", "the", "craft", "—", "clean",
  "code,", "smooth", "interfaces,", "and", "products", "people", "actually", "want", "to", "use.",
];

export default function About() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate horizontal line growing in
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Word-by-word paragraph reveal scrubbed to scroll
      gsap.fromTo(
        wordsRef.current.filter(Boolean),
        { opacity: 0.15, color: 'rgba(237,235,230,0.15)' },
        {
          opacity: 1,
          color: 'rgba(237,235,230,1)',
          duration: 0.4,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 1.5,
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
        <FadeIn y={20} className="about-label-row">
          <span className="label">02 / About</span>
          <div ref={lineRef} className="about-line" />
        </FadeIn>

        {/* Large heading */}
        <FadeIn y={50} delay={0.1} className="about-heading-wrap">
          <h2 className="display-lg about-heading">
            About<br />
            <span style={{ color: 'var(--accent)' }}>Me.</span>
          </h2>
        </FadeIn>

        {/* Two-column layout */}
        <div className="about-body">
          {/* Paragraph — word reveal */}
          <div className="about-para-col">
            <p className="about-para" aria-label="About Nimish Agrawal">
              {WORDS.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (wordsRef.current[i] = el)}
                  className="about-word"
                  aria-hidden="true"
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>

          {/* Info column */}
          <div className="about-info-col">
            <FadeIn y={30} delay={0.15}>
              <div className="about-info-block">
                <span className="label">Education</span>
                <p className="about-info-text">
                  B.E. Computer Engineering<br />
                  Thapar Institute of Engineering
                </p>
                <p className="about-info-sub">2023 — 2027</p>
              </div>
            </FadeIn>

            <FadeIn y={30} delay={0.25}>
              <div className="about-info-block">
                <span className="label">Focus Areas</span>
                <p className="about-info-text">
                  Full-Stack Development<br />
                  Frontend Engineering<br />
                  AI / Machine Learning
                </p>
              </div>
            </FadeIn>

            <FadeIn y={30} delay={0.35}>
              <div className="about-info-block">
                <span className="label">Currently</span>
                <p className="about-info-text">
                  Building interfaces<br />
                  that feel alive.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

      </div>
    </section>
  );
}
