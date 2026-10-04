import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Shield, Menu, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar({ onOpenAdmin }) {
  const { settings } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        
        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={closeMobileMenu}>
          {settings?.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt="undo.ai Logo"
              style={{ height: '38px', maxWidth: '160px', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <>
              <div className="logo-box">
                <div className="logo-inner">⟲</div>
              </div>
              <span className="brand-title">
                undo<span>.ai</span>
              </span>
            </>
          )}
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links desktop-only">
          <a href="#services" className="nav-link">Services</a>
          <a href="#work" className="nav-link">Portfolio</a>
          <a href="#configurator" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#06b6d4' }}>
            <Sparkles size={14} />
            <span>AI Studio</span>
          </a>
          <a href="#process" className="nav-link">Process</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Desktop Controls */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onOpenAdmin}
            className="btn-secondary"
            style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Shield size={14} color="#8b5cf6" />
            <span>Studio Portal</span>
          </button>

          <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
            <span>Get Started</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onOpenAdmin}
            className="btn-secondary"
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            title="Studio Portal"
          >
            <Shield size={14} color="#8b5cf6" />
            <span style={{ fontSize: '0.7rem' }}>Portal</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-secondary"
            style={{ padding: '0.5rem 0.75rem', color: '#ffffff' }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Touch Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-in">
          <div className="mobile-drawer-content">
            <a href="#services" onClick={closeMobileMenu} className="mobile-nav-link">
              Services
            </a>
            <a href="#work" onClick={closeMobileMenu} className="mobile-nav-link">
              Portfolio
            </a>
            <a href="#configurator" onClick={closeMobileMenu} className="mobile-nav-link" style={{ color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} />
              <span>AI Studio Estimator</span>
            </a>
            <a href="#process" onClick={closeMobileMenu} className="mobile-nav-link">
              Process
            </a>
            <a href="#contact" onClick={closeMobileMenu} className="mobile-nav-link">
              Contact Us
            </a>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  closeMobileMenu();
                  onOpenAdmin();
                }}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                <Shield size={16} color="#8b5cf6" />
                <span>Open Studio Portal</span>
              </button>

              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                <span>Get Started Now</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
