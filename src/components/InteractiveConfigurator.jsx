import React, { useState, useEffect } from 'react';
import { usePortfolio, getDaysAndHours, formatProductionTime } from '../context/PortfolioContext';
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

  const activeSvc = selectedService || estimatorServices[0] || { basePrice: 2499, baseDays: 3, baseHours: 0, name: 'Custom Design' };
  const activeScp = selectedScope || estimatorScopes[0] || { multiplier: 1.0, extraDays: 0, extraHours: 0, name: 'Single Asset' };

  const addonCost = selectedAddons.reduce((sum, id) => {
    const item = estimatorAddons.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalEstimate = Math.round(activeSvc.basePrice * activeScp.multiplier + addonCost);

  const svcDH = getDaysAndHours(activeSvc);
  const scpDH = getDaysAndHours(activeScp);

  const addonDH = selectedAddons.reduce(
    (acc, id) => {
      const item = estimatorAddons.find((a) => a.id === id);
      const dh = getDaysAndHours(item);
      return { days: acc.days + dh.days, hours: acc.hours + dh.hours };
    },
    { days: 0, hours: 0 }
  );

  const totalDays = svcDH.days + scpDH.days + addonDH.days;
  const totalHours = svcDH.hours + scpDH.hours + addonDH.hours;
  const formattedTime = formatProductionTime(totalDays, totalHours);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomRequest({
      service: activeSvc.name,
      scope: activeScp.name,
      addons: selectedAddons,
      estimatedPrice: totalEstimate,
      estimatedDays: totalDays,
      estimatedHours: totalHours,
      estimatedTimeText: formattedTime,
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
            Configure your design requirements and get instant price and production estimates in Days & Hours.
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
                {estimatorServices.map((svc) => {
                  const dh = getDaysAndHours(svc);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setSelectedService(svc)}
                      className={`config-option-btn ${activeSvc.id === svc.id ? 'active' : ''}`}
                    >
                      <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{svc.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                        Base Time: {formatProductionTime(dh.days, dh.hours)}
                      </span>
                    </button>
                  );
                })}
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
                  const dh = getDaysAndHours(addon);
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
                        <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          +{dh.days}d {dh.hours}h
                        </p>
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
                  <span>Timeline: <strong style={{ color: '#ffffff' }}>{formattedTime}</strong></span>
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
