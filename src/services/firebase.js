import { initializeApp, getApps } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc,
  serverTimestamp 
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Default seed data for undo.ai portfolio
export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Cyberpunk Neon Nights Social Campaign',
    category: 'Social Media',
    description: 'A futuristic 10-part social media poster suite designed for a premiere electronic music festival. Features holographic typography, high-contrast neon glows, and custom 3D asset compositions.',
    thumbnail: '/images/poster.png',
    mainImage: '/images/poster.png',
    additionalImages: [
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: '',
    date: '2026-02-15',
    client: 'NeonPulse Fest',
    featured: true,
    published: true,
  },
  {
    id: 'proj-2',
    title: 'Aura Luxury Editorial & Magazine Layout',
    category: 'Magazine Layout',
    description: 'Comprehensive editorial redesign for Aura Magazine Issue #42. Custom grid typography, high-fashion layout composition, and minimalist photo spreads.',
    thumbnail: '/images/featured.png',
    mainImage: '/images/featured.png',
    additionalImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: '',
    date: '2026-01-20',
    client: 'Aura Publishing House',
    featured: true,
    published: true,
  },
  {
    id: 'proj-3',
    title: 'Neural Matrix Cinematic AI Teaser',
    category: 'AI Video Creation',
    description: 'An AI-powered motion concept trailer blending hyper-realistic synthetic human generation, fluid physics animations, and dark cyberpunk audio-reactive visuals.',
    thumbnail: '/images/ai-video.png',
    mainImage: '/images/ai-video.png',
    additionalImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    date: '2026-03-01',
    client: 'SynthAI Labs',
    featured: true,
    published: true,
  },
  {
    id: 'proj-4',
    title: 'Vanguard Tech Summit Event Flyer',
    category: 'Flyers',
    description: 'High-impact print & digital promotional flyer created for Vanguard Global AI Conference. Geometric typography layout and metallic chrome accents.',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80',
    mainImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    videoUrl: '',
    date: '2025-11-10',
    client: 'Vanguard Global',
    featured: false,
    published: true,
  },
  {
    id: 'proj-5',
    title: 'Kinetix Brand Corporate Brochure',
    category: 'Brochures',
    description: 'A 16-page tri-fold and booklet brochure for Kinetix Robotics. Clean minimal grid, custom icon set, and spot-UV embossed print ready vector layouts.',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&q=80',
    mainImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    videoUrl: '',
    date: '2025-12-05',
    client: 'Kinetix Robotics',
    featured: false,
    published: true,
  },
  {
    id: 'proj-6',
    title: 'Hyperion Billboard & Web Banners',
    category: 'Banners',
    description: 'Large-format outdoor display banner and responsive web display ad campaign for Hyperion Electric Supercar release.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
    mainImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    videoUrl: '',
    date: '2026-02-02',
    client: 'Hyperion Motors',
    featured: false,
    published: true,
  },
  {
    id: 'proj-7',
    title: 'Apex Global Executive ID Cards',
    category: 'ID Cards',
    description: 'Secure, modern corporate identity card collection featuring matte black finish, NFC chip alignment guides, holographic foil stamps, and clean badge typography.',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    mainImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    videoUrl: '',
    date: '2026-01-14',
    client: 'Apex Capital',
    featured: false,
    published: true,
  },
  {
    id: 'proj-8',
    title: 'Velocity Brand Motion Showreel',
    category: 'Video Editing',
    description: 'Dynamic commercial video edit with custom sound design, 3D kinetic text motion tracking, and color grading for Velocity Apparel.',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
    mainImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    date: '2026-02-28',
    client: 'Velocity Wear',
    featured: true,
    published: true,
  },
  {
    id: 'proj-9',
    title: 'Quantum AI Generative Short Film',
    category: 'AI Video Creation',
    description: 'Experimental AI video piece exploring surreal geometry, morphing environments, and synthesized voiceovers.',
    thumbnail: '/images/hero-bg.png',
    mainImage: '/images/hero-bg.png',
    additionalImages: [],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    date: '2026-03-10',
    client: 'Quantum Studio',
    featured: false,
    published: true,
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    title: 'Social Media Poster Design',
    category: 'Social Media',
    description: 'Creative and engaging social media visuals designed for strong digital presence.',
    iconName: 'Image',
    enabled: true,
  },
  {
    id: 'srv-2',
    title: 'Flyer Design',
    category: 'Flyer',
    description: 'Eye-catching promotional flyers for events, campaigns, products, and businesses.',
    iconName: 'FileText',
    enabled: true,
  },
  {
    id: 'srv-3',
    title: 'Brochure Design',
    category: 'Brochure',
    description: 'Professional brochure designs that communicate information clearly and creatively.',
    iconName: 'BookOpen',
    enabled: true,
  },
  {
    id: 'srv-4',
    title: 'Magazine Layout',
    category: 'Magazine Layout',
    description: 'Editorial layouts with strong typography, visual hierarchy, and professional composition.',
    iconName: 'Layout',
    enabled: true,
  },
  {
    id: 'srv-5',
    title: 'Banner Design',
    category: 'Banner',
    description: 'High-impact digital and promotional banner designs.',
    iconName: 'Maximize2',
    enabled: true,
  },
  {
    id: 'srv-6',
    title: 'ID Card Design',
    category: 'ID Card Designs',
    description: 'Clean, professional, customized identification card designs.',
    iconName: 'CreditCard',
    enabled: true,
  },
  {
    id: 'srv-7',
    title: 'Video Editing',
    category: 'Video Editing',
    description: 'Professional video editing for social media, promotions, events, and brands.',
    iconName: 'Film',
    enabled: true,
  },
  {
    id: 'srv-8',
    title: 'AI Video Creation',
    category: 'AI Video Creation',
    description: 'Creative AI-powered video concepts, visuals, animations, and promotional content.',
    iconName: 'Sparkles',
    enabled: true,
  },
];

export const INITIAL_STATS = [
  { label: 'Projects Created', value: '450+' },
  { label: 'Creative Services', value: '8' },
  { label: 'Design Categories', value: '12' },
  { label: 'Digital Experiences', value: '99.8%' },
];

export const INITIAL_SETTINGS = {
  heroTitle: 'undo.ai',
  heroSubtitle: 'Creative Design. Digital Experiences. AI-Powered Visuals.',
  heroDescription: 'Designing visuals, stories, and digital experiences that make brands impossible to ignore.',
  aboutHeading: 'We Turn Ideas Into Visual Experiences.',
  aboutDescription: 'undo.ai is a creative design and digital media studio focused on transforming ideas into visually engaging experiences. From static designs to video and AI-powered content, we create visuals that communicate, connect, and stand out.',
  ctaHeading: "Have an idea? Let's create it.",
  ctaDescription: "Tell us what you're imagining. We'll turn it into something visual.",
  stats: INITIAL_STATS,
  socials: {
    instagram: 'https://instagram.com/undo.ai',
    facebook: 'https://facebook.com/undo.ai',
    linkedin: 'https://linkedin.com/company/undo-ai',
    youtube: 'https://youtube.com/@undo-ai',
    whatsapp: 'https://wa.me/15550192834',
  },
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  }
};

// Local storage keys for smooth fallback persistence
const STORAGE_KEYS = {
  PROJECTS: 'undo_ai_projects',
  SERVICES: 'undo_ai_services',
  MESSAGES: 'undo_ai_messages',
  SETTINGS: 'undo_ai_settings',
  AUTH: 'undo_ai_admin_session',
};

// Utility to read from Local Storage with default seeding
export function getLocalData(key, defaultVal) {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading localStorage key', key, err);
    return defaultVal;
  }
}

export function setLocalData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error setting localStorage key', key, err);
  }
}

// Check if custom Firebase is initialized
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseStorage = null;

export function initFirebaseConfig(config) {
  if (config && config.apiKey && config.projectId) {
    try {
      if (!getApps().length) {
        firebaseApp = initializeApp(config);
        firebaseAuth = getAuth(firebaseApp);
        firebaseDb = getFirestore(firebaseApp);
        firebaseStorage = getStorage(firebaseApp);
        console.log('Firebase initialized successfully!');
        return true;
      }
    } catch (err) {
      console.warn('Firebase init warning:', err);
    }
  }
  return false;
}
