import { useState, useEffect, useRef } from 'react';
import Magnet from '../ui/Magnet';

const NAV_LINKS = [
  { label: 'Work',       href: '#projects'   },
  { label: 'About',      href: '#about'       },
  { label: 'Experience', href: '#experience'  },
  { label: 'Contact',    href: '#contact'     },
];

const scrollTo = (href) => (e) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const navRef    = useRef(null);
  const lastY     = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setPastHero(y > window.innerHeight * 1.2);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar${scrolled ? ' scrolled' : ''} ${pastHero ? ' visible' : ' hidden-top'}`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="navbar-logo" aria-label="Home">
          NIMISH<span>.</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar-links" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={scrollTo(l.href)} data-cursor="link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Magnet strength={14}>
          <a
            href="#contact"
            className="navbar-cta"
            onClick={scrollTo('#contact')}
            data-cursor="link"
            id="nav-lets-talk"
          >
            Let&apos;s talk ↗
          </a>
        </Magnet>

        {/* Mobile hamburger */}
        <button
          className="navbar-hamburger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
        >
          <span style={mobileOpen ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
          <span style={mobileOpen ? { opacity: 0 } : {}} />
          <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}} />
        </button>
      </nav>

      {/* Mobile nav overlay */}
      <div
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => { scrollTo(l.href)(e); setMobileOpen(false); }}
            style={{ transitionDelay: mobileOpen ? `${i * 0.07}s` : '0s' }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
