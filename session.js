// session.js — النسخة النهائية Firebase v8

firebaseAuthOnChange(user => {
  // إذا لم يكن هناك مستخدم → ارجع لصفحة الدخول
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
