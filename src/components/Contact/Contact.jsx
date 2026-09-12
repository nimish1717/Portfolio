import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from '../ui/Magnet';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const EMAIL    = 'nimish.agrawal@thapar.edu';
const GITHUB   = 'https://github.com/nimish1717';
const LINKEDIN = 'https://linkedin.com/in/nimish-agrawal';

// Split "LET'S BUILD SOMETHING." into characters
const CTA_LINES = ["LET'S BUILD", 'SOMETHING.'];

export default function Contact() {
  const sectionRef = useRef(null);
  const ctaRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = ctaRef.current?.querySelectorAll('.cta-ch');
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.022,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section contact-section">
      <div className="container">

        {/* Label */}
        <div className="contact-label-row">
          <span className="t-label" style={{ color: 'var(--dim)' }}>07 / Contact</span>
        </div>

        {/* Secondary text */}
        <p className="contact-sub t-body">
          Have an idea, project, or opportunity?
        </p>

        {/* Huge CTA — character split */}
        <div
          ref={ctaRef}
          className="contact-cta"
          aria-label="Let's build something."
        >
          {CTA_LINES.map((line, li) => (
            <div key={li} className="clip-line contact-cta-line">
              <span className="contact-huge" aria-hidden="true">
                {line.split('').map((ch, ci) => (
                  <span key={ci} className="cta-ch" style={{ display: 'inline-block' }}>
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="contact-btns">
          <Magnet strength={18}>
            <a
              href={`mailto:${EMAIL}`}
              className="btn btn-primary contact-btn"
              id="contact-email"
              data-cursor="link"
            >
              EMAIL <span className="btn-arrow-icon">↗</span>
            </a>
          </Magnet>
          <Magnet strength={18}>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost contact-btn"
              id="contact-github"
              data-cursor="link"
            >
              GITHUB <span className="btn-arrow-icon">↗</span>
            </a>
          </Magnet>
          <Magnet strength={18}>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost contact-btn"
              id="contact-linkedin"
              data-cursor="link"
            >
              LINKEDIN <span className="btn-arrow-icon">↗</span>
            </a>
          </Magnet>
        </div>

      </div>
    </section>
  );
}
