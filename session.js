import { auth, db, ref, get } from "./firebase.js";

auth.onAuthStateChanged(async user => {
  const path = window.location.pathname;
  const page = path.split("/").pop().toLowerCase();

  const publicPages = ["login.html", "index.html", ""];

  // إذا غير مسجل دخول
  if (!user) {
    if (!publicPages.includes(page)) {
      window.location.href = "login.html";
    }
    return;
  }

  // إذا مسجل دخول
  if (page === "login.html" || page === "index.html" || page === "") {
    window.location.href = "dashboard.html";
  }

  // عرض اسم المستخدم في التوب بار
  const nameSpan = document.getElementById("username-display");
  if (nameSpan) {
    const snap = await get(ref(db, "users/" + user.uid));
    if (snap.exists()) {
      nameSpan.innerText = snap.val().name || user.email;
    } else {
      nameSpan.innerText = user.email;
    }
  }
});
