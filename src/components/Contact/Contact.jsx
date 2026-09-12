import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from '../ui/Magnet';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/nimish1717',    id: 'contact-github' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/nimish-agrawal', id: 'contact-linkedin' },
  { label: 'Instagram', href: 'https://instagram.com/',            id: 'contact-instagram' },
];

const EMAIL = 'nimish.agrawal@thapar.edu';

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading chars stagger in on scroll
      const chars = headingRef.current?.querySelectorAll('.cta-char');
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { y: '105%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.65,
            stagger: 0.025,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split a string into char spans
  const splitToChars = (text) =>
    text.split('').map((ch, i) => (
      <span key={i} className="cta-char" style={{ display: 'inline-block' }} aria-hidden="true">
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  return (
    <section ref={sectionRef} id="contact" className="section contact-section">
      <div className="container">

        {/* Label */}
        <div className="contact-label-row">
          <span className="label">07 / Contact</span>
        </div>

        {/* Big CTA heading */}
        <div
          ref={headingRef}
          className="contact-cta-heading"
          aria-label="Let's build something interesting."
        >
          <div className="clip-line contact-cta-line">
            <span className="display-xl contact-cta-text">
              {splitToChars("Let's build")}
            </span>
          </div>
          <div className="clip-line contact-cta-line contact-cta-line--indent">
            <span className="display-xl contact-cta-text contact-cta-text--accent">
              {splitToChars('something')}
            </span>
          </div>
          <div className="clip-line contact-cta-line">
            <span className="display-xl contact-cta-text">
              {splitToChars('interesting.')}
            </span>
          </div>
        </div>

        {/* Email CTA */}
        <div className="contact-email-row">
          <Magnet strength={15}>
            <a
              href={`mailto:${EMAIL}`}
              className="contact-email-link btn-solid"
              id="contact-email"
              aria-label={`Send email to ${EMAIL}`}
            >
              {EMAIL} ↗
            </a>
          </Magnet>
        </div>

        {/* Divider */}
        <div className="divider contact-divider" />

        {/* Footer row */}
        <div className="contact-footer">
          {/* Social links */}
          <div className="contact-socials">
            {SOCIALS.map((s) => (
              <Magnet key={s.label} strength={12}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                  id={s.id}
                  aria-label={`Visit ${s.label} profile`}
                >
                  {s.label} ↗
                </a>
              </Magnet>
            ))}
          </div>

          {/* Copyright */}
          <p className="contact-copy">
            © {new Date().getFullYear()} Nimish Agrawal<br />
            <span style={{ color: 'var(--fg-dim)' }}>
              Designed &amp; developed by Nimish
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
