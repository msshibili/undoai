import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';

export default function Hero() {
  const { settings } = usePortfolio();

  return (
    <section className="hero-section">
      <div className="hero-glow-1" />

      <div className="container">
        <div className="hero-grid">
          
          {/* Left Content */}
          <div>
            <div className="badge">
              <Sparkles className="w-4 h-4" />
              <span>{settings.badge}</span>
            </div>

            <h1 className="hero-title">
              <span className="block">{settings.titleLine1}</span>
              <span className="gradient-text">{settings.titleLine2}</span>
            </h1>

            <p className="hero-desc">
              {settings.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#work" className="btn-primary">
                <span>{settings.ctaPrimary}</span>
                <ArrowRight size={16} />
              </a>

              <a href="#configurator" className="btn-secondary">
                <Wand2 size={16} color="#06b6d4" />
                <span>{settings.ctaSecondary}</span>
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div>
                <p className="stat-number" style={{ color: '#ffffff' }}>{settings.statsProjects || '100+'}</p>
                <p className="stat-label">{settings.statsProjectsLabel || 'Completed Works'}</p>
              </div>
              <div>
                <p className="stat-number" style={{ color: '#06b6d4' }}>{settings.statsSatisfaction || '99.9%'}</p>
                <p className="stat-label">{settings.statsSatisfactionLabel || 'Client Satisfaction'}</p>
              </div>
              <div>
                <p className="stat-number" style={{ color: '#8b5cf6' }}>{settings.statsExperience || '3+ Years'}</p>
                <p className="stat-label">{settings.statsExperienceLabel || 'Years Experience'}</p>
              </div>
            </div>

          </div>

          {/* Right Showcase Artwork */}
          <div className="showcase-card">
            <img
              src="/hero-showcase.png"
              alt="undo.ai Studio Showcase"
              className="showcase-img"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
