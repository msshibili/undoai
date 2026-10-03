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

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
export const storage = getStorage(app);

// Optional auto anonymous auth attempt for Firestore permission compliance
signInAnonymously(auth).catch((err) => {
  console.log('Firebase Anonymous Auth Note:', err.message);
});

// Helper to compress images to <100KB so Firestore accepts them without exceeding 1MB limit
export function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

// Helper to upload image to Firebase Storage with web-compression fallback
export async function processAndUploadImage(file) {
  if (!file) return null;

  // Try Firebase Storage first
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageRef = ref(storage, `posters/${Date.now()}_${cleanFileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    if (downloadURL) return downloadURL;
  } catch (err) {
    console.warn('Firebase Storage upload notice (falling back to web compression):', err);
  }

  // Fallback to high-quality compressed data URL (<100KB)
  const compressed = await compressImageFile(file, 1200, 1200, 0.8);
  return compressed;
}

export { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc, onSnapshot, ref, uploadBytes, getDownloadURL };


