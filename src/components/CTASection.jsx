import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  const { settings } = usePortfolio();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="relative rounded-3xl overflow-hidden glass-card border border-purple-500/30 p-10 sm:p-16 text-center bg-gradient-to-br from-indigo-950/50 via-[#0d0f18] to-purple-950/30 shadow-2xl">
        
        {/* Glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 hero-glow-1 rounded-full pointer-events-none opacity-40 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold font-display text-white tracking-tight">
            {settings?.ctaHeading || "Have an idea? Let's create it."}
          </h2>

          <p className="text-slate-300 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {settings?.ctaDescription || "“Tell us what you're imagining. We'll turn it into something visual.”"}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:scale-105 hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={scrollToWork}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-card hover:bg-white/10 text-slate-200 font-semibold text-sm border border-white/15 hover:border-purple-400/40 hover:text-white transition-all duration-300"
            >
              View Our Work
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
