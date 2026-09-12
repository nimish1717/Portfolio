import { useState, useRef, useEffect } from 'react';
import { SKILLS, SKILL_SIZE_MAP } from '../../data/skills.js';
import './Skills.css';

/**
 * Spatial typography skills section.
 * Skills distributed in a free-flow wrap layout.
 * Size conveys importance. Hover: active skill becomes dominant,
 * others dim. Mouse parallax adds depth.
 */
export default function Skills() {
  const [hovered, setHovered] = useState(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  // Mouse parallax — subtle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i % 3) * 0.4 + 0.3; // 0.3 – 1.1
        el.style.transform = `translate(${dx * 8 * depth}px, ${dy * 6 * depth}px)`;
      });
    };

    const onLeave = () => {
      itemRefs.current.forEach((el) => {
        if (el) el.style.transform = '';
      });
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const hasHover = hovered !== null;

  return (
    <section id="skills" className="section skills-section">
      <div className="container">

        {/* Label */}
        <div className="skills-label-row">
          <span className="t-label" style={{ color: 'var(--dim)' }}>05 / Skills</span>
        </div>

        {/* Heading */}
        <h2 className="t-display skills-heading">
          What I<br />
          <span style={{ color: 'var(--mist)' }}>work&nbsp;with</span>
        </h2>

        {/* Spatial skill cloud */}
        <div
          ref={containerRef}
          className={`skills-container${hasHover ? ' has-hover' : ''}`}
          role="list"
          aria-label="Tech skills"
        >
          {SKILLS.map((skill, i) => {
            const sty = SKILL_SIZE_MAP[skill.size];
            return (
              <span
                key={skill.name}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`skill-item${hovered === i ? ' hovered' : ''}`}
                style={{
                  fontSize:   sty.fontSize,
                  fontWeight: sty.fontWeight,
                  transition: `transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s, opacity 0.3s`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                role="listitem"
                aria-label={`${skill.name} — ${skill.category}`}
              >
                {skill.name}
              </span>
            );
          })}
        </div>

        {/* Hovered category label */}
        <div className="skills-category-label t-label">
          {hovered !== null
            ? `${SKILLS[hovered].name} · ${SKILLS[hovered].category}`
            : <>&nbsp;</>
          }
        </div>

        {/* Stats row */}
        <div className="skills-stats">
          {[
            { val: '2+',  label: 'Years coding'       },
            { val: '5+',  label: 'Projects shipped'   },
            { val: '17+', label: 'Technologies'       },
            { val: '2',   label: 'Industry selections'},
          ].map((s) => (
            <div key={s.label} className="skills-stat">
              <span className="skills-stat-val">{s.val}</span>
              <span className="t-label">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
