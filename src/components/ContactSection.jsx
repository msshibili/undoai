import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Send, CheckCircle2, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const { settings, addMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Social Media Poster Design',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(formData);

    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch (err) { }

    setSubmitted(true);
    setFormData({ name: '', email: '', service: 'Social Media Poster Design', message: '' });
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
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct Email</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>
                    {(!settings?.contactEmail || settings?.contactEmail === 'hello@undo.ai') ? 'undoaicreatives@gmail.com' : settings.contactEmail}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Global Headquarters</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>
                    {(!settings?.location || settings?.location.includes('San Francisco')) ? 'Virtual' : settings.location}
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div style={{ marginTop: '0.5rem', padding: '1.25rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Connect With Us
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  
                  {/* BEHANCE LINK */}
                  <a
                    href={settings?.socialBehance || "https://www.behance.net"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-light)', color: '#ffffff', textDecoration: 'none', transition: 'all 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0057ff'; e.currentTarget.style.background = 'rgba(0,87,255,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <div style={{ color: '#0057ff', display: 'flex', alignItems: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7V5h7v2zm-1.63 4.88c-.62-.73-1.6-1.12-2.91-1.12-2.58 0-4.46 1.76-4.46 4.41 0 2.69 1.83 4.41 4.54 4.41 1.93 0 3.37-.82 4.09-2.31h-2.12c-.41.52-1.07.78-1.87.78-1.16 0-1.99-.68-2.2-1.78h6.46c.03-.23.05-.52.05-.79 0-1.46-.42-2.73-1.58-3.6zm-4.99 2.51c.17-1 .92-1.64 1.97-1.64.99 0 1.76.62 1.91 1.64h-3.88zM8.33 13.88c.67.43 1.09 1.13 1.09 2.06 0 1.78-1.41 2.87-3.87 2.87H0V5.19h5.18c2.32 0 3.66 1.03 3.66 2.56 0 .97-.48 1.69-1.34 2.15v.06c1.03.35 1.63 1.17 1.63 2.32v1.6zm-5.5-6.19v2.85h2.24c1.1 0 1.73-.47 1.73-1.4 0-.96-.64-1.45-1.76-1.45H2.83zm0 5.23v3.25h2.46c1.24 0 1.96-.54 1.96-1.62 0-1.06-.71-1.63-1.95-1.63H2.83z"/></svg>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Behance</span>
                  </a>

                  {/* LINKEDIN LINK */}
                  <a
                    href={settings?.socialLinkedin || "https://www.linkedin.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-light)', color: '#ffffff', textDecoration: 'none', transition: 'all 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0a66c2'; e.currentTarget.style.background = 'rgba(10,102,194,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <div style={{ color: '#0a66c2', display: 'flex', alignItems: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"/></svg>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>LinkedIn</span>
                  </a>

                  {/* INSTAGRAM LINK */}
                  <a
                    href={settings?.socialInstagram || "https://www.instagram.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-light)', color: '#ffffff', textDecoration: 'none', transition: 'all 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e1306c'; e.currentTarget.style.background = 'rgba(225,48,108,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <div style={{ color: '#e1306c', display: 'flex', alignItems: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Instagram</span>
                  </a>

                  {/* WHATSAPP LINK */}
                  <a
                    href={settings?.socialWhatsapp || "https://wa.me/15550192834"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-light)', color: '#ffffff', textDecoration: 'none', transition: 'all 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#25d366'; e.currentTarget.style.background = 'rgba(37,211,102,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <div style={{ color: '#25d366', display: 'flex', alignItems: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.81 9.81 0 0 0 12.04 2zm5.8 14.15c-.24.68-1.2 1.25-1.96 1.41-.52.11-1.2.2-3.48-.75-2.92-1.21-4.8-4.18-4.95-4.38-.14-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.14 1.02-2.43.27-.29.58-.36.78-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.05 1.13 1 2.08 1.31 2.38 1.46.3.15.47.13.65-.08.18-.2.78-.91.99-1.22.21-.31.43-.26.72-.15.3.11 1.88.89 2.2 1.05.32.16.54.24.62.38.08.14.08.81-.16 1.49z"/></svg>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>WhatsApp</span>
                  </a>

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
                  <option value="Social Media Poster Design">Social Media Poster Design</option>
                  <option value="Flyer & Events Poster Design">Flyer & Events Poster Design</option>
                  <option value="Magazine Layout">Magazine Layout</option>
                  <option value="AI Video Creation">AI Video Creation</option>
                  <option value="Video Editing">Video Editing</option>
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
