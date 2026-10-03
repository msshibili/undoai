import React, { useState, useEffect } from 'react';
import { usePortfolio, getDaysAndHours, formatProductionTime } from '../context/PortfolioContext';
import { processAndUploadImage } from '../firebase/config';
import { Lock, ArrowLeft, Plus, Trash2, Edit3, Save, Check, Database, Layers, Code2, Mail, Zap, Upload, ArrowUp, ArrowDown, X, Calculator, Loader2 } from 'lucide-react';

const categoriesList = [
  { name: 'Social Media', tag: 'social' },
  { name: 'Logo & Branding', tag: 'branding' },
  { name: 'Magazine Layout', tag: 'magazine' },
  { name: 'Video Edit', tag: 'video' },
  { name: 'AI Video Creation', tag: 'aivideo' },
];

const fastTemplates = [
  {
    title: 'Social Media Campaign Pack',
    category: 'Social Media',
    tag: 'social',
    thumbnail: '/project-cyber.png',
    client: 'Apex Brands',
    description: 'High-impact social media assets, animated stories, and carousel templates designed for max engagement.',
  },
  {
    title: 'Minimalist Vector Logo & Guidelines',
    category: 'Logo & Branding',
    tag: 'branding',
    thumbnail: '/hero-showcase.png',
    client: 'Nexus Global',
    description: 'Distinct vector logo mark, visual brand identity guidelines, design tokens, and digital logo files.',
  },
  {
    title: 'Fashion & Art Editorial Magazine',
    category: 'Magazine Layout',
    tag: 'magazine',
    thumbnail: '/project-abstract.png',
    client: 'Vogue Tech',
    description: 'Contemporary multi-page magazine layout grid, typography hierarchy, and luxury print spread.',
  },
  {
    title: 'Cinematic 4K Commercial Edit',
    category: 'Video Edit',
    tag: 'video',
    thumbnail: '/project-cyber.png',
    client: 'Redline Studios',
    description: 'High-octane commercial video editing, color grading, visual FX, and custom audio mixing.',
  },
  {
    title: 'AI Generative Motion & Avatar Video',
    category: 'AI Video Creation',
    tag: 'aivideo',
    thumbnail: '/project-abstract.png',
    client: 'SynthAI Corp',
    description: 'Synthetic video creation sequence powered by neural rendering, liquid shader animations, and AI voiceover.',
  },
];

export default function AdminPortal({ onClose }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [activeTab, setActiveTab] = useState('estimator');

  const {
    settings,
    updateSiteSettings,
    services,
    addService,
    updateService,
    deleteService,
    projects,
    addProject,
    updateProject,
    deleteProject,
    moveProjectUp,
    moveProjectDown,
    estimatorServices,
    addEstimatorService,
    updateEstimatorService,
    deleteEstimatorService,
    estimatorScopes,
    addEstimatorScope,
    updateEstimatorScope,
    deleteEstimatorScope,
    estimatorAddons,
    addEstimatorAddon,
    updateEstimatorAddon,
    deleteEstimatorAddon,
    messages,
    deleteMessage,
    customRequests,
    deleteCustomRequest,
    firebaseStatus,
    firebaseError,
  } = usePortfolio();

  const [tempSettings, setTempSettings] = useState({ ...settings });

  useEffect(() => {
    if (settings) {
      setTempSettings({ ...settings });
    }
  }, [settings]);

  // New Project State
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Social Media',
    tag: 'social',
    thumbnail: '/project-cyber.png',
    mainImage: '/project-cyber.png',
    description: '',
    client: '',
    date: '2026',
  });

  const [editingProject, setEditingProject] = useState(null);

  // New Estimator Item States (in Days & Hours)
  const [newEstSvc, setNewEstSvc] = useState({ name: '', basePrice: 2499, baseDays: 3, baseHours: 0 });
  const [newEstScp, setNewEstScp] = useState({ name: '', multiplier: 1.5, extraDays: 1, extraHours: 0 });
  const [newEstAdn, setNewEstAdn] = useState({ name: '', price: 1500, days: 1, hours: 12 });

  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const url = await processAndUploadImage(file);
      setIsUploading(false);
      if (url) {
        setImagePreview(url);
        setNewProject((prev) => ({
          ...prev,
          thumbnail: url,
          mainImage: url,
        }));
        setSaveSuccessMsg('Poster image uploaded & compressed for global sync!');
        setTimeout(() => setSaveSuccessMsg(''), 4000);
      }
    }
  };

  const handleEditFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const url = await processAndUploadImage(file);
      setIsUploading(false);
      if (url) {
        setEditImagePreview(url);
        setEditingProject((prev) => ({
          ...prev,
          thumbnail: url,
          mainImage: url,
        }));
        setSaveSuccessMsg('Updated poster image uploaded & compressed!');
        setTimeout(() => setSaveSuccessMsg(''), 4000);
      }
    }
  };

  const handleApplyTemplate = (tpl) => {
    setNewProject({
      ...newProject,
      title: tpl.title,
      category: tpl.category,
      tag: tpl.tag,
      thumbnail: tpl.thumbnail,
      mainImage: tpl.thumbnail,
      client: tpl.client,
      description: tpl.description,
    });
    setImagePreview(tpl.thumbnail);
    setSaveSuccessMsg(`Template "${tpl.title}" applied! Click Publish Project to add.`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (accessKey === 'undo.ai@ms2026') {
      setAuthenticated(true);
    } else {
      alert('Invalid Studio Access Key.');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const ok = await updateSiteSettings(tempSettings);
    if (ok) {
      setSaveSuccessMsg('Website content settings saved and synced successfully to Firebase!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    const ok = await addProject({
      ...newProject,
      thumbnail: newProject.thumbnail || '/project-cyber.png',
      mainImage: newProject.mainImage || newProject.thumbnail || '/project-cyber.png',
    });
    if (ok) {
      setNewProject({
        title: '',
        category: 'Social Media',
        tag: 'social',
        thumbnail: '/project-cyber.png',
        mainImage: '/project-cyber.png',
        description: '',
        client: '',
        date: '2026',
      });
      setImagePreview(null);
      setSaveSuccessMsg('New Project published and saved to Firebase!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  const handleSaveEditedProject = async (e) => {
    e.preventDefault();
    if (!editingProject) return;
    const ok = await updateProject(editingProject.id, editingProject);
    if (ok) {
      setEditingProject(null);
      setSaveSuccessMsg('Project updated successfully in Firebase!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  // Estimator Handlers
  const handleAddEstSvc = async (e) => {
    e.preventDefault();
    if (!newEstSvc.name) return;
    const ok = await addEstimatorService({
      ...newEstSvc,
      basePrice: Number(newEstSvc.basePrice),
      baseDays: Number(newEstSvc.baseDays),
      baseHours: Number(newEstSvc.baseHours),
    });
    if (ok) {
      setNewEstSvc({ name: '', basePrice: 2499, baseDays: 3, baseHours: 0 });
      setSaveSuccessMsg('Estimator Service Type added live to Firebase!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  const handleAddEstScp = async (e) => {
    e.preventDefault();
    if (!newEstScp.name) return;
    const ok = await addEstimatorScope({
      ...newEstScp,
      multiplier: Number(newEstScp.multiplier),
      extraDays: Number(newEstScp.extraDays),
      extraHours: Number(newEstScp.extraHours),
    });
    if (ok) {
      setNewEstScp({ name: '', multiplier: 1.5, extraDays: 1, extraHours: 0 });
      setSaveSuccessMsg('Estimator Scope option added live to Firebase!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  const handleAddEstAdn = async (e) => {
    e.preventDefault();
    if (!newEstAdn.name) return;
    const ok = await addEstimatorAddon({
      ...newEstAdn,
      price: Number(newEstAdn.price),
      days: Number(newEstAdn.days),
      hours: Number(newEstAdn.hours),
    });
    if (ok) {
      setNewEstAdn({ name: '', price: 1500, days: 1, hours: 12 });
      setSaveSuccessMsg('Estimator Add-on added live to Firebase!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  if (!authenticated) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" style={{ maxWidth: '420px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', margin: '0 auto 1rem auto' }}>
              <Lock size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>undo.ai Studio Portal</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enter studio passkey to unlock site customizer</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              required
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Enter Admin Passkey"
              className="form-input"
              style={{ textAlign: 'center' }}
            />
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              Authenticate Admin Portal
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ArrowLeft size={14} />
              <span>Back to Main Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '1100px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>Studio Management Console</h2>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '20px',
                  background:
                    firebaseStatus === 'CONNECTED'
                      ? 'rgba(16, 185, 129, 0.2)'
                      : firebaseStatus === 'PERMISSION_DENIED'
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(245, 158, 11, 0.2)',
                  color:
                    firebaseStatus === 'CONNECTED'
                      ? '#10b981'
                      : firebaseStatus === 'PERMISSION_DENIED'
                      ? '#f87171'
                      : '#fbbf24',
                  border: `1px solid ${
                    firebaseStatus === 'CONNECTED'
                      ? 'rgba(16, 185, 129, 0.4)'
                      : firebaseStatus === 'PERMISSION_DENIED'
                      ? 'rgba(239, 68, 68, 0.4)'
                      : 'rgba(245, 158, 11, 0.4)'
                  }`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <Database size={12} />
                <span>
                  {firebaseStatus === 'CONNECTED'
                    ? 'Firebase Sync Active'
                    : firebaseStatus === 'PERMISSION_DENIED'
                    ? 'Firebase Security Rules Blocked'
                    : 'Firebase Offline / Local Cache'}
                </span>
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full control over Estimator pricing (₹ INR), project order, services & site content</p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
            Close Console
          </button>
        </div>

        {firebaseStatus === 'PERMISSION_DENIED' && (
          <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
            <p style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '0.85rem' }}>⚠️ Firebase Firestore Security Rules Warning</p>
            <p style={{ marginBottom: '0.5rem' }}>
              Your Firebase Firestore project (<strong>undo-ai-6fde6</strong>) is blocking read/write permissions.
            </p>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              <strong>Solution:</strong> Open your <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>Firebase Console</a> &rarr; Firestore Database &rarr; Rules tab, and set:
            </p>
            <pre style={{ background: '#090b10', padding: '0.5rem', borderRadius: '8px', fontSize: '0.75rem', color: '#a7f3d0', marginTop: '0.4rem', overflowX: 'auto' }}>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
            </pre>
          </div>
        )}

        {saveSuccessMsg && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#6ee7b7', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Check size={16} />
            <span>{saveSuccessMsg}</span>
          </div>
        )}


        {/* Console Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('estimator')}
            className={`btn-secondary ${activeTab === 'estimator' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', background: activeTab === 'estimator' ? 'var(--accent-cyan)' : 'var(--bg-card)', color: '#ffffff' }}
          >
            <Calculator size={14} />
            <span>Estimator & Pricing (₹ INR)</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`btn-secondary ${activeTab === 'projects' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', background: activeTab === 'projects' ? 'var(--primary-purple)' : 'var(--bg-card)', color: '#ffffff' }}
          >
            <Layers size={14} />
            <span>Project Order & Fast Upload ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`btn-secondary ${activeTab === 'settings' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', background: activeTab === 'settings' ? 'var(--primary-purple)' : 'var(--bg-card)', color: '#ffffff' }}
          >
            <Edit3 size={14} />
            <span>Hero & Content Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`btn-secondary ${activeTab === 'services' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', background: activeTab === 'services' ? 'var(--primary-purple)' : 'var(--bg-card)', color: '#ffffff' }}
          >
            <Code2 size={14} />
            <span>Manage Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`btn-secondary ${activeTab === 'inquiries' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', background: activeTab === 'inquiries' ? 'var(--accent-pink)' : 'var(--bg-card)', color: '#ffffff' }}
          >
            <Mail size={14} />
            <span>Inquiries ({messages.length + customRequests.length})</span>
          </button>
        </div>

        {/* TAB 1: ESTIMATOR & PRICING CUSTOMIZER (₹ INR) */}
        {activeTab === 'estimator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* SECTION 1: ESTIMATOR SERVICE TYPES */}
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c084fc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calculator size={18} />
                <span>1. Service Types & Base Pricing (₹ INR)</span>
              </h3>
                       {/* Add New Service Type Form */}
              <form onSubmit={handleAddEstSvc} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Service Name</label>
                  <input
                    type="text"
                    required
                    value={newEstSvc.name}
                    onChange={(e) => setNewEstSvc({ ...newEstSvc, name: e.target.value })}
                    placeholder="e.g. 3D Logo Animation"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Base Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={newEstSvc.basePrice}
                    onChange={(e) => setNewEstSvc({ ...newEstSvc, basePrice: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Base Production Days</label>
                  <input
                    type="number"
                    required
                    value={newEstSvc.baseDays}
                    onChange={(e) => setNewEstSvc({ ...newEstSvc, baseDays: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Base Production Hours</label>
                  <input
                    type="number"
                    required
                    value={newEstSvc.baseHours}
                    onChange={(e) => setNewEstSvc({ ...newEstSvc, baseHours: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '0.7rem 1.25rem', width: '100%', justifyContent: 'center' }}>
                    <Plus size={16} />
                    <span>Add Service Type</span>
                  </button>
                </div>
              </form>

              {/* List Service Types */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {estimatorServices.map((svc) => {
                  const dh = getDaysAndHours(svc);
                  return (
                    <div key={svc.id} style={{ padding: '1rem', background: 'rgba(7, 8, 13, 0.6)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div>
                        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{svc.name}</span>
                        <span style={{ fontSize: '0.8rem', color: '#06b6d4', marginLeft: '1rem' }}>Base Price: ₹{svc.basePrice.toLocaleString()}</span>
                        <span style={{ fontSize: '0.8rem', color: '#c084fc', marginLeft: '1rem' }}>
                          Timeline: {formatProductionTime(dh.days, dh.hours)}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            const newName = prompt('Edit Service Type Name:', svc.name);
                            const newPrice = prompt('Edit Base Price (₹ INR):', svc.basePrice);
                            const newDays = prompt('Edit Base Production Days:', dh.days);
                            const newHours = prompt('Edit Base Production Hours:', dh.hours);
                            if (newName && newPrice) {
                              updateEstimatorService(svc.id, {
                                name: newName,
                                basePrice: Number(newPrice),
                                baseDays: Number(newDays ?? dh.days),
                                baseHours: Number(newHours ?? dh.hours),
                              });
                            }
                          }}
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={async () => {
                            if (confirm(`Delete service type "${svc.name}"?`)) {
                              const ok = await deleteEstimatorService(svc.id);
                              if (ok !== false) {
                                setSaveSuccessMsg(`Service type "${svc.name}" removed successfully!`);
                                setTimeout(() => setSaveSuccessMsg(''), 4000);
                              }
                            }
                          }}
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.4)' }}
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* SECTION 2: ESTIMATOR PROJECT SCOPES */}
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calculator size={18} />
                <span>2. Project Scope Multipliers & Extra Production Time</span>
              </h3>

              <form onSubmit={handleAddEstScp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scope Name</label>
                  <input
                    type="text"
                    required
                    value={newEstScp.name}
                    onChange={(e) => setNewEstScp({ ...newEstScp, name: e.target.value })}
                    placeholder="e.g. Enterprise Global Pack"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scale Multiplier (x1.0, x1.8...)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newEstScp.multiplier}
                    onChange={(e) => setNewEstScp({ ...newEstScp, multiplier: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Extra Days</label>
                  <input
                    type="number"
                    required
                    value={newEstScp.extraDays}
                    onChange={(e) => setNewEstScp({ ...newEstScp, extraDays: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Extra Hours</label>
                  <input
                    type="number"
                    required
                    value={newEstScp.extraHours}
                    onChange={(e) => setNewEstScp({ ...newEstScp, extraHours: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '0.7rem 1.25rem', width: '100%', justifyContent: 'center' }}>
                    <Plus size={16} />
                    <span>Add Scope Option</span>
                  </button>
                </div>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {estimatorScopes.map((scp) => {
                  const dh = getDaysAndHours(scp);
                  return (
                    <div key={scp.id} style={{ padding: '1rem', background: 'rgba(7, 8, 13, 0.6)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div>
                        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{scp.name}</span>
                        <span style={{ fontSize: '0.8rem', color: '#c084fc', marginLeft: '1rem' }}>Scale x{scp.multiplier}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '1rem' }}>
                          Extra Time: +{dh.days}d {dh.hours}h
                        </span>
                      </div>

                      <button
                        onClick={async () => {
                          if (confirm(`Delete scope "${scp.name}"?`)) {
                            const ok = await deleteEstimatorScope(scp.id);
                            if (ok !== false) {
                              setSaveSuccessMsg(`Scope "${scp.name}" removed successfully!`);
                              setTimeout(() => setSaveSuccessMsg(''), 4000);
                            }
                          }
                        }}
                        className="btn-secondary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.4)' }}
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* SECTION 3: ESTIMATOR ADDONS */}
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ec4899', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} />
                <span>3. Add-ons & Extra Features (₹ INR)</span>
              </h3>

              <form onSubmit={handleAddEstAdn} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Add-on Feature Name</label>
                  <input
                    type="text"
                    required
                    value={newEstAdn.name}
                    onChange={(e) => setNewEstAdn({ ...newEstAdn, name: e.target.value })}
                    placeholder="e.g. Source Vectors & PSDs"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={newEstAdn.price}
                    onChange={(e) => setNewEstAdn({ ...newEstAdn, price: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Extra Days</label>
                  <input
                    type="number"
                    required
                    value={newEstAdn.days}
                    onChange={(e) => setNewEstAdn({ ...newEstAdn, days: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Extra Hours</label>
                  <input
                    type="number"
                    required
                    value={newEstAdn.hours}
                    onChange={(e) => setNewEstAdn({ ...newEstAdn, hours: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '0.7rem 1.25rem', width: '100%', justifyContent: 'center' }}>
                    <Plus size={16} />
                    <span>Add Add-on</span>
                  </button>
                </div>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {estimatorAddons.map((adn) => {
                  const dh = getDaysAndHours(adn);
                  return (
                    <div key={adn.id} style={{ padding: '1rem', background: 'rgba(7, 8, 13, 0.6)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div>
                        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{adn.name}</span>
                        <span style={{ fontSize: '0.8rem', color: '#ec4899', marginLeft: '1rem' }}>+₹{adn.price.toLocaleString()}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '1rem' }}>
                          Extra Time: +{dh.days}d {dh.hours}h
                        </span>
                      </div>

                      <button
                        onClick={async () => {
                          if (confirm(`Delete add-on "${adn.name}"?`)) {
                            const ok = await deleteEstimatorAddon(adn.id);
                            if (ok !== false) {
                              setSaveSuccessMsg(`Add-on "${adn.name}" removed successfully!`);
                              setTimeout(() => setSaveSuccessMsg(''), 4000);
                            }
                          }
                        }}
                        className="btn-secondary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.4)' }}
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* FULL PROJECT EDIT MODAL OVERLAY */}
        {editingProject && (
          <div style={{ padding: '1.5rem', background: 'rgba(15, 18, 30, 0.95)', borderRadius: '16px', border: '1px solid var(--primary-purple)', marginBottom: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 size={18} />
                <span>Edit Project Details ({editingProject.title})</span>
              </h3>
              <button onClick={() => setEditingProject(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditedProject} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Category</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => {
                    const catName = e.target.value;
                    const matched = categoriesList.find((c) => c.name === catName);
                    const tag = matched ? matched.tag : 'social';
                    setEditingProject({ ...editingProject, category: catName, tag });
                  }}
                  className="form-select"
                >
                  <option value="Social Media">Social Media</option>
                  <option value="Logo & Branding">Logo & Branding</option>
                  <option value="Magazine Layout">Magazine Layout</option>
                  <option value="Video Edit">Video Edit</option>
                  <option value="AI Video Creation">AI Video Creation</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 600 }}>⚡ Upload New Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditFileUpload}
                  className="form-input"
                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Client / Brand Name</label>
                <input
                  type="text"
                  value={editingProject.client || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.75rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                  <Save size={16} />
                  <span>Save Project Changes</span>
                </button>
                <button type="button" onClick={() => setEditingProject(null)} className="btn-secondary" style={{ padding: '0.6rem 1rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: PROJECTS ORDER & FAST MANUAL UPLOAD */}
        {activeTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* FAST UPLOAD TEMPLATES */}
            <div style={{ padding: '1.25rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                <Zap size={16} />
                <span>Fast Upload Preset Templates (1-Click Fill)</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {fastTemplates.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl)}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', background: 'var(--bg-card)', color: '#ffffff' }}
                  >
                    + {tpl.category} Template
                  </button>
                ))}
              </div>
            </div>

            {/* MANUAL FAST UPLOAD FORM */}
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={18} color="#06b6d4" />
                <span>Manual Fast Upload Project</span>
              </h3>

              <form onSubmit={handleCreateProject} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Social Media Design Reel"
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => {
                      const catName = e.target.value;
                      const matched = categoriesList.find((c) => c.name === catName);
                      const tag = matched ? matched.tag : 'social';
                      setNewProject({ ...newProject, category: catName, tag });
                    }}
                    className="form-select"
                    style={{ border: '1px solid var(--primary-purple)' }}
                  >
                    <option value="Social Media">Social Media</option>
                    <option value="Logo & Branding">Logo & Branding</option>
                    <option value="Magazine Layout">Magazine Layout</option>
                    <option value="Video Edit">Video Edit</option>
                    <option value="AI Video Creation">AI Video Creation</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>⚡ Upload Image File (Global Sync)</span>
                    {isUploading && (
                      <span style={{ fontSize: '0.7rem', color: '#fbbf24', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Loader2 size={12} className="animate-spin" /> Optimizing...
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={handleFileUpload}
                    className="form-input"
                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Client / Brand</label>
                  <input
                    type="text"
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Image URL (Optional Fallback)</label>
                  <input
                    type="text"
                    value={newProject.thumbnail}
                    onChange={(e) => {
                      setNewProject({ ...newProject, thumbnail: e.target.value, mainImage: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    placeholder="/project-cyber.png"
                    className="form-input"
                  />
                </div>

                {imagePreview && (
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#6ee7b7', fontWeight: 600 }}>Image Live Preview</label>
                    <div style={{ width: '100%', height: '70px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Description</label>
                  <textarea
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe the creative work..."
                    className="form-textarea"
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Plus size={16} />
                    <span>Publish Project to Website</span>
                  </button>
                </div>

              </form>
            </div>

            {/* LIST & ORDER PROJECTS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Active Projects Display Sequence ({projects.length})</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Use ⬆️ ⬇️ buttons to reorder display sequence</span>
              </div>

              {projects.map((proj, idx) => (
                <div key={proj.id} style={{ padding: '1.25rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c084fc', background: 'rgba(139,92,246,0.2)', padding: '0.25rem 0.6rem', borderRadius: '8px' }}>
                      #{idx + 1}
                    </span>
                    <img src={proj.thumbnail} alt="" style={{ width: '65px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div>
                      <p style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{proj.title}</p>
                      <p style={{ fontSize: '0.75rem', color: '#c084fc' }}>Category: {proj.category} | Client: {proj.client || 'Studio'}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      onClick={() => moveProjectUp(idx)}
                      disabled={idx === 0}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.6rem', opacity: idx === 0 ? 0.4 : 1 }}
                      title="Move Up in Order"
                    >
                      <ArrowUp size={14} />
                    </button>

                    <button
                      onClick={() => moveProjectDown(idx)}
                      disabled={idx === projects.length - 1}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.6rem', opacity: idx === projects.length - 1 ? 0.4 : 1 }}
                      title="Move Down in Order"
                    >
                      <ArrowDown size={14} />
                    </button>

                    <button
                      onClick={() => {
                        setEditingProject({ ...proj });
                        setEditImagePreview(proj.thumbnail);
                      }}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', borderColor: 'var(--primary-purple)' }}
                    >
                      <Edit3 size={14} />
                      <span>Edit Details</span>
                    </button>

                    <button
                      onClick={async () => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          const ok = await deleteProject(proj.id);
                          if (ok !== false) {
                            setSaveSuccessMsg(`Project "${proj.title}" removed successfully!`);
                            setTimeout(() => setSaveSuccessMsg(''), 4000);
                          }
                        }
                      }}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: HERO SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Top Hero Badge</label>
                <input
                  type="text"
                  value={tempSettings.badge || ''}
                  onChange={(e) => setTempSettings({ ...tempSettings, badge: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Title Line 1</label>
                <input
                  type="text"
                  value={tempSettings.titleLine1 || ''}
                  onChange={(e) => setTempSettings({ ...tempSettings, titleLine1: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Title Line 2 (Gradient)</label>
                <input
                  type="text"
                  value={tempSettings.titleLine2 || ''}
                  onChange={(e) => setTempSettings({ ...tempSettings, titleLine2: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Hero Description</label>
              <textarea
                rows={3}
                value={tempSettings.description || ''}
                onChange={(e) => setTempSettings({ ...tempSettings, description: e.target.value })}
                className="form-textarea"
              />
            </div>

            {/* HERO STATISTICS SECTION */}
            <div style={{ padding: '1.25rem', background: 'rgba(7, 8, 13, 0.6)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#c084fc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={16} />
                <span>Hero Banner Statistics & Access Controls</span>
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {/* Stat 1 */}
                <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>Statistic #1 (Projects)</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Value / Number</label>
                      <input
                        type="text"
                        value={tempSettings.statsProjects || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, statsProjects: e.target.value })}
                        placeholder="100+"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Label Text</label>
                      <input
                        type="text"
                        value={tempSettings.statsProjectsLabel || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, statsProjectsLabel: e.target.value })}
                        placeholder="Completed Works"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#06b6d4', marginBottom: '0.75rem' }}>Statistic #2 (Satisfaction)</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Value / Number</label>
                      <input
                        type="text"
                        value={tempSettings.statsSatisfaction || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, statsSatisfaction: e.target.value })}
                        placeholder="99.9%"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Label Text</label>
                      <input
                        type="text"
                        value={tempSettings.statsSatisfactionLabel || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, statsSatisfactionLabel: e.target.value })}
                        placeholder="Client Satisfaction"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8b5cf6', marginBottom: '0.75rem' }}>Statistic #3 (Experience)</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Value / Number</label>
                      <input
                        type="text"
                        value={tempSettings.statsExperience || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, statsExperience: e.target.value })}
                        placeholder="3+ Years"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Label Text</label>
                      <input
                        type="text"
                        value={tempSettings.statsExperienceLabel || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, statsExperienceLabel: e.target.value })}
                        placeholder="Years Experience"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Save size={16} />
                <span>Save All Site Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: SERVICES */}
        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Active Services ({services.length})</h3>
            {services.map((svc) => (
              <div key={svc.id} style={{ padding: '1.25rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{svc.title}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{svc.desc}</p>
                </div>
                <button
                  onClick={async () => {
                    if (confirm(`Delete service "${svc.title}"?`)) {
                      const ok = await deleteService(svc.id);
                      if (ok !== false) {
                        setSaveSuccessMsg(`Service "${svc.title}" removed successfully!`);
                        setTimeout(() => setSaveSuccessMsg(''), 4000);
                      }
                    }
                  }}
                  className="btn-secondary"
                  style={{ color: '#f87171', padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>Contact Inquiries ({messages.length})</h3>
              {messages.map((m) => (
                <div key={m.id} style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '12px', marginBottom: '0.5rem', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 700, color: '#c084fc', fontSize: '0.85rem' }}>{m.name} ({m.email})</p>
                    <p style={{ fontSize: '0.85rem', color: '#ffffff' }}>{m.message}</p>
                  </div>
                  <button
                    onClick={async () => {
                      const ok = await deleteMessage(m.id);
                      if (ok !== false) {
                        setSaveSuccessMsg('Inquiry message deleted!');
                        setTimeout(() => setSaveSuccessMsg(''), 4000);
                      }
                    }}
                    style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>AI Studio Proposals ({customRequests.length})</h3>
              {customRequests.map((r) => (
                <div key={r.id} style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '12px', marginBottom: '0.5rem', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>{r.email}</p>
                    <p style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
                      Est: ₹{r.estimatedPrice ? r.estimatedPrice.toLocaleString() : '0'} (
                      {r.estimatedTimeText ||
                        (r.estimatedDays !== undefined
                          ? formatProductionTime(r.estimatedDays, r.estimatedHours)
                          : `${r.estimatedWeeks || 1} wks`)}
                      ) | {r.service} ({r.scope})
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      const ok = await deleteCustomRequest(r.id);
                      if (ok !== false) {
                        setSaveSuccessMsg('Proposal request deleted!');
                        setTimeout(() => setSaveSuccessMsg(''), 4000);
                      }
                    }}
                    style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
