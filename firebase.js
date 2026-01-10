// firebase.js — النسخة النهائية Firebase v8

// بيانات مشروعك
const firebaseConfig = {
  apiKey: "AIzaSyDkJ85bI9-6Q_N97dqhBhpWgytqKoM6VH0",
  authDomain: "fleet-123.firebaseapp.com",
  databaseURL: "https://fleet-123-default-rtdb.firebaseio.com",
  projectId: "fleet-123",
  storageBucket: "fleet-123.firebasestorage.app",
  messagingSenderId: "266130114678",
  appId: "1:266130114678:web:56e89b5922749a00c4f757"
};

// التهيئة
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

// تسجيل الدخول
async function login(email, password) {
  const res = await auth.signInWithEmailAndPassword(email, password);
  return res.user;
}

// تسجيل دخول ضيف
async function loginAsGuest() {
  const res = await auth.signInAnonymously();
  return res.user;
}

// خروج
async function logout() {
  await auth.signOut();
  window.location.href = "login.html";
}

// مراقبة المستخدم
function firebaseAuthOnChange(callback) {
  auth.onAuthStateChanged(user => callback(user));
}

// قراءة
async function readOnce(path) {
  const snap = await db.ref(path).once("value");
  return snap.exists() ? snap.val() : null;
}

// كتابة
async function pushData(path, object) {
  const ref = db.ref(path).push();
  object.createdAt = Date.now();
  object.createdBy = auth.currentUser ? auth.currentUser.uid : null;
  await ref.set(object);
  return ref.key;
}

// تحديث
async function updateData(path, object) {
  object.updatedAt = Date.now();
  return db.ref(path).update(object);
}

// حذف
async function deleteData(path) {
  return db.ref(path).remove();
}

// تصدير
window.login = login;
window.loginAsGuest = loginAsGuest;
window.logout = logout;
window.firebaseAuthOnChange = firebaseAuthOnChange;

window.readOnce = readOnce;
window.pushData = pushData;
window.updateData = updateData;
window.deleteData = deleteData;
