import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc, onSnapshot } from '../firebase/config';

const defaultHeroSettings = {
  badge: '🎨 CREATIVE DESIGN & MEDIA CORNER',
  titleLine1: 'Where Imagination Meets,',
  titleLine2: 'Visual Perfection.',
  description: 'Your ultimate creative corner for Social Media Designs, Flyer & Poster Art, Logo & Branding Systems, Magazine Layouts, Video Editing, and AI Video Creation.',
  ctaPrimary: 'Explore Portfolio',
  ctaSecondary: 'Estimate Creative Scope',
  statsProjects: '100+',
  statsProjectsLabel: 'Completed Works',
  statsSatisfaction: '99.9%',
  statsSatisfactionLabel: 'Client Satisfaction',
  statsExperience: '3+ Years',
  statsExperienceLabel: 'Years Experience',
  contactEmail: 'undoaicreatives@gmail.com',
  location: 'Virtual',
  socialBehance: 'https://www.behance.net',
  socialLinkedin: 'https://www.linkedin.com',
  socialInstagram: 'https://www.instagram.com',
  socialWhatsapp: 'https://wa.me/15550192834',
  logoUrl: '',
  coverPhotoUrl: '/hero-showcase.png',
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

export function getDaysAndHours(item) {
  if (!item) return { days: 0, hours: 0 };
  let days = item.baseDays ?? item.extraDays ?? item.days;
  let hours = item.baseHours ?? item.extraHours ?? item.hours;

  if (days === undefined || days === null) {
    const weeks = item.baseWeeks ?? item.extraWeeks ?? item.weeks ?? 0;
    days = Math.floor(weeks * 7);
    hours = Math.round((weeks * 7 - days) * 24);
  }

  return { days: Number(days) || 0, hours: Number(hours) || 0 };
}

export function formatProductionTime(totalDays = 0, totalHours = 0) {
  let netHours = Math.round((totalDays * 24) + totalHours);
  if (netHours <= 0) return '24 Hours (Same Day Rush)';

  const d = Math.floor(netHours / 24);
  const h = netHours % 24;

  let parts = [];
  if (d > 0) parts.push(`${d} ${d === 1 ? 'Day' : 'Days'}`);
  if (h > 0) parts.push(`${h} ${h === 1 ? 'Hour' : 'Hours'}`);

  return `${parts.join(' ')} (${netHours}h Total)`;
}

const defaultEstimatorServices = [
  { id: 'est-svc-1', name: 'Social Media Design Suite', basePrice: 2499, baseDays: 3, baseHours: 0 },
  { id: 'est-svc-2', name: 'Flyer & Event Poster Pack', basePrice: 1999, baseDays: 2, baseHours: 12 },
  { id: 'est-svc-3', name: 'Logo & Brand Identity System', basePrice: 4999, baseDays: 5, baseHours: 0 },
  { id: 'est-svc-4', name: 'Editorial Magazine Layout', basePrice: 5999, baseDays: 6, baseHours: 0 },
  { id: 'est-svc-5', name: 'Cinematic Video Edit', basePrice: 7999, baseDays: 7, baseHours: 12 },
  { id: 'est-svc-6', name: 'AI Video Creation & VFX', basePrice: 9999, baseDays: 8, baseHours: 0 },
];

const defaultEstimatorScopes = [
  { id: 'est-scp-1', name: 'Single Design Asset', multiplier: 1.0, extraDays: 0, extraHours: 0 },
  { id: 'est-scp-2', name: 'Multi-Asset Creative Suite', multiplier: 1.8, extraDays: 2, extraHours: 12 },
  { id: 'est-scp-3', name: 'Full Campaign Brand Launch', multiplier: 2.8, extraDays: 5, extraHours: 0 },
];

const defaultEstimatorAddons = [
  { id: 'est-adn-1', name: 'Animated Motion Graphics', price: 1500, days: 1, hours: 12 },
  { id: 'est-adn-2', name: 'AI Virtual Avatar & Voiceover', price: 2500, days: 3, hours: 0 },
  { id: 'est-adn-3', name: 'High-Res Print Production Files', price: 999, days: 0, hours: 6 },
  { id: 'est-adn-4', name: '24h Expedited Fast Turnaround', price: 1999, days: -1, hours: -12 },
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
  const [firebaseError, setFirebaseError] = useState(null);

  useEffect(() => {
    // Load local storage initial caches
    const savedSettings = localStorage.getItem('undo_settings_inr_v6');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      if (parsed.statsProjects === '350+') parsed.statsProjects = '100+';
      if (parsed.statsExperience === '8+ Yrs') parsed.statsExperience = '3+ Years';
      if (!parsed.statsProjectsLabel) parsed.statsProjectsLabel = 'Completed Works';
      if (!parsed.statsSatisfactionLabel) parsed.statsSatisfactionLabel = 'Client Satisfaction';
      if (!parsed.statsExperienceLabel) parsed.statsExperienceLabel = 'Years Experience';
      setSettings(parsed);
    }

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

    const handleFirestoreError = (err, contextName) => {
      console.error(`Firestore [${contextName}] Error:`, err);
      if (err.code === 'permission-denied') {
        setFirebaseStatus('PERMISSION_DENIED');
        setFirebaseError('Firestore Permission Denied. Check Firebase Security Rules in Firebase Console.');
      } else {
        setFirebaseStatus('OFFLINE_CACHE');
        setFirebaseError(err.message || 'Firebase sync error');
      }
    };

    // Firebase real-time listeners
    try {
      const unsubProjects = onSnapshot(
        collection(db, 'projects'),
        (snapshot) => {
          if (!snapshot.empty) {
            const fbProjects = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            fbProjects.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
            setProjects(fbProjects);
            localStorage.setItem('undo_projects_inr_v6', JSON.stringify(fbProjects));
          } else {
            const hasSeeded = localStorage.getItem('undo_seeded_projects_v2');
            if (!hasSeeded) {
              localStorage.setItem('undo_seeded_projects_v2', 'true');
              defaultProjects.forEach((proj, idx) => {
                setDoc(doc(db, 'projects', proj.id), { ...proj, orderIndex: idx }, { merge: true }).catch(() => {});
              });
            } else {
              setProjects([]);
              localStorage.setItem('undo_projects_inr_v6', JSON.stringify([]));
            }
          }
          setFirebaseStatus('CONNECTED');
          setFirebaseError(null);
        },
        (err) => handleFirestoreError(err, 'projects')
      );

      const unsubSettings = onSnapshot(
        doc(db, 'settings', 'hero'),
        (docSnap) => {
          if (docSnap.exists()) {
            let fbSettings = docSnap.data();
            let needsUpdate = false;

            if (fbSettings.contactEmail === 'hello@undo.ai' || !fbSettings.contactEmail) {
              fbSettings.contactEmail = 'undoaicreatives@gmail.com';
              needsUpdate = true;
            }
            if (fbSettings.location?.includes('San Francisco') || !fbSettings.location) {
              fbSettings.location = 'Virtual';
              needsUpdate = true;
            }
            if (fbSettings.statsProjects === '350+' || !fbSettings.statsProjects) {
              fbSettings.statsProjects = '100+';
              needsUpdate = true;
            }
            if (!fbSettings.statsProjectsLabel) {
              fbSettings.statsProjectsLabel = 'Completed Works';
              needsUpdate = true;
            }
            if (!fbSettings.statsSatisfaction) {
              fbSettings.statsSatisfaction = '99.9%';
              needsUpdate = true;
            }
            if (!fbSettings.statsSatisfactionLabel) {
              fbSettings.statsSatisfactionLabel = 'Client Satisfaction';
              needsUpdate = true;
            }
            if (fbSettings.statsExperience === '8+ Yrs' || !fbSettings.statsExperience) {
              fbSettings.statsExperience = '3+ Years';
              needsUpdate = true;
            }
            if (!fbSettings.statsExperienceLabel) {
              fbSettings.statsExperienceLabel = 'Years Experience';
              needsUpdate = true;
            }
            if (!fbSettings.coverPhotoUrl) {
              fbSettings.coverPhotoUrl = '/hero-showcase.png';
              needsUpdate = true;
            }

            if (needsUpdate) {
              setDoc(doc(db, 'settings', 'hero'), fbSettings, { merge: true }).catch(() => {});
            }

            setSettings(fbSettings);
            localStorage.setItem('undo_settings_inr_v6', JSON.stringify(fbSettings));
          } else {
            setDoc(doc(db, 'settings', 'hero'), defaultHeroSettings, { merge: true }).catch(() => {});
          }
          setFirebaseStatus('CONNECTED');
          setFirebaseError(null);
        },
        (err) => handleFirestoreError(err, 'settings')
      );

      const unsubServices = onSnapshot(
        collection(db, 'services'),
        (snapshot) => {
          if (!snapshot.empty) {
            const fbServices = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setServices(fbServices);
            localStorage.setItem('undo_services_inr_v6', JSON.stringify(fbServices));
          } else {
            const hasSeeded = localStorage.getItem('undo_seeded_services_v2');
            if (!hasSeeded) {
              localStorage.setItem('undo_seeded_services_v2', 'true');
              defaultServices.forEach((svc) => {
                setDoc(doc(db, 'services', svc.id), svc, { merge: true }).catch(() => {});
              });
            } else {
              setServices([]);
              localStorage.setItem('undo_services_inr_v6', JSON.stringify([]));
            }
          }
        },
        (err) => handleFirestoreError(err, 'services')
      );

      const unsubEstServices = onSnapshot(
        collection(db, 'estimatorServices'),
        (snapshot) => {
          if (!snapshot.empty) {
            const fbEstSvc = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setEstimatorServices(fbEstSvc);
            localStorage.setItem('undo_est_svc_inr_v6', JSON.stringify(fbEstSvc));
          } else {
            const hasSeeded = localStorage.getItem('undo_seeded_est_svc_v2');
            if (!hasSeeded) {
              localStorage.setItem('undo_seeded_est_svc_v2', 'true');
              defaultEstimatorServices.forEach((svc) => {
                setDoc(doc(db, 'estimatorServices', svc.id), svc, { merge: true }).catch(() => {});
              });
            } else {
              setEstimatorServices([]);
              localStorage.setItem('undo_est_svc_inr_v6', JSON.stringify([]));
            }
          }
        },
        (err) => handleFirestoreError(err, 'estimatorServices')
      );

      const unsubEstScopes = onSnapshot(
        collection(db, 'estimatorScopes'),
        (snapshot) => {
          if (!snapshot.empty) {
            const fbEstScp = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setEstimatorScopes(fbEstScp);
            localStorage.setItem('undo_est_scp_inr_v6', JSON.stringify(fbEstScp));
          } else {
            const hasSeeded = localStorage.getItem('undo_seeded_est_scp_v2');
            if (!hasSeeded) {
              localStorage.setItem('undo_seeded_est_scp_v2', 'true');
              defaultEstimatorScopes.forEach((scp) => {
                setDoc(doc(db, 'estimatorScopes', scp.id), scp, { merge: true }).catch(() => {});
              });
            } else {
              setEstimatorScopes([]);
              localStorage.setItem('undo_est_scp_inr_v6', JSON.stringify([]));
            }
          }
        },
        (err) => handleFirestoreError(err, 'estimatorScopes')
      );

      const unsubEstAddons = onSnapshot(
        collection(db, 'estimatorAddons'),
        (snapshot) => {
          if (!snapshot.empty) {
            const fbEstAdn = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setEstimatorAddons(fbEstAdn);
            localStorage.setItem('undo_est_adn_inr_v6', JSON.stringify(fbEstAdn));
          } else {
            const hasSeeded = localStorage.getItem('undo_seeded_est_adn_v2');
            if (!hasSeeded) {
              localStorage.setItem('undo_seeded_est_adn_v2', 'true');
              defaultEstimatorAddons.forEach((adn) => {
                setDoc(doc(db, 'estimatorAddons', adn.id), adn, { merge: true }).catch(() => {});
              });
            } else {
              setEstimatorAddons([]);
              localStorage.setItem('undo_est_adn_inr_v6', JSON.stringify([]));
            }
          }
        },
        (err) => handleFirestoreError(err, 'estimatorAddons')
      );

      const unsubMessages = onSnapshot(
        collection(db, 'messages'),
        (snapshot) => {
          const fbMsgs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setMessages(fbMsgs);
        },
        (err) => handleFirestoreError(err, 'messages')
      );

      const unsubProposals = onSnapshot(
        collection(db, 'proposals'),
        (snapshot) => {
          const fbProps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCustomRequests(fbProps);
        },
        (err) => handleFirestoreError(err, 'proposals')
      );

      return () => {
        if (typeof unsubProjects === 'function') unsubProjects();
        if (typeof unsubSettings === 'function') unsubSettings();
        if (typeof unsubServices === 'function') unsubServices();
        if (typeof unsubEstServices === 'function') unsubEstServices();
        if (typeof unsubEstScopes === 'function') unsubEstScopes();
        if (typeof unsubEstAddons === 'function') unsubEstAddons();
        if (typeof unsubMessages === 'function') unsubMessages();
        if (typeof unsubProposals === 'function') unsubProposals();
      };
    } catch (err) {
      handleFirestoreError(err, 'init');
    }
  }, []);

  const handleOpError = (e, opName) => {
    console.error(`Firebase [${opName}] failed:`, e);
    const msg = e?.message || String(e);
    if (e?.code === 'permission-denied') {
      setFirebaseStatus('PERMISSION_DENIED');
      setFirebaseError('Permission Denied: Your Firestore rules block writes.');
      alert(`Firebase Permission Denied!\n\nYour Firestore database rules block unauthenticated writes.\n\nPlease update Security Rules in Firebase Console to allow writes.`);
    } else {
      setFirebaseError(msg);
      alert(`Firebase Save Error (${opName}): ${msg}`);
    }
    return false;
  };

  const updateSiteSettings = async (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('undo_settings_inr_v6', JSON.stringify(newSettings));
    try {
      await setDoc(doc(db, 'settings', 'hero'), newSettings, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'updateSiteSettings');
    }
  };

  // Projects CRUD
  const saveProjectsOrderToFirestore = async (pList) => {
    try {
      for (let i = 0; i < pList.length; i++) {
        await setDoc(doc(db, 'projects', pList[i].id), { ...pList[i], orderIndex: i }, { merge: true });
      }
    } catch (e) {
      console.error("Firestore reorder save failed:", e);
    }
  };

  const addProject = async (project) => {
    const id = 'proj-' + Date.now();
    const newProj = { ...project, id, orderIndex: projects.length };
    const updated = [newProj, ...projects];
    setProjects(updated);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'projects', id), newProj, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'addProject');
    }
  };

  const updateProject = async (id, updatedFields) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjects(updated);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'projects', id), updatedFields, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'updateProject');
    }
  };

  const deleteProject = async (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'projects', id));
      return true;
    } catch (e) {
      return handleOpError(e, 'deleteProject');
    }
  };

  const moveProjectUp = (index) => {
    if (index <= 0) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;

    const reIndexed = updated.map((proj, idx) => ({ ...proj, orderIndex: idx }));
    setProjects(reIndexed);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(reIndexed));
    saveProjectsOrderToFirestore(reIndexed);
  };

  const moveProjectDown = (index) => {
    if (index >= projects.length - 1) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;

    const reIndexed = updated.map((proj, idx) => ({ ...proj, orderIndex: idx }));
    setProjects(reIndexed);
    localStorage.setItem('undo_projects_inr_v6', JSON.stringify(reIndexed));
    saveProjectsOrderToFirestore(reIndexed);
  };

  // ESTIMATOR SERVICES CRUD
  const addEstimatorService = async (item) => {
    const newItem = { ...item, id: 'est-svc-' + Date.now() };
    const updated = [...estimatorServices, newItem];
    setEstimatorServices(updated);
    localStorage.setItem('undo_est_svc_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorServices', newItem.id), newItem, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'addEstimatorService');
    }
  };

  const updateEstimatorService = async (id, fields) => {
    const updated = estimatorServices.map((s) => (s.id === id ? { ...s, ...fields } : s));
    setEstimatorServices(updated);
    localStorage.setItem('undo_est_svc_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorServices', id), fields, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'updateEstimatorService');
    }
  };

  const deleteEstimatorService = async (id) => {
    const updated = estimatorServices.filter((s) => s.id !== id);
    setEstimatorServices(updated);
    localStorage.setItem('undo_est_svc_inr_v6', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'estimatorServices', id));
      return true;
    } catch (e) {
      return handleOpError(e, 'deleteEstimatorService');
    }
  };

  // ESTIMATOR SCOPES CRUD
  const addEstimatorScope = async (item) => {
    const newItem = { ...item, id: 'est-scp-' + Date.now() };
    const updated = [...estimatorScopes, newItem];
    setEstimatorScopes(updated);
    localStorage.setItem('undo_est_scp_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorScopes', newItem.id), newItem, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'addEstimatorScope');
    }
  };

  const updateEstimatorScope = async (id, fields) => {
    const updated = estimatorScopes.map((s) => (s.id === id ? { ...s, ...fields } : s));
    setEstimatorScopes(updated);
    localStorage.setItem('undo_est_scp_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorScopes', id), fields, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'updateEstimatorScope');
    }
  };

  const deleteEstimatorScope = async (id) => {
    const updated = estimatorScopes.filter((s) => s.id !== id);
    setEstimatorScopes(updated);
    localStorage.setItem('undo_est_scp_inr_v6', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'estimatorScopes', id));
      return true;
    } catch (e) {
      return handleOpError(e, 'deleteEstimatorScope');
    }
  };

  // ESTIMATOR ADDONS CRUD
  const addEstimatorAddon = async (item) => {
    const newItem = { ...item, id: 'est-adn-' + Date.now() };
    const updated = [...estimatorAddons, newItem];
    setEstimatorAddons(updated);
    localStorage.setItem('undo_est_adn_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorAddons', newItem.id), newItem, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'addEstimatorAddon');
    }
  };

  const updateEstimatorAddon = async (id, fields) => {
    const updated = estimatorAddons.map((a) => (a.id === id ? { ...a, ...fields } : a));
    setEstimatorAddons(updated);
    localStorage.setItem('undo_est_adn_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'estimatorAddons', id), fields, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'updateEstimatorAddon');
    }
  };

  const deleteEstimatorAddon = async (id) => {
    const updated = estimatorAddons.filter((a) => a.id !== id);
    setEstimatorAddons(updated);
    localStorage.setItem('undo_est_adn_inr_v6', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'estimatorAddons', id));
      return true;
    } catch (e) {
      return handleOpError(e, 'deleteEstimatorAddon');
    }
  };

  // Services CRUD
  const addService = async (service) => {
    const newSvc = { ...service, id: 'svc-' + Date.now() };
    const updated = [...services, newSvc];
    setServices(updated);
    localStorage.setItem('undo_services_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'services', newSvc.id), newSvc, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'addService');
    }
  };

  const updateService = async (id, updatedFields) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
    setServices(updated);
    localStorage.setItem('undo_services_inr_v6', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'services', id), updatedFields, { merge: true });
      return true;
    } catch (e) {
      return handleOpError(e, 'updateService');
    }
  };

  const deleteService = async (id) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem('undo_services_inr_v6', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'services', id));
      return true;
    } catch (e) {
      return handleOpError(e, 'deleteService');
    }
  };

  // Messages & Proposals
  const addMessage = async (msg) => {
    const id = Date.now().toString();
    const newMsg = { ...msg, id, date: new Date().toISOString() };
    setMessages((prev) => [newMsg, ...prev]);

    try {
      await setDoc(doc(db, 'messages', id), newMsg);
      return true;
    } catch (e) {
      return handleOpError(e, 'addMessage');
    }
  };

  const deleteMessage = async (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, 'messages', id));
      return true;
    } catch (e) {
      return handleOpError(e, 'deleteMessage');
    }
  };

  const addCustomRequest = async (req) => {
    const id = Date.now().toString();
    const newReq = { ...req, id, date: new Date().toISOString() };
    setCustomRequests((prev) => [newReq, ...prev]);

    try {
      await setDoc(doc(db, 'proposals', id), newReq);
      return true;
    } catch (e) {
      return handleOpError(e, 'addCustomRequest');
    }
  };

  const deleteCustomRequest = async (id) => {
    setCustomRequests((prev) => prev.filter((r) => r.id !== id));
    try {
      await deleteDoc(doc(db, 'proposals', id));
      return true;
    } catch (e) {
      return handleOpError(e, 'deleteCustomRequest');
    }
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
        firebaseError,
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
