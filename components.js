// components.js

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { listenNotifications } from "./services";
import "./styles.css";

// ============ SIDEBAR ============
export function Sidebar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsub = listenNotifications((list) => {
      setCount(list.length);
    });
    return unsub;
  }, []);

  return (
    <div className="sidebar">
      <div className="logo">FLEET</div>

      <nav>
        <NavLink to="/dashboard">لوحة التحكم</NavLink>
        <NavLink to="/vehicles">المركبات</NavLink>
        <NavLink to="/drivers">السائقين</NavLink>
        <NavLink to="/maintenance">الصيانة</NavLink>
        <NavLink to="/documents">الوثائق</NavLink>

        <NavLink to="/notifications" className="notif-link">
          الإشعارات
          {count > 0 && <span className="badge">{count}</span>}
        </NavLink>

        <NavLink to="/users">المستخدمين</NavLink>
        <NavLink to="/settings">الإعدادات</NavLink>
      </nav>
    </div>
  );
}

// ============ TOPBAR ============
export function Topbar({ title }) {
  return (
    <div className="topbar">
      <h2>{title}</h2>
    </div>
  );
}

// ============ LAYOUT ============
export function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content-area">{children}</div>
    </div>
  );
}
