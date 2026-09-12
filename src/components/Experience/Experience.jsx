import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE } from '../../data/experience.js';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef  = useRef(null);
  const lineRef     = useRef(null);
  const entryRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The line grows as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end:   'bottom 75%',
            scrub: 1.5,
          },
        }
      );

      // Each entry slides in from left as line passes it
      entryRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -32 },
          {
            opacity: 1, x: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section exp-section">
      <div className="container">

        {/* Label */}
        <div className="exp-label-row">
          <span className="t-label" style={{ color: 'var(--dim)' }}>04 / Experience</span>
        </div>

        {/* Heading */}
        <h2 className="t-display exp-heading">
          Experience<br />
          <span style={{ color: 'var(--mist)' }}>&amp;&nbsp;Moments</span>
        </h2>

        {/* Timeline */}
        <div className="exp-timeline">
          {/* Growing vertical line */}
          <div className="exp-timeline-track">
            <div className="exp-timeline-line" ref={lineRef} />
          </div>

          {/* Entries */}
          <div className="exp-entries">
            {EXPERIENCE.map((item, i) => (
              <div
                key={item.num}
                className="exp-entry"
                ref={(el) => (entryRefs.current[i] = el)}
              >
                {/* Dot */}
                <div
                  className="exp-dot"
                  style={{ '--dot-color': item.type === 'Achievement' ? 'var(--tide)' : 'var(--mist)' }}
                />

                <div className="exp-entry-body">
                  <div className="exp-entry-top">
                    <span className="t-label exp-type">{item.type}</span>
                    <span className="t-label exp-period">{item.period}</span>
                  </div>
                  <h3 className="exp-role">{item.role}</h3>
                  <p className="exp-org">{item.org}</p>
                  <p className="exp-desc t-body">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
