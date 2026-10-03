import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Send, CheckCircle2, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const { settings, addMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web & App Engineering',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(formData);

    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch (err) {}

    setSubmitted(true);
    setFormData({ name: '', email: '', service: 'Web & App Engineering', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', background: '#06070c', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Info */}
          <div>
            <span className="section-tag" style={{ color: 'var(--accent-cyan)' }}>GET IN TOUCH</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Let's Create Something Extraordinary</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              Have a project in mind? Fill out the form or reach out directly to our team.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', color: '#c084fc' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct Email</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{settings?.contactEmail || 'undoaicreatives@gmail.com'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', color: '#06b6d4' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Global Headquarters</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{settings?.location || 'Virtual'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: '2.5rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Morgan"
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Interested Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="form-select"
                >
                  <option value="Web & App Engineering">Web & App Engineering</option>
                  <option value="3D & Motion Graphics">3D & Motion Graphics</option>
                  <option value="Brand Identity System">Brand Identity System</option>
                  <option value="Cinematic Media & Video">Cinematic Media & Video</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Project Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your goals, timeline, and vision..."
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={16} />
                <span>Send Message</span>
              </button>

            </form>

            {submitted && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#6ee7b7', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} />
                <span>Message sent successfully! We will get back to you soon.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
