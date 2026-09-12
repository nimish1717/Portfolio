import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../data/projects.js';
import Magnet from '../ui/Magnet';
import './Projects.css';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Expanded Cards — rail of tall slivers.
 * Hovering one widens it into a full card.
 * Neighbours compress.
 * Active card reveals full content.
 * Text is laid out at the open width so it never rewraps.
 */
function ProjectCard({ project, isActive, onActivate, isMobile }) {
  const cardRef = useRef(null);

  const handleInteract = () => onActivate(project.id);

  return (
    <div
      ref={cardRef}
      className={`exp-card-sliver${isActive ? ' active' : ''}`}
      style={{ '--card-color': project.color, '--card-accent': project.accent }}
      onClick={handleInteract}
      onMouseEnter={!isMobile ? handleInteract : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleInteract()}
      aria-expanded={isActive}
      aria-label={`Project: ${project.name}`}
      data-cursor="project"
    >
      {/* Background */}
      <div
        className="exp-card-bg"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 30% 70%, ${project.accent}20 0%, ${project.color} 65%)`,
        }}
      />

      {/* Subtle grid lines on card */}
      <div className="exp-card-grid" aria-hidden="true" />

      {/* Number — vertical when collapsed, horizontal when open */}
      <div className="exp-card-num t-label">
        {project.num}
      </div>

      {/* Collapsed: vertical title */}
      <div className="exp-card-vertical-name" aria-hidden={isActive}>
        <span>{project.name}</span>
      </div>

      {/* Expanded content */}
      <div className="exp-card-content">
        {/* Top row */}
        <div className="exp-card-top">
          <span className="t-label" style={{ color: project.accent }}>
            {project.category}
          </span>
          <span className="t-label">{project.year}</span>
        </div>

        {/* Project name */}
        <h3 className="exp-card-name">{project.name}</h3>

        {/* Tagline */}
        <p className="exp-card-tagline">{project.tagline}</p>

        {/* Description */}
        <p className="exp-card-desc t-body">{project.description}</p>

        {/* Tech */}
        <div className="exp-card-tech">
          {project.tech.map((t) => (
            <span key={t} className="exp-card-tag">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <Magnet strength={12}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost exp-card-btn"
            id={`project-link-${project.id}`}
            data-cursor="link"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.name} live`}
          >
            View Project <span className="btn-arrow-icon">↗</span>
          </a>
        </Magnet>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleActivate = (id) => setActiveId(id);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">

        {/* Header */}
        <div className="projects-header">
          <div className="projects-label-row">
            <span className="t-label" style={{ color: 'var(--dim)' }}>03 / Selected Work</span>
          </div>
          <h2 className="t-display projects-heading">
            Selected<br />
            <span style={{ color: 'var(--mist)' }}>Work</span>
          </h2>
        </div>

        {/* Expanded Cards rail */}
        <div className="exp-cards-rail" role="list">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeId === project.id}
              onActivate={handleActivate}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Mobile: project index dots */}
        <div className="projects-dots" aria-hidden="true">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              className={`projects-dot${activeId === p.id ? ' active' : ''}`}
              onClick={() => setActiveId(p.id)}
              aria-label={`Select project ${p.name}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
