// roles.js - simple role-based UI visibility using data-role attributes
function applyRoleVisibility() {
  const session = getSession();
  const role = session ? session.role : null;
  document.querySelectorAll('[data-role]').forEach(el => {
    const roles = String(el.getAttribute('data-role')||'').split(',').map(r=>r.trim()).filter(Boolean);
    if (roles.length === 0) return;
    if (!role || !roles.includes(role)) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  applyRoleVisibility();
});

// Expose
window.applyRoleVisibility = applyRoleVisibility;
