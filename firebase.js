// firebase.js — النسخة المصحّحة بالكامل والمتوافقة مع Firebase v9 (compat)

// 🔥 يجب أن تكون مكتبات Firebase مضافة قبل هذا الملف في كل صفحة HTML:
// <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js"></script>

// ------------------------------------------------------
// 1) تهيئة Firebase باستخدام بيانات مشروعك الحقيقية
// ------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyDkJ85bI9-6Q_N97dqhBhpWgytqKoM6VH0",
  authDomain: "fleet-123.firebaseapp.com",
  databaseURL: "https://fleet-123-default-rtdb.firebaseio.com",
  projectId: "fleet-123",
  storageBucket: "fleet-123.firebasestorage.app",
  messagingSenderId: "266130114678",
  appId: "1:266130114678:web:56e89b5922749a00c4f757"
};

// 🔥 التهيئة الأساسية
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

// ------------------------------------------------------
// 2) عمليات CRUD
// ------------------------------------------------------

async function readOnce(path) {
  const snap = await db.ref(path).once("value");
  return snap.exists() ? snap.val() : null;
}

function readData(path, callback) {
  const ref = db.ref(path);
  ref.on("value", snap => {
    callback(snap.exists() ? snap.val() : null);
  });
  return () => ref.off();
}

async function pushData(path, object) {
  const ref = db.ref(path).push();
  object.createdAt = Date.now();
  object.createdBy = auth.currentUser ? auth.currentUser.uid : null;
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

// ------------------------------------------------------
// 3) تسجيل الدخول والخروج
// ------------------------------------------------------

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
  window.location.href = "login.html";
}

// ------------------------------------------------------
// 4) مراقبة حالة المستخدم
// ------------------------------------------------------

function firebaseAuthOnChange(callback) {
  auth.onAuthStateChanged(user => callback(user));
}

// ------------------------------------------------------
// 5) التصدير للاستخدام في باقي الملفات
// ------------------------------------------------------

window.readOnce = readOnce;
window.readData = readData;
window.pushData = pushData;
window.updateData = updateData;
window.deleteData = deleteData;

window.login = login;
window.loginAsGuest = loginAsGuest;
window.logout = logout;

window.firebaseAuthOnChange = firebaseAuthOnChange;
