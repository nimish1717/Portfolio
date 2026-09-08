import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Navbar.css';

function HoverLink({ text, href, cursor = false }) {
  return (
    <a href={href} className="hover-link" data-cursor={!cursor ? 'disable' : undefined}>
      <div className="hover-in">
        {text} <div>{text}</div>
      </div>
    </a>
  );
}

export default function Navbar() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
    );
  }, []);

  return (
    <header ref={headerRef} className="header" style={{ opacity: 0 }}>
      <div className="header-left">
        <HoverLink text="Nimish Agrawal" href="#" />
      </div>
      <nav className="header-right">
        <ul>
          <li><HoverLink text="About" href="#about" /></li>
          <li><HoverLink text="Work" href="#career" /></li>
          <li><HoverLink text="Contact" href="#contact" /></li>
        </ul>
      </nav>
    </header>
  );
}
