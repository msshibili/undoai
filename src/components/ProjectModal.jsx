import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Maximize2 } from 'lucide-react';

export default function ProjectModal() {
  const { activeModalProject, setActiveModalProject } = usePortfolio();

  if (!activeModalProject) return null;

  const project = activeModalProject;
  const imageSrc = project.mainImage || project.thumbnail;

  return (
    <div className="modal-overlay" onClick={() => setActiveModalProject(null)}>
      <div
        className="modal-card"
        style={{ maxWidth: '900px', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(7, 8, 13, 0.95)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c084fc', background: 'rgba(139, 92, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              {project.category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
              title="Open full resolution image in new tab"
            >
              <Maximize2 size={13} />
              <span>Full Size Original</span>
            </a>

            <button
              onClick={() => setActiveModalProject(null)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: '8px', color: '#ffffff', cursor: 'pointer', padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Full Size Image Container - Object Fit Contain guarantees 100% full poster visible */}
          <div style={{ width: '100%', minHeight: '300px', maxHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#05060a', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden', padding: '0.5rem' }}>
            <img
              src={imageSrc}
              alt={project.title}
              style={{ maxWidth: '100%', maxHeight: '62vh', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '12px', display: 'block' }}
            />
          </div>

          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              {project.title}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', gap: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Client / Brand</p>
                <p style={{ fontWeight: 600, color: '#ffffff' }}>{project.client || 'Studio Work'}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Production Year</p>
                <p style={{ fontWeight: 600, color: '#ffffff' }}>{project.date || '2026'}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
