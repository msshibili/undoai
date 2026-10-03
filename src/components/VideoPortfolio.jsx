import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Play, Sparkles, Film, Maximize2, X, Lock } from 'lucide-react';

export default function VideoPortfolio() {
  const { projects } = usePortfolio();
  const [activeVideo, setActiveVideo] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Filter video & AI projects
  const videoProjects = projects?.filter(
    p => p.published !== false && (p.videoUrl || p.category === 'Video Editing' || p.category === 'AI Video Creation')
  ) || [];

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      
      {/* Toast Notice */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl glass-card border-purple-500/40 bg-purple-950/80 text-purple-200 text-xs font-semibold flex items-center gap-2.5 shadow-2xl">
          <Lock className="w-4 h-4 text-purple-400" />
          <span>undo.ai Motion Protection — Download disabled</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic & Generative Media</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Motion & <span className="gradient-text-accent">AI</span>
          </h2>
        </div>
        <p className="text-slate-400 text-base max-w-md">
          High-definition video edits, dynamic motion graphics, and synthetic AI-generated video concepts engineered for maximal visual punch.
        </p>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveVideo(project)}
            className="group relative rounded-3xl overflow-hidden glass-card border-white/10 cursor-pointer transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1.5 shadow-xl"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-black/60 overflow-hidden">
              <img
                src={project.thumbnail || project.mainImage}
                alt={project.title}
                onContextMenu={handleContextMenu}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 protected-media"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-purple-600/30 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-pink-300">
                {project.category}
              </div>
            </div>

            {/* Video Content details */}
            <div className="p-6">
              <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-xs line-clamp-2 font-light">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#090a0f] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/50">
              <div>
                <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{activeVideo.category}</span>
                <h3 className="text-xl font-bold font-display text-white">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Player Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {activeVideo.videoUrl ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  controlsList="nodownload"
                  onContextMenu={handleContextMenu}
                  className="w-full h-full object-contain protected-media"
                />
              ) : (
                <div className="text-center p-8">
                  <Film className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-60" />
                  <p className="text-slate-300 font-medium">Video preview loading or demo stream active.</p>
                </div>
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-6 bg-black/40 text-sm text-slate-300 font-light border-t border-white/5">
              {activeVideo.description}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
