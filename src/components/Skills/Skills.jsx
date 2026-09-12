import FadeIn from '../ui/FadeIn';
import MarqueeText from '../ui/MarqueeText';
import './Skills.css';

const ROW_1 = [
  'C++', 'JavaScript', 'TypeScript', 'Python', 'SQL',
  'React', 'Next.js', 'Node.js', 'Express', 'Three.js',
];

const ROW_2 = [
  'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'GSAP', 'Framer Motion',
  'Docker', 'Git', 'REST API', 'Vite', 'Figma',
];

function SkillPill({ name }) {
  return (
    <span className="skill-pill" role="listitem">
      {name}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">

        {/* Label */}
        <FadeIn y={20} className="skills-label-row">
          <span className="label">05 / Skills</span>
        </FadeIn>

        {/* Heading */}
        <FadeIn y={50} delay={0.05} className="skills-heading-wrap">
          <h2 className="display-lg skills-heading">
            Tech<br />
            <span className="gradient-text">Stack</span>
          </h2>
        </FadeIn>

      </div>

      {/* Marquee rows — full bleed */}
      <div className="skills-marquee-section" role="list" aria-label="Tech skills">
        <FadeIn y={30} delay={0.1} className="skills-row-wrap">
          <MarqueeText speed={35} gap={12}>
            {ROW_1.map((s) => <SkillPill key={s} name={s} />)}
          </MarqueeText>
        </FadeIn>

        <FadeIn y={30} delay={0.2} className="skills-row-wrap">
          <MarqueeText speed={28} reverse gap={12}>
            {ROW_2.map((s) => <SkillPill key={s} name={s} />)}
          </MarqueeText>
        </FadeIn>
      </div>

      <div className="container">
        {/* Stat row */}
        <FadeIn y={30} delay={0.15} className="skills-stats">
          {[
            { value: '2+', label: 'Years coding' },
            { value: '5+', label: 'Projects shipped' },
            { value: '17+', label: 'Technologies' },
            { value: '2', label: 'Industry selections' },
          ].map((s) => (
            <div key={s.label} className="skills-stat">
              <span className="skills-stat-val">{s.value}</span>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </FadeIn>
      </div>

    </section>
  );
}
