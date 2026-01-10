// firebase.js - lightweight wrapper for Firebase Realtime Database + Auth
// Replace the config placeholders with your Firebase project config.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (assumes firebase SDK is loaded via CDN in hosting environment)
if (!window.firebase || !firebase.apps) {
  console.error('Firebase SDK not found. Please include Firebase scripts in hosting page.');
}

// Initialize app if not already
if (window.firebase && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const auth = firebase.auth();

// Basic helpers
async function readOnce(path) {
  const snap = await db.ref(path).once('value');
  return snap.exists() ? snap.val() : null;
}

function readData(path, callback) {
  const ref = db.ref(path);
  ref.on('value', snapshot => {
    callback(snapshot.exists() ? snapshot.val() : null);
  });
  return () => ref.off();
}

async function pushData(path, object) {
  const ref = db.ref(path).push();
  object.createdAt = Date.now();
  object.createdBy = (auth.currentUser && auth.currentUser.uid) || null;
  await ref.set(object);
  return ref.key;
}

async function updateData(path, object) {
  object.updatedAt = Date.now();
  return db.ref(path).update(object);
}

async function deleteData(path) {
  return db.ref(path).remove();
}

// Authentication helpers
async function login(email, password) {
  const res = await auth.signInWithEmailAndPassword(email, password);
  return res.user;
}

async function loginAsGuest() {
  const res = await auth.signInAnonymously();
  return res.user;
}

async function logout() {
  await auth.signOut();
  window.location.href = 'login.html';
}

function firebaseAuthOnChange(cb) {
  auth.onAuthStateChanged(user => cb(user));
}

// Expose for other scripts
window.readOnce = readOnce;
window.readData = readData;
window.pushData = pushData;
window.updateData = updateData;
window.deleteData = deleteData;
window.login = login;
window.loginAsGuest = loginAsGuest;
window.logout = logout;
window.firebaseAuthOnChange = firebaseAuthOnChange;
