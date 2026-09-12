import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from '../ui/FadeIn';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    num: '01',
    role: 'B.E. Computer Engineering',
    company: 'Thapar Institute of Engineering & Technology',
    period: '2023 — 2027',
    type: 'Education',
    description:
      'Building a strong foundation in data structures, algorithms, operating systems, databases, and software engineering. Active in coding clubs and hackathons.',
  },
  {
    num: '02',
    role: 'Full-Stack Developer',
    company: 'Personal Projects',
    period: '2024',
    type: 'Development',
    description:
      'Independently designed and shipped PhantomPost (anonymous social platform) and JobPortal — both full-stack, deployed, with real users.',
  },
  {
    num: '03',
    role: 'Code for Good Participant',
    company: 'JPMorgan Chase',
    period: '2025',
    type: 'Achievement',
    description:
      'Selected for the prestigious Code for Good Hackathon. Collaborated in cross-functional teams to build technology solutions for nonprofit organisations under time pressure.',
  },
  {
    num: '04',
    role: 'ML Summer School',
    company: 'Amazon',
    period: '2026',
    type: 'Achievement',
    description:
      'Selected for Amazon\'s ML Summer School — hands-on training in supervised learning, deep learning, NLP, and real-world AI application design.',
  },
  {
    num: '05',
    role: 'Marketing Head',
    company: 'College Technical Society',
    period: '2024 — 2025',
    type: 'Leadership',
    description:
      'Led the marketing vertical of a 200+ member technical society. Designed campaigns, coordinated events, and grew digital presence across platforms.',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const lineFillRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG line draws on scroll
      gsap.fromTo(
        lineFillRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      // Each entry fades in as the line reaches it
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section experience-section">
      <div className="container">

        {/* Label */}
        <FadeIn y={20} className="exp-label-row">
          <span className="label">04 / Experience</span>
        </FadeIn>

        {/* Heading */}
        <FadeIn y={50} delay={0.05} className="exp-heading-wrap">
          <h2 className="display-lg exp-heading">
            Career &amp;<br />
            <span style={{ color: 'var(--accent)' }}>Achievements</span>
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="exp-timeline-wrap">

          {/* Vertical line */}
          <div className="exp-line-col" ref={lineRef}>
            <div className="timeline-line">
              <div className="timeline-line-fill" ref={lineFillRef} />
            </div>
          </div>

          {/* Entries */}
          <div className="exp-entries">
            {TIMELINE.map((item, i) => (
              <div
                key={item.num}
                className="exp-entry"
                ref={(el) => (itemRefs.current[i] = el)}
              >
                {/* Dot on the line */}
                <div className="timeline-dot exp-dot" />

                <div className="exp-entry-inner">
                  <div className="exp-entry-top">
                    <div className="exp-entry-meta">
                      <span className="label exp-type">{item.type}</span>
                      <span className="label" style={{ color: 'var(--fg-dim)' }}>
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <h3 className="exp-role">{item.role}</h3>
                  <p className="exp-company">{item.company}</p>
                  <p className="exp-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
