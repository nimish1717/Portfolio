import { useEffect, useRef } from 'react';

export default function Navbar() {
  const navRef = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!navRef.current) return;

      if (y > lastY.current && y > 120) {
        navRef.current.classList.add('hidden');
      } else {
        navRef.current.classList.remove('hidden');
      }
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className="navbar" aria-label="Main navigation">
      <a href="/" className="navbar-logo" aria-label="Nimish Agrawal — home">
        NA
      </a>

      <ul className="navbar-links">
        <li><a href="#about"      onClick={scrollTo('about')}>About</a></li>
        <li><a href="#projects"   onClick={scrollTo('projects')}>Work</a></li>
        <li><a href="#experience" onClick={scrollTo('experience')}>Experience</a></li>
        <li><a href="#skills"     onClick={scrollTo('skills')}>Skills</a></li>
      </ul>

      <a
        href="#contact"
        className="navbar-cta"
        onClick={scrollTo('contact')}
        aria-label="Go to contact section"
      >
        Let's talk ↗
      </a>
    </nav>
  );
}
