import React from 'react';
import { 
  Sparkles, 
  Eye, 
  Zap, 
  Bot, 
  CheckCircle, 
  Layers, 
  ShieldCheck, 
  Maximize
} from 'lucide-react';

export default function WhyUsSection() {
  const points = [
    {
      title: 'Creative-First Thinking',
      desc: 'We prioritize originality, bold visual storytelling, and distinct aesthetic direction.',
      icon: Sparkles
    },
    {
      title: 'Modern Visual Language',
      desc: 'Cutting-edge graphic composition, typographic rhythm, and dark-mode elegance.',
      icon: Eye
    },
    {
      title: 'Attention to Detail',
      desc: 'Pixel-perfect typography, color balance, and crisp export formatting.',
      icon: CheckCircle
    },
    {
      title: 'Fast Digital Workflow',
      desc: 'Agile design delivery cycles keeping pace with digital market demands.',
      icon: Zap
    },
    {
      title: 'AI-Powered Creativity',
      desc: 'Integrating generative AI motion and synth visuals into production pipelines.',
      icon: Bot
    },
    {
      title: 'Platform-Ready Designs',
      desc: 'Optimized aspect ratios and color profiles for social, web, and physical print.',
      icon: Maximize
    },
    {
      title: 'Custom Solutions',
      desc: 'Bespoke layouts and media tailored specifically to brand identities.',
      icon: Layers
    },
    {
      title: 'Professional Execution',
      desc: 'Reliable communication, strict deadline adherence, and studio-grade assets.',
      icon: ShieldCheck
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The undo.ai Standard</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Why Choose <span className="gradient-text-cyan">undo.ai</span>
        </h2>
        <p className="text-slate-400 text-base font-light">
          Combining visual design mastery, motion editing, and generative AI technology.
        </p>
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((pt, idx) => {
          const IconComp = pt.icon;

          return (
            <div
              key={idx}
              className="glass-card-interactive p-6 rounded-3xl border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {pt.title}
                </h3>

                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
