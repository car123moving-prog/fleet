// App.js

// ====== الجزء 1: imports + AuthGuard + App ======
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { auth } from "./firebase";
import {
  getVehicles,
  getDrivers,
  getDocuments,
  getMaintenance,
  getUsers,
  listenNotifications,
  isLoggedIn
} from "./services";
import { Layout, Topbar } from "./components";
import { applyTheme } from "./theme";
import "./styles.css";

import {
  signInWithEmailAndPassword,
  updatePassword
} from "firebase/auth";

// ============ AUTH GUARD ============
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

// ============ MAIN APP ============
export default function App() {
  const [theme, setTheme] = useState("light");
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(() => {
      setAuthReady(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  if (!authReady) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setTheme={setTheme} />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <AppPages setTheme={setTheme} />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// ====== الجزء 2: الصفحات الداخلية (Dashboard - Vehicles - Drivers - Maintenance - Documents - Users - Notifications - Settings) ======

// DASHBOARD
function DashboardPage() {
  const [stats, setStats] = useState({
    vehicles: 0,
    drivers: 0,
    documents: 0,
    maintenance: 0,
    users: 0
  });

  useEffect(() => {
    async function load() {
      const v = await getVehicles();
      const d = await getDrivers();
      const docs = await getDocuments();
      const m = await getMaintenance();
      const u = await getUsers();

      setStats({
        vehicles: v.length,
        drivers: d.length,
        documents: docs.length,
        maintenance: m.length,
        users: u.length
      });
    }
    load();
  }, []);

  return (
    <div>
      <Topbar title="لوحة التحكم" />
      <div className="cards-grid fade-in">
        <div className="card card-hover">المركبات: {stats.vehicles}</div>
        <div className="card card-hover">السائقين: {stats.drivers}</div>
        <div className="card card-hover">الوثائق: {stats.documents}</div>
        <div className="card card-hover">الصيانة: {stats.maintenance}</div>
        <div className="card card-hover">المستخدمين: {stats.users}</div>
      </div>
    </div>
  );
}

// VEHICLES
function VehiclesPage() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getVehicles().then(setList);
  }, []);

  const filtered = list.filter(
    (v) =>
      v.model?.toLowerCase().includes(search.toLowerCase()) ||
      v.plate?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Topbar title="المركبات" />
      <input
        className="search-bar"
        placeholder="بحث..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="styled-table fade-in">
        <thead>
          <tr>
            <th>الموديل</th>
            <th>اللوحة</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((v) => (
            <tr key={v.id}>
              <td>{v.model}</td>
              <td>{v.plate}</td>
              <td>
                <span className={`status ${v.status}`}>{v.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// DRIVERS
function DriversPage() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getDrivers().then(setList);
  }, []);

  const filtered = list.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Topbar title="السائقين" />
      <input
        className="search-bar"
        placeholder="بحث..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="styled-table fade-in">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الهاتف</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// MAINTENANCE
function MaintenancePage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getMaintenance().then(setList);
  }, []);

  return (
    <div>
      <Topbar title="الصيانة" />

      <table className="styled-table fade-in">
        <thead>
          <tr>
            <th>المركبة</th>
            <th>النوع</th>
            <th>التكلفة</th>
          </tr>
        </thead>
        <tbody>
          {list.map((m) => (
            <tr key={m.id}>
              <td>{m.vehicle}</td>
              <td>{m.type}</td>
              <td>{m.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// DOCUMENTS
function DocumentsPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getDocuments().then(setList);
  }, []);

  return (
    <div>
      <Topbar title="الوثائق" />

      <table className="styled-table fade-in">
        <thead>
          <tr>
            <th>الوثيقة</th>
            <th>المركبة</th>
            <th>الانتهاء</th>
          </tr>
        </thead>
        <tbody>
          {list.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.vehicle}</td>
              <td>{d.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// USERS
function UsersPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getUsers().then(setList);
  }, []);

  return (
    <div>
      <Topbar title="المستخدمين" />

      <table className="styled-table fade-in">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الدور</th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className={`role ${u.role}`}>{u.role}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// NOTIFICATIONS
function NotificationsPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsub = listenNotifications(setList);
    return unsub;
  }, []);

  return (
    <div>
      <Topbar title="الإشعارات" />

      <div className="cards-grid fade-in">
        {list.map((n, i) => (
          <div
            key={i}
            className={`notification-card card-hover ${n.type}`}
          >
            <h3>{n.title}</h3>
            <p>{n.message}</p>
            <span className="date">{n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// SETTINGS
function SettingsPage({ setTheme }) {
  const [newPass, setNewPass] = useState("");

  const changePass = async () => {
    if (!newPass) return;
    if (!auth.currentUser) return;
    await updatePassword(auth.currentUser, newPass);
    alert("تم تغيير كلمة المرور");
    setNewPass("");
  };

  return (
    <div>
      <Topbar title="الإعدادات" />

      <div className="card fade-in" style={{ marginBottom: 20 }}>
        <h3>الثيم</h3>
        <select onChange={(e) => setTheme(e.target.value)}>
          <option value="light">فاتح</option>
          <option value="dark">داكن</option>
        </select>
      </div>

      <div className="card fade-in">
        <h3>تغيير كلمة المرور</h3>
        <input
          type="password"
          placeholder="كلمة مرور جديدة"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <button onClick={changePass}>تغيير</button>
      </div>
    </div>
  );
}

// ====== الجزء 3: LoginPage + AppPages (Routes) ======

// LOGIN PAGE
function LoginPage({ setTheme }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch {
      setError("بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div className="login-page fade-in">
      <div className="login-box">
        <h2>تسجيل الدخول</h2>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={login}>دخول</button>

        <div style={{ marginTop: 20 }}>
          <select onChange={(e) => setTheme(e.target.value)}>
            <option value="light">فاتح</option>
            <option value="dark">داكن</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// APP PAGES ROUTER
function AppPages({ setTheme }) {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<SettingsPage setTheme={setTheme} />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
