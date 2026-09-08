import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const nameEl = nameRef.current;
    const subtitleEl = subtitleRef.current;

    if (nameEl) {
      const text = nameEl.textContent;
      nameEl.innerHTML = '';
      const chars = text.split('');
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = char;
        }
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(100%)';
        nameEl.appendChild(span);
      });

      gsap.to(nameEl.querySelectorAll('.hero-char'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.8,
      });
    }

    if (subtitleEl) {
      const text = subtitleEl.textContent;
      subtitleEl.innerHTML = '';
      const words = text.split(' ');
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'hero-word';
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(30px)';
        subtitleEl.appendChild(span);

        // Add a real space text node after each word (except last)
        if (i < words.length - 1) {
          subtitleEl.appendChild(document.createTextNode(' '));
        }
      });

      gsap.to(subtitleEl.querySelectorAll('.hero-word'), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 1.5,
      });
    }

    // Scroll indicator pulse
    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2.5 }
      );
    }

    // Parallax on scroll
    const ctx = gsap.context(() => {
      gsap.to(nameRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-content">
        <h1 ref={nameRef} className="hero-name title">
          Nimish Agrawal
        </h1>
        <p ref={subtitleRef} className="hero-subtitle para">
          Software Engineer · Full-Stack Developer · Problem Solver
        </p>
      </div>

      <div ref={scrollIndicatorRef} className="scroll-indicator">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
