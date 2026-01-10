/* styles.css */

/* ROOT VARIABLES (LIGHT) */
:root {
  --bg: #f5f5f5;
  --card: #ffffff;
  --text: #1a1a1a;
  --primary: #1a237e;
  --secondary: #3949ab;
  --border: #e0e0e0;
  --danger: #c62828;
  --warning: #fb8c00;
  --success: #2e7d32;
}

/* DARK MODE */
body.dark {
  --bg: #121212;
  --card: #1e1e1e;
  --text: #ffffff;
  --primary: #7986cb;
  --secondary: #5c6bc0;
  --border: #333333;
}

/* GLOBAL */
body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}

/* LAYOUT */
.layout {
  display: flex;
}

.content-area {
  flex: 1;
  padding: 25px;
}

/* SIDEBAR */
.sidebar {
  width: 220px;
  background: var(--card);
  border-right: 1px solid var(--border);
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.sidebar .logo {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 25px;
  color: var(--primary);
}

.sidebar nav a {
  display: block;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: 0.2s;
}

.sidebar nav a:hover,
.sidebar nav a.active {
  background: var(--secondary);
  color: white;
}

.badge {
  background: var(--danger);
  color: white;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-left: 8px;
}

/* TOPBAR */
.topbar {
  background: var(--card);
  padding: 15px 20px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}

/* CARDS */
.card,
.vehicle-card,
.driver-card,
.document-card,
.maintenance-card,
.user-card,
.notification-card {
  background: var(--card);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* TABLES */
.styled-table {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: var(--card);
  border: 1px solid var(--border);
  border-collapse: collapse;
}

.styled-table th {
  background: var(--primary);
  color: white;
  padding: 12px;
}

.styled-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.styled-table tr:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* BUTTONS */
button,
.add-btn,
.edit,
.delete {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.add-btn,
.edit {
  background: var(--primary);
  color: white;
}

.add-btn:hover,
.edit:hover {
  background: var(--secondary);
}

.delete {
  background: var(--danger);
  color: white;
}

.delete:hover {
  opacity: 0.8;
}

/* STATUS / ROLE */
.status,
.role,
.maintenance-type {
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: white;
}

.status.نشطة {
  background: var(--success);
}
.status.معطلة {
  background: var(--danger);
}
.status.منتهية {
  background: var(--danger);
}

.role.Admin {
  background: var(--success);
}
.role.User {
  background: var(--secondary);
}

/* GRID */
.cards-grid {
  display: grid;
  gap: 20px;
  margin-bottom: 30px;
}

@media (min-width: 900px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ANIMATIONS */
.fade-in {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-hover {
  transition: 0.25s ease;
}

.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* SEARCH BAR */
.search-bar {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  margin-bottom: 20px;
  background: var(--card);
  color: var(--text);
}

/* LOGIN PAGE */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: var(--bg);
}

.login-box {
  background: var(--card);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 320px;
}

.login-box h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.login-box input {
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  box-sizing: border-box;
}

.login-box .error {
  color: var(--danger);
  margin-bottom: 10px;
}
