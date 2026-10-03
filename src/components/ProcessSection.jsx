import React from 'react';

const processSteps = [
  { step: '01', title: 'Discovery & Vision', desc: 'We align on goals, audience, brand DNA, and aesthetic direction.' },
  { step: '02', title: 'Strategy & Wireframes', desc: 'Crafting interactive prototypes, visual concepts, and clear scope.' },
  { step: '03', title: 'Design & Production', desc: 'Building high-fidelity assets, animations, and high-performance code.' },
  { step: '04', title: 'Launch & Growth', desc: 'Rigorous testing, seamless deployment, and continuous optimization.' },
];

export default function ProcessSection() {
  return (
    <section id="process" style={{ padding: '6rem 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">OUR METHOD</span>
          <h2 className="section-title">How We Deliver Excellence</h2>
        </div>

        <div className="grid-4">
          {processSteps.map((item, idx) => (
            <div key={idx} className="feature-card">
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-purple)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 300 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
