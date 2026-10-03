'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import { Lock, ArrowLeft, Plus, Trash2, Mail, Calculator, Check, Sparkles } from 'lucide-react';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const { messages, customRequests } = usePortfolio();

  const handleLogin = (e) => {
    e.preventDefault();
    if (accessKey === 'undo.ai@ms2026') {
      setAuthenticated(true);
    } else {
      alert('Invalid Studio Access Key.');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#07080d] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl glass-card border-purple-500/30 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-display text-white">undo.ai Studio Portal</h1>
            <p className="text-xs text-slate-400 font-light">Enter studio key to access management dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Enter Admin Passkey"
                className="w-full px-4 py-3.5 rounded-xl glass-input text-sm text-center"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all"
            >
              Authenticate Portal
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Website</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-extrabold font-display text-white">Studio Management Console</h1>
            <p className="text-xs text-slate-400 mt-1">Next.js 15 Active Portal Context</p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-slate-300 hover:text-white">
              Return to Site
            </Link>
            <button
              onClick={() => setAuthenticated(false)}
              className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'messages' ? 'bg-purple-600 text-white' : 'glass-card text-slate-400'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'requests' ? 'bg-cyan-600 text-white' : 'glass-card text-slate-400'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>AI Studio Proposals ({customRequests.length})</span>
          </button>
        </div>

        {/* Messages List */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="p-8 rounded-3xl glass-card text-center text-slate-400 text-sm">
                No contact messages received yet. Submit one on the contact section!
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="p-6 rounded-3xl glass-card space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-purple-300">{msg.name} ({msg.email})</span>
                    <span>{new Date(msg.date).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 inline-block text-cyan-400">
                    Service: {msg.service}
                  </div>
                  <p className="text-slate-300 text-sm">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Proposals List */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {customRequests.length === 0 ? (
              <div className="p-8 rounded-3xl glass-card text-center text-slate-400 text-sm">
                No interactive proposal estimates submitted yet.
              </div>
            ) : (
              customRequests.map((req) => (
                <div key={req.id} className="p-6 rounded-3xl glass-card space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-cyan-300">{req.email}</span>
                    <span>Estimated: <strong className="text-white">${req.estimatedPrice}</strong> ({req.estimatedWeeks} wks)</span>
                  </div>
                  <p className="text-slate-300 text-sm font-semibold">Service: {req.service} | Scope: {req.scope}</p>
                  <p className="text-xs text-slate-400">Addons: {req.addons.join(', ')}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
