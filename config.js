// ⚠️ ⚠️ ⚠️ 
// 1. استبدل هذه البيانات ببيانات مشروعك الفعلية من Firebase Console
// 2. لا تشارك هذا الملف مع أحد
// ⚠️ ⚠️ ⚠️

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
try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  if (!firebase.apps.length) {
    console.error("Firebase initialization error:", error);
    alert("خطأ في تهيئة Firebase: " + error.message);
  }
}

// Initialize Firestore
const db = firebase.firestore();

// Authentication check
firebase.auth().onAuthStateChanged(user => {
  console.log("Auth state changed:", user ? user.email : "no user");
  
  const currentPage = window.location.pathname.split('/').pop();
  
  // Allow access to login page without authentication
  if (currentPage === 'login.html') {
    if (user) {
      // Redirect to main page if already logged in
      window.location.href = 'index.html';
    }
    return;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    console.log("No user authenticated, redirecting to login");
    window.location.href = 'login.html';
  }
});

// Utility functions
function printCard(button) {
  const card = button.closest('.card');
  if (!card) {
    console.error("Card element not found for printing");
    return;
  }
  
  // Create print window
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  // Prepare content for printing
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>طباعة بطاقة السيارة</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          padding: 20px;
          direction: rtl;
        }
        .print-container {
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid #ddd;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #0d6efd;
          padding-bottom: 15px;
        }
        .header img {
          max-height: 60px;
          margin-bottom: 10px;
        }
        .card-content {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 15px 0;
        }
        .status-badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-weight: bold;
          margin: 5px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #6c757d;
          font-size: 0.9em;
        }
        @media print {
          .no-print { display: none; }
        }
      </style>
    </head>
    <body onload="window.print(); setTimeout(() => window.close(), 100);">
      <div class="print-container">
        <div class="header">
          <img src="${window.location.origin}/logo.png" alt="شعار النظام">
          <h2>نظام إدارة السيارة</h2>
          <p>بطاقة معلومات السيارة - ${new Date().toLocaleDateString('ar-EG')}</p>
        </div>
        
        <div class="card-content">
          ${card.innerHTML}
        </div>
        
        <div class="footer">
          <p>Developed by MOHAMED SAAD - نظام إدارة السيارة © ${new Date().getFullYear()}</p>
          <p class="no-print">ستتم طباعة هذه الصفحة وإغلاق النافذة تلقائيًا</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(content);
  printWindow.document.close();
}

async function archiveCar(carId) {
  if (!confirm('هل أنت متأكد من نقل هذه السيارة للأرشيف؟\nيمكنك استرجاعها لاحقًا من صفحة الأرشيف')) {
    return;
  }
  
  try {
    await db.collection('cars').doc(carId).update({
      archived: true,
      archivedAt: new Date()
    });
    
    // Show success message
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-warning alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
    successAlert.style.zIndex = '1050';
    successAlert.innerHTML = `
      <i class="bi bi-archive-fill me-2"></i>
      <strong>أرشفة!</strong> تم نقل السيارة للأرشيف بنجاح
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(successAlert);
    
    setTimeout(() => {
      successAlert.remove();
    }, 3000);
    
  } catch (error) {
    console.error('Archive error:', error);
    alert('خطأ في الأرشفة: ' + (error.message || 'يرجى المحاولة لاحقًا'));
  }
}

async function restoreCar(carId) {
  if (!confirm('هل أنت متأكد من استرجاع هذه السيارة إلى القائمة النشطة؟')) {
    return;
  }
  
  try {
    await db.collection('cars').doc(carId).update({
      archived: false,
      archivedAt: firebase.firestore.FieldValue.delete()
    });
    
    // Show success message
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
    successAlert.style.zIndex = '1050';
    successAlert.innerHTML = `
      <i class="bi bi-arrow-counterclockwise me-2"></i>
      <strong>استرجاع!</strong> تم استرجاع السيارة بنجاح
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(successAlert);
    
    setTimeout(() => {
      successAlert.remove();
    }, 3000);
    
  } catch (error) {
    console.error('Restore error:', error);
    alert('خطأ في الاسترجاع: ' + (error.message || 'يرجى المحاولة لاحقًا'));
  }
}

async function deleteCar(carId, isArchived = false) {
  const message = isArchived ? 
    'هل أنت متأكد من حذف هذه السيارة نهائيًا من الأرشيف؟\nهذا الإجراء لا يمكن التراجع عنه!' :
    'هل أنت متأكد من حذف هذه السيارة؟\nسيتم حذف جميع بياناتها نهائيًا!';
  
  if (!confirm(message)) {
    return;
  }
  
  try {
    await db.collection('cars').doc(carId).delete();
    
    // Show success message
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-danger alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
    successAlert.style.zIndex = '1050';
    successAlert.innerHTML = `
      <i class="bi bi-trash-fill me-2"></i>
      <strong>حذف!</strong> تم حذف السيارة بنجاح
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(successAlert);
    
    setTimeout(() => {
      successAlert.remove();
    }, 3000);
    
  } catch (error) {
    console.error('Delete error:', error);
    alert('خطأ في الحذف: ' + (error.message || 'يرجى المحاولة لاحقًا'));
  }
}

// Global error handling
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', { message, source, lineno, colno, error });
  return false;
};

window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});
