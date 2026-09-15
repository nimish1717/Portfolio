import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/projects.js';
import ProjectCardGSAP from './ProjectCardGSAP';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = cardsRef.current;
      if (!cards.length) return;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${cards.length * 150}%`, // scroll length based on number of cards (longer duration)
          scrub: true,
          pin: true,
        }
      });

      // Prepare initial states
      gsap.set(cards, { y: '0%', scale: 1, opacity: 1 });
      cards.forEach((card, i) => {
        if (i !== 0) {
          gsap.set(card, { y: '150vh' }); // Push all but first down
        }
      });

      // Animate the stack
      cards.forEach((card, i) => {
        if (i === 0) return;

        // When card `i` comes up, it scales down all previous cards
        const previousCards = cards.slice(0, i);
        
        tl.to(previousCards, {
          scale: (index) => 1 - (i - index) * 0.04,
          y: (index) => -(i - index) * 20,
          opacity: (index) => 1 - (i - index) * 0.1,
          ease: 'none',
        }, 'start' + i); // Sync this with the card coming up

        tl.to(card, {
          y: '0vh',
          ease: 'none',
        }, 'start' + i);
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      className="section projects-section-gsap" 
      ref={containerRef}
    >
      <div className="container gsap-container">
        {/* Header */}
        <div className="projects-header-gsap">
          <div className="projects-label-row">
            <span className="t-label" style={{ color: 'var(--dim)' }}>03 / Selected Work</span>
          </div>
          <h2 className="t-display projects-heading">
            Selected<br />
            <span style={{ color: 'var(--mist)' }}>Work</span>
          </h2>
        </div>

        {/* GSAP Stacking Cards Container */}
        <div className="fan-deck-container">
          {PROJECTS.map((project, i) => (
            <div 
              key={project.id} 
              ref={(el) => (cardsRef.current[i] = el)}
              className="fan-deck-wrapper"
              style={{ zIndex: i }} // Just use normal index, later ones stack on top naturally
            >
              <ProjectCardGSAP project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
