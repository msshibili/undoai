import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Code2, Sparkles, Palette, Film, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Code2: Code2,
  Sparkles: Sparkles,
  Palette: Palette,
  Film: Film,
};

export default function ServicesSection() {
  const { services } = usePortfolio();

  return (
    <section id="services" style={{ padding: '6rem 0', background: '#06070c', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">OUR CAPABILITIES</span>
          <h2 className="section-title">Precision Craftsmanship Across Media</h2>
          <p className="section-subtitle">
            From cinematic video production to scalable web engineering and brand identity systems.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid-4">
          {services.map((item) => {
            const IconComponent = iconMap[item.icon] || Code2;
            return (
              <div key={item.id} className="feature-card">
                <div className="card-icon">
                  <IconComponent size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                  <span>Explore Service</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
