// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkJ85bI9-6Q_N97dqhBhpWgytqKoM6VH0",
  authDomain: "fleet-123.firebaseapp.com",
  databaseURL: "https://fleet-123-default-rtdb.firebaseio.com",
  projectId: "fleet-123",
  storageBucket: "fleet-123.firebasestorage.app",
  messagingSenderId: "266130114678",
  appId: "1:266130114678:web:56e89b5922749a00c4f757"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
