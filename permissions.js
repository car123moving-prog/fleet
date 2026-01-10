import { auth, db, ref, get } from "./firebase.js";

auth.onAuthStateChanged(async user => {
  if (!user) return;

  const snap = await get(ref(db, "users/" + user.uid));
  if (!snap.exists()) return;

  const role = snap.val().role || "user";

  if (role !== "admin") {
    const links = document.querySelectorAll(".sidebar-menu a");
    links.forEach(link => {
      if (link.getAttribute("href") === "users.html") {
        link.style.display = "none";
      }
    });
  }
});
