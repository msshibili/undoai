import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Trophy, Award, Zap, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const { settings } = usePortfolio();

  const statsList = settings?.stats || [
    { label: 'Projects Created', value: '450+' },
    { label: 'Creative Services', value: '8' },
    { label: 'Design Categories', value: '12' },
    { label: 'Digital Experiences', value: '99.8%' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Heading & Description */}
        <div className="lg:col-span-7 space-y-8">
          
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About undo.ai</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white tracking-tight leading-tight">
              {settings?.aboutHeading || 'We Turn Ideas Into Visual Experiences.'}
            </h2>
          </div>

          <p className="text-slate-300 text-lg font-light leading-relaxed">
            {settings?.aboutDescription || '“undo.ai is a creative design and digital media studio focused on transforming ideas into visually engaging experiences. From static designs to video and AI-powered content, we create visuals that communicate, connect, and stand out.”'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-200">High-Impact Brand Visuals</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-200">Generative AI Video Workflows</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-200">Editorial Layout Precision</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-200">Platform-Ready Assets</span>
            </div>
          </div>

        </div>

        {/* Right Column: Editable Statistics Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-6">
          {statsList.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card-interactive p-6 rounded-3xl border-white/10 text-center flex flex-col items-center justify-center group"
            >
              <span className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
