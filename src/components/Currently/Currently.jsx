import FadeIn from '../ui/FadeIn';
import './Currently.css';

const BLOCKS = [
  {
    emoji: '🔨',
    heading: 'Building',
    items: [
      'Full-stack web applications',
      'Creative web experiments',
      "Portfolio (you\u2019re looking at it)",
      'Developer tooling side-projects',
    ],
  },
  {
    emoji: '📖',
    heading: 'Learning',
    items: [
      'System design at scale',
      'Advanced algorithms & DSA',
      'WebGL / GLSL shaders',
      'Distributed systems fundamentals',
    ],
  },
  {
    emoji: '🌐',
    heading: 'Exploring',
    items: [
      'Creative coding & generative art',
      'Open-source contributions',
      'AI × UX intersections',
      'Human-computer interaction',
    ],
  },
];

export default function Currently() {
  return (
    <section id="currently" className="section currently-section">
      <div className="container">

        {/* Label */}
        <FadeIn y={20} className="currently-label-row">
          <span className="label">06 / Currently</span>
        </FadeIn>

        {/* Heading */}
        <FadeIn y={50} delay={0.05} className="currently-heading-wrap">
          <h2 className="display-lg currently-heading">
            What I'm<br />
            <span style={{ color: 'var(--accent)' }}>Up To</span>
          </h2>
        </FadeIn>

        {/* Three-column blocks */}
        <div className="currently-grid">
          {BLOCKS.map((block, i) => (
            <FadeIn key={block.heading} y={40} delay={i * 0.1 + 0.1}>
              <div className="currently-block">
                <div className="currently-block-top">
                  <span className="currently-emoji" aria-hidden="true">
                    {block.emoji}
                  </span>
                  <h3 className="currently-block-title">{block.heading}</h3>
                </div>
                <ul className="currently-list" role="list">
                  {block.items.map((item) => (
                    <li key={item} className="currently-item">
                      <span className="currently-dot" aria-hidden="true">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
