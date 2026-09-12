import './Currently.css';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BLOCKS = [
  {
    word: 'Building',
    num: '01',
    items: [
      'Full-stack web applications',
      'Creative web experiments',
      'This portfolio',
      'Side-projects and tooling',
    ],
  },
  {
    word: 'Learning',
    num: '02',
    items: [
      'System design at scale',
      'Advanced algorithms & DSA',
      'WebGL & GLSL shaders',
      'Distributed systems',
    ],
  },
  {
    word: 'Exploring',
    num: '03',
    items: [
      'Creative coding & generative art',
      'Open-source contributions',
      'AI × UX intersections',
      'Human-computer interaction',
    ],
  },
];

export default function Currently() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.curr-block').forEach((block, i) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="currently" className="section-sm currently-section">
      <div className="container">

        <div className="curr-label-row">
          <span className="t-label" style={{ color: 'var(--dim)' }}>06 / Currently</span>
        </div>

        <h2 className="t-display curr-heading">
          Currently
        </h2>

        <div className="curr-grid">
          {BLOCKS.map((block) => (
            <div key={block.word} className="curr-block">
              <div className="curr-block-top">
                <span className="t-label curr-num">{block.num}</span>
                <h3 className="curr-word">{block.word}</h3>
              </div>
              <ul className="curr-list">
                {block.items.map((item) => (
                  <li key={item} className="curr-item">
                    <span className="curr-arrow" aria-hidden="true">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
