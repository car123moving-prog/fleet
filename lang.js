// lang.js - simple translation engine using data-lang and data-lang-placeholder
const LANG = {
  ar: {
    app_name: "نظام إدارة المركبات",
    login_title: "تسجيل الدخول",
    email_label: "البريد الإلكتروني",
    email_placeholder: "example@domain.com",
    password_label: "كلمة المرور",
    password_placeholder: "أدخل كلمة المرور",
    login_btn: "دخول",
    guest_btn: "تجربة",
    dashboard_title: "لوحة التحكم",
    vehicles_count: "المركبات",
    drivers_count: "السائقون",
    movements_count: "الحركات",
    recent_movements: "أحدث الحركات",
    col_vehicle: "المركبة",
    col_driver: "السائق",
    col_from: "من",
    col_to: "إلى",
    col_time: "الوقت",
    vehicles_page: "المركبات",
    add_vehicle: "إضافة مركبة",
    col_id: "ID",
    col_name: "الاسم",
    col_plate: "اللوحة",
    col_status: "الحالة",
    col_actions: "إجراءات",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    drivers_page: "السائقون",
    add_driver: "إضافة سائق",
    col_phone: "الهاتف",
    movements_page: "الحركات",
    add_movement: "إضافة حركة",
    select_vehicle: "اختر المركبة",
    select_driver: "اختر السائق",
    from_label: "من",
    to_label: "إلى",
    maintenance_page: "الصيانة",
    add_maintenance: "إضافة سجل صيانة",
    col_desc: "الوصف",
    col_cost: "التكلفة",
    documents_page: "الوثائق",
    add_document: "إضافة وثيقة",
    col_title: "العنوان",
    col_type: "النوع",
    col_related: "متعلق بـ",
    users_page: "المستخدمون",
    add_user: "إضافة مستخدم",
    col_email: "البريد",
    col_role: "الدور",
    messaging_page: "الرسائل",
    contacts: "المستخدمون",
    message_placeholder: "اكتب رسالة...",
    send: "إرسال",
    notifications_page: "الإشعارات",
    reports_page: "التقارير",
    report_movements: "حركات اليوم",
    report_maintenance: "تكاليف الصيانة",
    settings_page: "الإعدادات",
    language_label: "اللغة",
    theme_label: "الوضع",
    light_mode: "فاتح",
    dark_mode: "داكن",
    system_page: "النظام",
    system_overview: "نظرة عامة",
    menu_dashboard: "لوحة التحكم",
    menu_vehicles: "المركبات",
    menu_drivers: "السائقون",
    menu_movements: "الحركات",
    menu_maintenance: "الصيانة",
    menu_documents: "الوثائق",
    menu_users: "المستخدمون",
    menu_messages: "الرسائل",
    menu_notifications: "الإشعارات",
    menu_reports: "التقارير",
    menu_settings: "الإعدادات",
    menu_system: "النظام",
    logout: "خروج",
    app_name_short: "FMS"
  },
  en: {
    app_name: "Fleet Management",
    login_title: "Sign In",
    email_label: "Email",
    email_placeholder: "example@domain.com",
    password_label: "Password",
    password_placeholder: "Enter password",
    login_btn: "Login",
    guest_btn: "Guest",
    dashboard_title: "Dashboard",
    vehicles_count: "Vehicles",
    drivers_count: "Drivers",
    movements_count: "Movements",
    recent_movements: "Recent Movements",
    col_vehicle: "Vehicle",
    col_driver: "Driver",
    col_from: "From",
    col_to: "To",
    col_time: "Time",
    vehicles_page: "Vehicles",
    add_vehicle: "Add Vehicle",
    col_id: "ID",
    col_name: "Name",
    col_plate: "Plate",
    col_status: "Status",
    col_actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    drivers_page: "Drivers",
    add_driver: "Add Driver",
    col_phone: "Phone",
    movements_page: "Movements",
    add_movement: "Add Movement",
    select_vehicle: "Select Vehicle",
    select_driver: "Select Driver",
    from_label: "From",
    to_label: "To",
    maintenance_page: "Maintenance",
    add_maintenance: "Add Maintenance",
    col_desc: "Description",
    col_cost: "Cost",
    documents_page: "Documents",
    add_document: "Add Document",
    col_title: "Title",
    col_type: "Type",
    col_related: "Related To",
    users_page: "Users",
    add_user: "Add User",
    col_email: "Email",
    col_role: "Role",
    messaging_page: "Messaging",
    contacts: "Contacts",
    message_placeholder: "Type a message...",
    send: "Send",
    notifications_page: "Notifications",
    reports_page: "Reports",
    report_movements: "Today's Movements",
    report_maintenance: "Maintenance Cost",
    settings_page: "Settings",
    language_label: "Language",
    theme_label: "Theme",
    light_mode: "Light",
    dark_mode: "Dark",
    system_page: "System",
    system_overview: "Overview",
    menu_dashboard: "Dashboard",
    menu_vehicles: "Vehicles",
    menu_drivers: "Drivers",
    menu_movements: "Movements",
    menu_maintenance: "Maintenance",
    menu_documents: "Documents",
    menu_users: "Users",
    menu_messages: "Messages",
    menu_notifications: "Notifications",
    menu_reports: "Reports",
    menu_settings: "Settings",
    menu_system: "System",
    logout: "Logout",
    app_name_short: "FMS"
  }
};

function getCurrentLang() {
  return localStorage.getItem('fms_lang') || 'ar';
}

function setLang(lang) {
  localStorage.setItem('fms_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
}

function applyTranslations() {
  const lang = getCurrentLang();
  const dict = LANG[lang] || LANG['ar'];
  document.querySelectorAll('[data-lang]').forEach(el=>{
    const key = el.getAttribute('data-lang');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-lang-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-lang-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  // set page title if exists
  const titleEl = document.querySelector('title[data-lang]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-lang');
    if (dict[key]) document.title = dict[key];
  }
  // set direction
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
}

// Initialize default
if (!localStorage.getItem('fms_lang')) setLang('ar');

window.getCurrentLang = getCurrentLang;
window.setLang = setLang;
window.applyTranslations = applyTranslations;
