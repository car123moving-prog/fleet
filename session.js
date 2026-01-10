// session.js — النسخة النهائية

firebaseAuthOnChange(user => {
  if (!user) {
    if (!location.pathname.endsWith("login.html")) {
      location.href = "login.html";
    }
    return;
  }

  // إذا المستخدم موجود → ادخله للداشبورد
  if (location.pathname.endsWith("login.html")) {
    location.href = "dashboard.html";
  }
});
