import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc, onSnapshot } from '../firebase/config';

const defaultHeroSettings = {
  badge: '🎨 CREATIVE DESIGN & MEDIA CORNER',
  titleLine1: 'Where Imagination Meets,',
  titleLine2: 'Visual Perfection.',
  description: 'Your ultimate creative corner for Social Media Designs, Flyer & Poster Art, Logo & Branding Systems, Magazine Layouts, Video Editing, and AI Video Creation.',
  ctaPrimary: 'Explore Portfolio',
  ctaSecondary: 'Estimate Creative Scope',
  statsProjects: '350+',
  statsSatisfaction: '99.9%',
  statsExperience: '8+ Yrs',
  contactEmail: 'hello@undo.ai',
  location: 'San Francisco, CA & Tokyo, JP',
};

const defaultServices = [
  {
    id: 'social-media',
    title: 'Social Media Designs',
    desc: 'High-converting social graphics, Instagram carousels, animated story templates, and platform branding.',
    icon: 'Sparkles',
  },
  {
    id: 'flyer-design',
    title: 'Flyer & Poster Design',
    desc: 'Promotional flyers, concert & event posters, digital banner ads, and high-impact print collaterals.',
    icon: 'Palette',
  },
  {
    id: 'logo-branding',
    title: 'Logo & Branding Systems',
    desc: 'Distinct vector logo marks, brand identity style guides, custom typography, and complete brand universes.',
    icon: 'Palette',
  },
  {
    id: 'magazine-layout',
    title: 'Magazine & Print Layouts',
    desc: 'Editorial publication grids, digital spreads, fashion magazines, catalogues, and print typography hierarchy.',
    icon: 'Code2',
  },
  {
    id: 'video-edit',
    title: 'Cinematic Video Editing',
    desc: 'Commercial video editing, sound design, color grading, motion transitions, and high-energy promo reels.',
    icon: 'Film',
  },
  {
    id: 'ai-video',
    title: 'AI Video Creation',
    desc: 'Next-gen synthetic video generation, AI motion graphics, virtual avatars, and generative visual effects.',
    icon: 'Sparkles',
  },
];

const defaultEstimatorServices = [
  { id: 'est-svc-1', name: 'Social Media Design Suite', basePrice: 2499, baseWeeks: 1 },
  { id: 'est-svc-2', name: 'Flyer & Event Poster Pack', basePrice: 1999, baseWeeks: 1 },
  { id: 'est-svc-3', name: 'Logo & Brand Identity System', basePrice: 4999, baseWeeks: 2 },
  { id: 'est-svc-4', name: 'Editorial Magazine Layout', basePrice: 5999, baseWeeks: 2 },
  { id: 'est-svc-5', name: 'Cinematic Video Edit', basePrice: 7999, baseWeeks: 2 },
  { id: 'est-svc-6', name: 'AI Video Creation & VFX', basePrice: 9999, baseWeeks: 2 },
];

const defaultEstimatorScopes = [
  { id: 'est-scp-1', name: 'Single Design Asset', multiplier: 1.0, extraWeeks: 0 },
  { id: 'est-scp-2', name: 'Multi-Asset Creative Suite', multiplier: 1.8, extraWeeks: 1 },
  { id: 'est-scp-3', name: 'Full Campaign Brand Launch', multiplier: 2.8, extraWeeks: 2 },
];

const defaultEstimatorAddons = [
  { id: 'est-adn-1', name: 'Animated Motion Graphics', price: 1500, weeks: 0.5 },
  { id: 'est-adn-2', name: 'AI Virtual Avatar & Voiceover', price: 2500, weeks: 1 },
  { id: 'est-adn-3', name: 'High-Res Print Production Files', price: 999, weeks: 0 },
  { id: 'est-adn-4', name: '24h Expedited Fast Turnaround', price: 1999, weeks: -1 },
];

const defaultProjects = [
  {
    id: 'proj-1',
    title: 'Cyberpunk Social Media Design Suite',
    category: 'Social Media',
    tag: 'social',
    thumbnail: '/project-cyber.png',
    mainImage: '/project-cyber.png',
    description: 'High-engagement social media graphics suite featuring animated motion cards, story templates, and promotional banner assets.',
    date: '2026',
    client: 'Aetheria Digital',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Aetheria Vector Logo & Brand System',
    category: 'Logo & Branding',
    tag: 'branding',
    thumbnail: '/hero-showcase.png',
    mainImage: '/hero-showcase.png',
    description: 'Complete brand redesign including vector logo marks, typography guidelines, design tokens, and digital brand collateral.',
    date: '2026',
    client: 'Aetheria AI Labs',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Vortex Editorial Magazine Layout',
    category: 'Magazine Layout',
    tag: 'magazine',
    thumbnail: '/project-abstract.png',
    mainImage: '/project-abstract.png',
    description: 'Avant-garde digital & print magazine layout featuring bold typography grids, metallic foil mockups, and art direction.',
    date: '2026',
    client: 'Vortex Publications',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Festival Event Flyer & Poster Series',
    category: 'Social Media',
    tag: 'social',
    thumbnail: '/project-cyber.png',
    mainImage: '/project-cyber.png',
    description: 'Promotional event poster series and digital flyers crafted for international music and art festivals.',
    date: '2026',
    client: 'Sonic Wave Studio',
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'Commercial Video Editing & FX Reel',
    category: 'Video Edit',
    tag: 'video',
    thumbnail: '/project-cyber.png',
    mainImage: '/project-cyber.png',
    description: 'High-tempo commercial video edit with custom sound design, color grading, and seamless motion transitions.',
    date: '2025',
    client: 'Lumina Media',
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'Neural AI Video Creation & Motion',
    category: 'AI Video Creation',
    tag: 'aivideo',
    thumbnail: '/project-abstract.png',
    mainImage: '/project-abstract.png',
    description: 'Generative AI video sequence combining neural rendering, liquid shader animations, and futuristic audio reactivity.',
    date: '2026',
    client: 'Synthetic Labs',
    featured: true,
  },
];

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [settings, setSettings] = useState(defaultHeroSettings);
  const [services, setServices] = useState(defaultServices);
  const [projects, setProjects] = useState(defaultProjects);
  const [estimatorServices, setEstimatorServices] = useState(defaultEstimatorServices);
  const [estimatorScopes, setEstimatorScopes] = useState(defaultEstimatorScopes);
  const [estimatorAddons, setEstimatorAddons] = useState(defaultEstimatorAddons);

  const [messages, setMessages] = useState([]);
  const [customRequests, setCustomRequests] = useState([]);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [firebaseStatus, setFirebaseStatus] = useState('CONNECTED');

  useEffect(() => {
    // Load local storage initial caches
    const savedSettings = localStorage.getItem('undo_settings_inr_v6');
    if (savedSettings) setSettings(JSON.parse(savedSettings));

    const savedProjects = localStorage.getItem('undo_projects_inr_v6');
    if (savedProjects) setProjects(JSON.parse(savedProjects));

    const savedServices = localStorage.getItem('undo_services_inr_v6');
    if (savedServices) setServices(JSON.parse(savedServices));

    const savedEstSvc = localStorage.getItem('undo_est_svc_inr_v6');
    if (savedEstSvc) setEstimatorServices(JSON.parse(savedEstSvc));

    const savedEstScp = localStorage.getItem('undo_est_scp_inr_v6');
    if (savedEstScp) setEstimatorScopes(JSON.parse(savedEstScp));

    const savedEstAdn = localStorage.getItem('undo_est_adn_inr_v6');
    if (savedEstAdn) setEstimatorAddons(JSON.parse(savedEstAdn));

    // Firebase real-time listeners
    try {
      const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
        if (!snapshot.empty) {
          const fbProjects = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setProjects(fbProjects);
          localStorage.setItem('undo_projects_inr_v6', JSON.stringify(fbProjects));
        }
      }, () => setFirebaseStatus('OFFLINE_CACHE'));

      const unsubSettings = onSnapshot(doc(db, 'settings', 'hero'), (docSnap) => {
        if (docSnap.exists()) {
          const fbSettings = docSnap.data();
          setSettings(fbSettings);
          localStorage.setItem('undo_settings_inr_v6', JSON.stringify(fbSettings));
        }
      }, () => {});

      const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
        if (!snapshot.empty) {
          const fbServices = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setServices(fbServices);
          localStorage.setItem('undo_services_inr_v6', JSON.stringify(fbServices));
        }
      }, () => {});

      const unsubMessages = onSnapshot(collection(db, 'messages'), (snapshot) => {
        const fbMsgs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMessages(fbMsgs);
      }, () => {});

      const unsubProposals = onSnapshot(collection(db, 'proposals'), (snapshot) => {
        const fbProps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setCustomRequests(fbProps);
      }, () => {});

      return () => {
        if (typeof unsubProjects === 'function') unsubProjects();
        if (typeof unsubSettings === 'function') unsubSettings();
        if (typeof unsubServices === 'function') unsubServices();
        if (typeof unsubMessages === 'function') unsubMessages();
        if (typeof unsubProposals === 'function') unsubProposals();
      };
    } catch (err) {
      setFirebaseStatus('OFFLINE_CACHE');
    }
  }, []);

  const updateSiteSettings = async (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('undo_settings_inr_v6', JSON.stringify(newSettings));
    try {
      await setDoc(doc(db, 'settings', 'hero'), newSettings);
    } catch (e) {
      console.warn("Firestore settings update failed:", e);
    }
  };

  // Projects CRUD
  const addProject = async (project) => {
    const id = 'proj-' + Date.now();
    const newProj = { ...project, id };
    const updated = [newProj, ...projects];
    setProjects(updated);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'projects', id), newProj);
    } catch (e) {
      console.warn("Firestore addProject failed:", e);
    }
  };

  const updateProject = async (id, updatedFields) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjects(updated);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(updated));

    try {
      await updateDoc(doc(db, 'projects', id), updatedFields);
    } catch (e) {
      console.warn("Firestore updateProject failed:", e);
    }
  };

  const deleteProject = async (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (e) {
      console.warn("Firestore deleteProject failed:", e);
    }
  };

  const moveProjectUp = (index) => {
    if (index <= 0) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setProjects(updated);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(updated));
  };

  const moveProjectDown = (index) => {
    if (index >= projects.length - 1) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setProjects(updated);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(updated));
  };

  // ESTIMATOR SERVICES CRUD
  const addEstimatorService = async (item) => {
    const newItem = { ...item, id: 'est-svc-' + Date.now() };
    const updated = [...estimatorServices, newItem];
    setEstimatorServices(updated);
    localStorage.setItem('undo_est_svc_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorServices', newItem.id), newItem);
    } catch (e) {}
  };

  const updateEstimatorService = async (id, fields) => {
    const updated = estimatorServices.map((s) => (s.id === id ? { ...s, ...fields } : s));
    setEstimatorServices(updated);
    localStorage.setItem('undo_est_svc_inr_v6', JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'estimatorServices', id), fields);
    } catch (e) {}
  };

  const deleteEstimatorService = async (id) => {
    const updated = estimatorServices.filter((s) => s.id !== id);
    setEstimatorServices(updated);
    localStorage.setItem('undo_est_svc_inr_v6', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'estimatorServices', id));
    } catch (e) {}
  };

  // ESTIMATOR SCOPES CRUD
  const addEstimatorScope = async (item) => {
    const newItem = { ...item, id: 'est-scp-' + Date.now() };
    const updated = [...estimatorScopes, newItem];
    setEstimatorScopes(updated);
    localStorage.setItem('undo_est_scp_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorScopes', newItem.id), newItem);
    } catch (e) {}
  };

  const updateEstimatorScope = async (id, fields) => {
    const updated = estimatorScopes.map((s) => (s.id === id ? { ...s, ...fields } : s));
    setEstimatorScopes(updated);
    localStorage.setItem('undo_est_scp_inr_v6', JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'estimatorScopes', id), fields);
    } catch (e) {}
  };

  const deleteEstimatorScope = async (id) => {
    const updated = estimatorScopes.filter((s) => s.id !== id);
    setEstimatorScopes(updated);
    localStorage.setItem('undo_est_scp_inr_v6', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'estimatorScopes', id));
    } catch (e) {}
  };

  // ESTIMATOR ADDONS CRUD
  const addEstimatorAddon = async (item) => {
    const newItem = { ...item, id: 'est-adn-' + Date.now() };
    const updated = [...estimatorAddons, newItem];
    setEstimatorAddons(updated);
    localStorage.setItem('undo_est_adn_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorAddons', newItem.id), newItem);
    } catch (e) {}
  };

  const updateEstimatorAddon = async (id, fields) => {
    const updated = estimatorAddons.map((a) => (a.id === id ? { ...a, ...fields } : a));
    setEstimatorAddons(updated);
    localStorage.setItem('undo_est_adn_inr_v6', JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'estimatorAddons', id), fields);
    } catch (e) {}
  };

  const deleteEstimatorAddon = async (id) => {
    const updated = estimatorAddons.filter((a) => a.id !== id);
    setEstimatorAddons(updated);
    localStorage.setItem('undo_est_adn_inr_v6', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'estimatorAddons', id));
    } catch (e) {}
  };

  // Services CRUD
  const addService = async (service) => {
    const newSvc = { ...service, id: 'svc-' + Date.now() };
    const updated = [...services, newSvc];
    setServices(updated);
    localStorage.setItem('undo_services_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'services', newSvc.id), newSvc);
    } catch (e) {}
  };

  const updateService = async (id, updatedFields) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
    setServices(updated);
    localStorage.setItem('undo_services_inr_v6', JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'services', id), updatedFields);
    } catch (e) {}
  };

  const deleteService = async (id) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem('undo_services_inr_v6', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) {}
  };

  // Messages & Proposals
  const addMessage = async (msg) => {
    const id = Date.now().toString();
    const newMsg = { ...msg, id, date: new Date().toISOString() };
    setMessages((prev) => [newMsg, ...prev]);

    try {
      await setDoc(doc(db, 'messages', id), newMsg);
    } catch (e) {}
  };

  const deleteMessage = async (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (e) {}
  };

  const addCustomRequest = async (req) => {
    const id = Date.now().toString();
    const newReq = { ...req, id, date: new Date().toISOString() };
    setCustomRequests((prev) => [newReq, ...prev]);

    try {
      await setDoc(doc(db, 'proposals', id), newReq);
    } catch (e) {}
  };

  const deleteCustomRequest = async (id) => {
    setCustomRequests((prev) => prev.filter((r) => r.id !== id));
    try {
      await deleteDoc(doc(db, 'proposals', id));
    } catch (e) {}
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        addMessage,
        deleteMessage,
        customRequests,
        addCustomRequest,
        deleteCustomRequest,
        activeModalProject,
        setActiveModalProject,
        firebaseStatus,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
