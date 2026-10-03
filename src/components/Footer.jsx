import React from 'react';
import { Lock } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-light)' }}>
          
          <div>
            <a href="#" className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="logo-box">
                <div className="logo-inner">⟲</div>
              </div>
              <span className="brand-title">undo<span>.ai</span></span>
            </a>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 300, maxWidth: '300px' }}>
              Creative design & digital media studio. Designing visuals, stories, and digital experiences that make brands impossible to ignore.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#work" className="nav-link">Portfolio</a></li>
              <li><a href="#configurator" className="nav-link">AI Studio</a></li>
              <li><a href="#process" className="nav-link">Process</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <p>© 2026 undo.ai. All rights reserved.</p>
          <button
            onClick={onOpenAdmin}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}
          >
            <Lock size={12} />
            <span>Studio Portal</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
