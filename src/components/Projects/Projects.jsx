import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import Magnet from '../ui/Magnet';
import './Projects.css';

const PROJECTS = [
  {
    num: '01',
    name: 'PhantomPost',
    category: 'Full-Stack · Social Platform',
    year: '2024',
    description:
      'An anonymous social platform where users can post, react, and connect without revealing identity. Built with real-time features, moderation, and a polished UI.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    link: '#',
    color: '#2D1B69',    // deep violet card accent
    accent: '#7C6EF8',
  },
  {
    num: '02',
    name: 'JobPortal',
    category: 'Full-Stack · SaaS Platform',
    year: '2024',
    description:
      'End-to-end job listing and application platform with recruiter dashboards, resume uploads, and candidate tracking — deployed and live.',
    tech: ['React', 'Express', 'PostgreSQL', 'Tailwind', 'JWT'],
    link: '#',
    color: '#0D2137',
    accent: '#38BDF8',
  },
  {
    num: '03',
    name: 'ML Analytics',
    category: 'Machine Learning · Data Science',
    year: '2026',
    description:
      'A data analysis dashboard built during the Amazon ML Summer School. Applies supervised learning models to real-world datasets with interactive visualisations.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'React', 'Recharts'],
    link: '#',
    color: '#1A1208',
    accent: '#F59E0B',
  },
];

function ProjectCard({ project, index, total }) {
  const cardRef = useRef(null);

  // Scale down slightly as next card overlaps
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="project-sticky-slot"
      style={{ top: `calc(80px + ${index * 24}px)` }}
    >
      <motion.article
        className="project-card pcard"
        style={{ scale }}
        aria-label={`Project: ${project.name}`}
      >
        {/* Card top row */}
        <div className="pcard-top">
          <div className="pcard-meta">
            <span className="label">{project.num}</span>
            <span className="label" style={{ color: 'var(--fg-dim)' }}>/ {project.category}</span>
          </div>
          <span className="label">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="pcard-title" style={{ '--card-accent': project.accent }}>
          {project.name}
        </h3>

        {/* Divider */}
        <div className="divider pcard-divider" />

        {/* Bottom */}
        <div className="pcard-bottom">
          <p className="pcard-desc">{project.description}</p>

          <div className="pcard-right">
            {/* Tech pills */}
            <div className="pcard-tags">
              {project.tech.map((t) => (
                <span key={t} className="pcard-tag">{t}</span>
              ))}
            </div>

            {/* CTA */}
            <Magnet strength={20}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline pcard-btn"
                id={`project-link-${index + 1}`}
                aria-label={`View ${project.name} live`}
              >
                View Live ↗
              </a>
            </Magnet>
          </div>
        </div>

        {/* Colored glow strip at top of card */}
        <div
          className="pcard-glow"
          style={{ background: `linear-gradient(90deg, ${project.accent}22, transparent)` }}
          aria-hidden="true"
        />
      </motion.article>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">

        {/* Section label */}
        <FadeIn y={20} className="projects-label-row">
          <span className="label">03 / Selected Work</span>
        </FadeIn>

        {/* Large heading */}
        <FadeIn y={60} delay={0.05} className="projects-heading-wrap">
          <h2 className="display-lg projects-heading">
            Selected<br />
            <span className="gradient-text">Work</span>
          </h2>
        </FadeIn>

        {/* Sticky stacking cards */}
        <div className="projects-cards-wrap">
          {PROJECTS.map((proj, i) => (
            <ProjectCard key={proj.num} project={proj} index={i} total={PROJECTS.length} />
          ))}
        </div>

      </div>
    </section>
  );
}
