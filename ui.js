// ui.js - loads sidebar and topbar into pages and handles small UI helpers
async function loadFragment(containerId, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const html = await res.text();
    document.getElementById(containerId).innerHTML = html;
    // After injecting, run translations and attach topbar handlers
    applyTranslations();
  } catch (e) {
    console.error('Failed to load fragment', url, e);
  }
}

// Load sidebar and topbar if placeholders exist
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('sidebar')) loadFragment('sidebar', 'sidebar.html');
  if (document.getElementById('topbar')) loadFragment('topbar', 'topbar.html');
  // small helper: highlight active link
  setTimeout(()=> {
    const links = document.querySelectorAll('.sidebar nav a');
    links.forEach(a=>{
      if (a.href && a.href.includes(location.pathname.split('/').pop())) {
        a.classList.add('active');
      }
    });
  }, 300);
});

// Simple helper to show toast (minimal)
function toast(msg, type='info') {
  console.log('[toast]', type, msg);
}

// Expose
window.loadFragment = loadFragment;
window.toast = toast;
