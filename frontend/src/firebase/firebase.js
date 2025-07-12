// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ you forgot this import
import { getFirestore } from "firebase/firestore";

// ✅ Replace these with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCgc-u7wSdLdLbt9nnN7CLyD6NvFi6BP7g",
  authDomain: "reware-70810.firebaseapp.com",
  projectId: "reware-70810",
  storageBucket: "reware-70810.firebasestorage.app",
  messagingSenderId: "437506915793",
  appId: "1:437506915793:web:e34a7e89cbb9ed9d91b4f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
