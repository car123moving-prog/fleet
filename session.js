// session.js - session management using Firebase Auth
// Ensures pages require authentication and exposes helpers.

function ensureAuthRedirect() {
  firebaseAuthOnChange(user => {
    if (!user) {
      // Not authenticated -> redirect to login
      if (!location.pathname.endsWith('login.html')) {
        location.href = 'login.html';
      }
    } else {
      // Authenticated -> load user info into UI
      loadUserInfo(user);
    }
  });
}

function loadUserInfo(user) {
  // Try to load user profile from /users by matching email or uid
  readOnce('users').then(users => {
    let profile = null;
    if (users) {
      for (const [id, u] of Object.entries(users)) {
        if ((u.email && u.email === user.email) || id === user.uid) {
          profile = { id, ...u };
          break;
        }
      }
    }
    // If not found, create a minimal profile for anonymous or new users
    if (!profile) {
      profile = { id: user.uid, name: user.displayName || user.email || 'User', role: 'user' };
      // Do not overwrite existing users; create if missing
      pushData(`users/${user.uid}`, profile).catch(()=>{});
    }
    // Update UI
    const nameEl = document.getElementById('userName');
    const roleEl = document.getElementById('userRole');
    if (nameEl) nameEl.textContent = profile.name || '';
    if (roleEl) roleEl.textContent = profile.role || '';
    // store in sessionStorage signed object (simple signature)
    const session = { uid: user.uid, name: profile.name, role: profile.role, ts: Date.now() };
    sessionStorage.setItem('fms_session', btoa(JSON.stringify(session)));
  });
}

function getSession() {
  try {
    const raw = sessionStorage.getItem('fms_session');
    if (!raw) return null;
    return JSON.parse(atob(raw));
  } catch (e) { return null; }
}

function ensureRole(requiredRoles = []) {
  const s = getSession();
  if (!s) return false;
  return requiredRoles.includes(s.role);
}

// Redirect helper for pages that require auth
if (location.pathname.endsWith('login.html')) {
  // If already logged in, redirect to dashboard
  firebaseAuthOnChange(user => {
    if (user) location.href = 'dashboard.html';
  });
}

// Expose
window.ensureAuthRedirect = ensureAuthRedirect;
window.getSession = getSession;
window.ensureRole = ensureRole;
window.firebaseAuthOnChange = firebaseAuthOnChange;
