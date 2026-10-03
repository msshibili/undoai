import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Calculator, Clock, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveConfigurator() {
  const { estimatorServices, estimatorScopes, estimatorAddons, addCustomRequest } = usePortfolio();

  const [selectedService, setSelectedService] = useState(estimatorServices[0] || null);
  const [selectedScope, setSelectedScope] = useState(estimatorScopes[0] || null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [clientEmail, setClientEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (estimatorServices.length > 0 && !selectedService) {
      setSelectedService(estimatorServices[0]);
    }
  }, [estimatorServices, selectedService]);

  useEffect(() => {
    if (estimatorScopes.length > 0 && !selectedScope) {
      setSelectedScope(estimatorScopes[0]);
    }
  }, [estimatorScopes, selectedScope]);

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const activeSvc = selectedService || estimatorServices[0] || { basePrice: 2499, baseWeeks: 1, name: 'Custom Design' };
  const activeScp = selectedScope || estimatorScopes[0] || { multiplier: 1.0, extraWeeks: 0, name: 'Single Asset' };

  const addonCost = selectedAddons.reduce((sum, id) => {
    const item = estimatorAddons.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalEstimate = Math.round(activeSvc.basePrice * activeScp.multiplier + addonCost);

  const addonWeeks = selectedAddons.reduce((sum, id) => {
    const item = estimatorAddons.find((a) => a.id === id);
    return sum + (item ? item.weeks : 0);
  }, 0);

  const totalWeeks = Math.max(1, Math.round(activeSvc.baseWeeks + activeScp.extraWeeks + addonWeeks));

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomRequest({
      service: activeSvc.name,
      scope: activeScp.name,
      addons: selectedAddons,
      estimatedPrice: totalEstimate,
      estimatedWeeks: totalWeeks,
      email: clientEmail,
    });

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="configurator" style={{ padding: '6rem 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        
        {/* Section Title */}
        <div className="section-header">
          <span className="section-tag" style={{ color: 'var(--accent-cyan)' }}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
            CREATIVE CORNER ESTIMATOR
          </span>
          <h2 className="section-title">Build Your Custom Project Order</h2>
          <p className="section-subtitle">
            Configure your design requirements and get instant price and production estimates.
          </p>
        </div>

        {/* Layout */}
        <div className="config-layout">
          
          {/* Options */}
          <div>
            
            {/* Step 1 */}
            <div className="config-box">
              <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#c084fc', marginBottom: '1rem' }}>
                1. SELECT SERVICE TYPE
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {estimatorServices.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => setSelectedService(svc)}
                    className={`config-option-btn ${activeSvc.id === svc.id ? 'active' : ''}`}
                  >
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{svc.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="config-box">
              <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#c084fc', marginBottom: '1rem' }}>
                2. SELECT PROJECT SCOPE
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {estimatorScopes.map((scp) => (
                  <button
                    key={scp.id}
                    type="button"
                    onClick={() => setSelectedScope(scp)}
                    className={`config-option-btn ${activeScp.id === scp.id ? 'active' : ''}`}
                  >
                    <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{scp.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scale x{scp.multiplier}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="config-box">
              <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#c084fc', marginBottom: '1rem' }}>
                3. ADD-ONS & EXTRA CREATIVE FEATURES
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {estimatorAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`config-option-btn ${isChecked ? 'active' : ''}`}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{addon.name}</p>
                        <p style={{ fontSize: '0.75rem', color: '#c084fc' }}>+₹{addon.price.toLocaleString()}</p>
                      </div>
                      <span>{isChecked ? '✓' : ''}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary */}
          <div>
            <div className="summary-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
                <Calculator size={16} />
                <span>Live Estimate</span>
              </div>

              <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Investment</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  ₹{totalEstimate.toLocaleString()}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Clock size={16} color="#06b6d4" />
                  <span>Timeline: <strong style={{ color: '#ffffff' }}>{totalWeeks} {totalWeeks === 1 ? 'Week' : 'Weeks'}</strong></span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} />
                  <span>Request Official Proposal</span>
                </button>
              </form>

              {submitted && (
                <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#6ee7b7', fontSize: '0.8rem', fontWeight: 600 }}>
                  Proposal Request Received! Our team will contact you within 24 hours.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
