import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-brand-card/90 border border-white/10 text-white shadow-xl backdrop-blur-md hover:border-purple-500/50 hover:bg-purple-600/20 hover:scale-110 transition-all duration-300 group"
    >
      <ArrowUp className="w-5 h-5 text-indigo-400 group-hover:text-purple-300 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
