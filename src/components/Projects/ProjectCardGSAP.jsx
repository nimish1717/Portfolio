import React from 'react';
import Magnet from '../ui/Magnet';

export default function ProjectCardGSAP({ project, index }) {
  return (
    <div 
      className="fan-project-card"
      style={{
        '--card-color': project.color,
        '--card-accent': project.accent,
        zIndex: index + 10,
      }}
    >
      <div 
        className="fan-card-inner"
        style={{
          background: `radial-gradient(120% 120% at 50% -20%, ${project.accent}20 0%, ${project.color} 80%)`,
        }}
      >
        <div className="fan-card-grid" aria-hidden="true" />
        
        <div className="fan-card-header">
          <div className="fan-card-meta">
            <span className="t-label" style={{ color: project.accent }}>
              {project.category}
            </span>
            <span className="t-label">{project.year}</span>
          </div>
          <div className="fan-card-num t-label">{project.num}</div>
        </div>

        <div className="fan-card-body">
          <h3 className="fan-card-name t-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.5rem' }}>
            {project.name}
          </h3>
          <p className="fan-card-tagline" style={{ fontSize: '1.2rem', color: 'var(--bone)', marginBottom: '1.5rem', fontWeight: 500 }}>
            {project.tagline}
          </p>
          <p className="fan-card-desc t-body" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            {project.description}
          </p>
          
          <div className="fan-card-tech">
            {project.tech.map((t) => (
              <span key={t} className="fan-card-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="fan-card-footer">
          <Magnet strength={12}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary fan-card-btn"
              data-cursor="link"
            >
              View Project <span className="btn-arrow-icon">↗</span>
            </a>
          </Magnet>
        </div>
      </div>
    </div>
  );
}
