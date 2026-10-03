import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import ProjectModal from './ProjectModal';

export default function FeaturedProject() {
  const { projects } = usePortfolio();
  const [selectedModal, setSelectedModal] = useState(null);

  // Find featured project or fallback to top item
  const featured = projects?.find(p => p.featured && p.published !== false) || projects?.[0];

  if (!featured) return null;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
        <Star className="w-3.5 h-3.5 fill-current" />
        <span>Spotlight Project</span>
      </div>

      <div className="relative rounded-3xl overflow-hidden glass-card border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl bg-gradient-to-br from-indigo-950/40 via-[#0d0f18] to-[#090a0f]">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 hero-glow-2 rounded-full pointer-events-none opacity-40 blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          
          {/* Left: Large Visual Preview (7 cols) */}
          <div className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl aspect-[16/10]">
            <img
              src={featured.mainImage || featured.thumbnail || '/images/featured.png'}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 protected-media"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-semibold text-purple-300">
              {featured.category}
            </div>
          </div>

          {/* Right: Editorial Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Featured Work • {featured.date?.split('-')[0] || '2026'}
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white leading-tight">
                {featured.title}
              </h3>
            </div>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {featured.description}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setSelectedModal(featured)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:scale-105 hover:shadow-purple-500/50 transition-all duration-300 group"
              >
                <span>View Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {selectedModal && (
        <ProjectModal
          project={selectedModal}
          onClose={() => setSelectedModal(null)}
        />
      )}
    </section>
  );
}
