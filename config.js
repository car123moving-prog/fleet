/* ============================================================
   Firebase Initialization (Compat SDK)
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyDkJ85bI9-6Q_N97dqhBhpWgytqKoM6VH0",
  authDomain: "fleet-123.firebaseapp.com",
  databaseURL: "https://fleet-123-default-rtdb.firebaseio.com",
  projectId: "fleet-123",
  storageBucket: "fleet-123.firebasestorage.app",
  messagingSenderId: "266130114678",
  appId: "1:266130114678:web:56e89b5922749a00c4f757"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ============================================================
   Page Protection
   ============================================================ */

firebase.auth().onAuthStateChanged(user => {
  const page = window.location.pathname.split('/').pop();
  const content = document.getElementById("pageContent");

  if (!user && page !== "login.html") {
    window.location.href = "login.html";
    return;
  }

  if (user && page === "login.html") {
    window.location.href = "index.html";
    return;
  }

  if (content) content.style.display = "block";
});

/* ============================================================
   Smart Date Formatter
   ============================================================ */

function formatSmartDate(dateString) {
  if (!dateString) return "غير محدد";

  const today = new Date();
  const target = new Date(dateString);

  const formatted = target.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));

  if (diff === 0) return `${formatted} — اليوم`;
  if (diff === 1) return `${formatted} — غدًا`;
  if (diff > 1 && diff <= 7) return `${formatted} — بعد ${diff} أيام`;
  if (diff < 0 && diff >= -7) return `${formatted} — منتهي منذ ${Math.abs(diff)} أيام`;
  if (diff < -7) return `${formatted} — منتهي`;

  return formatted;
}

/* ============================================================
   Print Card
   ============================================================ */

function printCard(button) {
  const card = button.closest('.card') || button.closest('.archive-card') || button.closest('.profile-card');
  if (!card) return;

  const printWindow = window.open('', '_blank', 'width=900,height=700');

  const content = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>بطاقة السيارة</title>

      <style>
        body {
          font-family: 'Segoe UI', Tahoma, sans-serif;
          padding: 30px;
          background: #f8f9fa;
          direction: rtl;
        }
        .print-container {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
          max-width: 800px;
          margin: auto;
        }
        .header {
          text-align: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 3px solid #0d6efd;
        }
        .header img {
          max-height: 80px;
          margin-bottom: 10px;
        }
        .header h2 {
          margin: 0;
          font-size: 1.8rem;
          color: #0d6efd;
        }
      </style>
    </head>

    <body onload="window.print(); setTimeout(() => window.close(), 200);">
      <div class="print-container">
        <div class="header">
          <img src="logo.png" alt="Logo">
          <h2>بطاقة بيانات السيارة</h2>
        </div>

        ${card.innerHTML}
      </div>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(content);
  printWindow.document.close();
}

/* ============================================================
   Archive / Restore / Delete
   ============================================================ */

function archiveCar(id) {
  if (!confirm("هل تريد نقل السيارة إلى الأرشيف؟")) return;

  db.collection("cars").doc(id).update({
    archived: true,
    archivedAt: new Date().toISOString()
  });
}

function restoreCar(id) {
  if (!confirm("هل تريد استعادة السيارة للنشط؟")) return;

  db.collection("cars").doc(id).update({
    archived: false,
    archivedAt: null
  });
}

function deleteCar(id) {
  if (!confirm("هل تريد حذف السيارة نهائيًا؟")) return;

  db.collection("cars").doc(id).delete();
}
