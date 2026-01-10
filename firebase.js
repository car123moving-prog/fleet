// Firebase Modular SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updatePassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  onValue, 
  remove, 
  update 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkJ85bI9-6Q_N97dqhBhpWgytqKoM6VH0",
  authDomain: "fleet-123.firebaseapp.com",
  databaseURL: "https://fleet-123-default-rtdb.firebaseio.com",
  projectId: "fleet-123",
  storageBucket: "fleet-123.firebasestorage.app",
  messagingSenderId: "266130114678",
  appId: "1:266130114678:web:56e89b5922749a00c4f757"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// Export functions
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  ref,
  set,
  get,
  onValue,
  remove,
  update
};
