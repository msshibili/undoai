import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  onSnapshot 
} from 'firebase/firestore';

import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBhQXrjHktWKTQ9Oz3FT_kdSr7FS2JiZOw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "undo-ai-6fde6.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "undo-ai-6fde6",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "undo-ai-6fde6.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "346783510292",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:346783510292:web:d9586465a4f372084d1c01"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Optional auto anonymous auth attempt for Firestore permission compliance
signInAnonymously(auth).catch((err) => {
  console.log('Firebase Anonymous Auth Note:', err.message);
});

export { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc, onSnapshot };

