// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_6VG9bSO8NnvLEa6Afvwpin3u-NesMzg",
  authDomain: "lunar-performance.firebaseapp.com",
  projectId: "lunar-performance",
  storageBucket: "lunar-performance.appspot.com", // ⚠️ Fix typo: "firebasestorage.app" → "appspot.com"
  messagingSenderId: "383057465152",
  appId: "1:383057465152:web:22c68b7865f2daadb2b4a5",
  measurementId: "G-QWM6VXBZEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Analytics
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);         // for Authentication
export const db = getFirestore(app);      // for Firestore database
export const storage = getStorage(app);   // for uploading images
