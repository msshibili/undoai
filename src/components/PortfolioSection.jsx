import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Eye, Lock } from 'lucide-react';

export default function PortfolioSection() {
  const { projects, setActiveModalProject } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('all');

  const filterButtons = [
    { id: 'all', label: 'All Projects' },
    { id: 'social', label: 'Social Media' },
    { id: 'branding', label: 'Logo & Branding' },
    { id: 'magazine', label: 'Magazine Layout' },
    { id: 'video', label: 'Video Edit' },
    { id: 'aivideo', label: 'AI Video Creation' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.tag === activeFilter || p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="work" style={{ padding: '6rem 0', background: '#06070c', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        
        {/* Title */}
        <div className="section-header">
          <span className="section-tag">FEATURED SHOWCASE</span>
          <h2 className="section-title">Selected Creative Masterpieces</h2>
          <p className="section-subtitle">Browse our portfolio of award-winning digital projects and media creations.</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem', justifyContent: 'center' }}>
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`btn-secondary ${activeFilter === btn.id ? 'active' : ''}`}
              style={{
                borderRadius: '9999px',
                padding: '0.55rem 1.35rem',
                fontSize: '0.8rem',
                background: activeFilter === btn.id ? 'var(--primary-purple)' : 'var(--bg-card)',
                color: activeFilter === btn.id ? '#ffffff' : 'var(--text-muted)',
                borderColor: activeFilter === btn.id ? 'var(--primary-purple)' : 'var(--border-light)',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="portfolio-card"
            >
              <div className="portfolio-img-wrap">
                <img src={project.thumbnail} alt={project.title} />
                <div className="protected-badge">
                  <Lock size={12} color="#c084fc" />
                  <span>Protected</span>
                </div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c084fc', background: 'rgba(139, 92, 246, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                    {project.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.date}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 300 }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
