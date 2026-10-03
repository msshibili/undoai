import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Calendar, User, Tag, Lock } from 'lucide-react';

export default function ProjectModal() {
  const { activeModalProject, setActiveModalProject } = usePortfolio();

  if (!activeModalProject) return null;

  const project = activeModalProject;

  return (
    <div className="modal-overlay" onClick={() => setActiveModalProject(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c084fc', background: 'rgba(139, 92, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
            {project.category}
          </span>

          <button
            onClick={() => setActiveModalProject(null)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>
          
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem', background: '#000000' }}>
            <img src={project.mainImage || project.thumbnail} alt={project.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            {project.title}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Client</p>
              <p style={{ fontWeight: 600, color: '#ffffff' }}>{project.client || 'N/A'}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Year</p>
              <p style={{ fontWeight: 600, color: '#ffffff' }}>{project.date || '2026'}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
