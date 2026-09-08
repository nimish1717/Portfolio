import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Split paragraph into words for stagger animation
      const paraEl = paraRef.current;
      if (paraEl) {
        const text = paraEl.textContent;
        paraEl.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, i) => {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          span.className = 'about-word';
          span.textContent = word;
          paraEl.appendChild(span);

          // Add a real space text node after each word (except last)
          if (i < words.length - 1) {
            paraEl.appendChild(document.createTextNode(' '));
          }
        });

        gsap.to(paraEl.querySelectorAll('.about-word'), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-me">
        <h3 ref={titleRef} className="title">About Me</h3>
        <p ref={paraRef} className="para">
          I am a Computer Engineering undergraduate who enjoys building software that is technically strong, visually polished, and genuinely useful. Skilled in React, JavaScript, Python, SQL, and full-stack development. Experienced in building scalable web platforms from concept to deployment with a strong focus on software engineering and product development.
        </p>
      </div>
    </section>
  );
}
