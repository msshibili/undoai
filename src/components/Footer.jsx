import React from 'react';
import { Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer({ onOpenAdmin }) {
  const { settings } = usePortfolio();

  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-light)' }}>

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

          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Connect & Follow</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>

              <a
                href={settings?.socialBehance || "https://www.behance.net/shibilimp"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0057ff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7V5h7v2zm-1.63 4.88c-.62-.73-1.6-1.12-2.91-1.12-2.58 0-4.46 1.76-4.46 4.41 0 2.69 1.83 4.41 4.54 4.41 1.93 0 3.37-.82 4.09-2.31h-2.12c-.41.52-1.07.78-1.87.78-1.16 0-1.99-.68-2.2-1.78h6.46c.03-.23.05-.52.05-.79 0-1.46-.42-2.73-1.58-3.6zm-4.99 2.51c.17-1 .92-1.64 1.97-1.64.99 0 1.76.62 1.91 1.64h-3.88zM8.33 13.88c.67.43 1.09 1.13 1.09 2.06 0 1.78-1.41 2.87-3.87 2.87H0V5.19h5.18c2.32 0 3.66 1.03 3.66 2.56 0 .97-.48 1.69-1.34 2.15v.06c1.03.35 1.63 1.17 1.63 2.32v1.6zm-5.5-6.19v2.85h2.24c1.1 0 1.73-.47 1.73-1.4 0-.96-.64-1.45-1.76-1.45H2.83zm0 5.23v3.25h2.46c1.24 0 1.96-.54 1.96-1.62 0-1.06-.71-1.63-1.95-1.63H2.83z" /></svg>
                <span>Behance</span>
              </a>

              <a
                href={settings?.socialLinkedin || "https://www.linkedin.com/in/muhammed-shibili-mp"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0a66c2'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" /></svg>
                <span>LinkedIn</span>
              </a>

              <a
                href={settings?.socialInstagram || "https://www.instagram.com/un.do.ai/?utm_source=ig_web_button_share_sheet"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#e1306c'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                <span>Instagram</span>
              </a>

              <a
                href={settings?.socialWhatsapp || "https://wa.me/919746695430"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#25d366'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.81 9.81 0 0 0 12.04 2zm5.8 14.15c-.24.68-1.2 1.25-1.96 1.41-.52.11-1.2.2-3.48-.75-2.92-1.21-4.8-4.18-4.95-4.38-.14-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.14 1.02-2.43.27-.29.58-.36.78-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.05 1.13 1 2.08 1.31 2.38 1.46.3.15.47.13.65-.08.18-.2.78-.91.99-1.22.21-.31.43-.26.72-.15.3.11 1.88.89 2.2 1.05.32.16.54.24.62.38.08.14.08.81-.16 1.49z" /></svg>
                <span>WhatsApp</span>
              </a>

            </div>
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
