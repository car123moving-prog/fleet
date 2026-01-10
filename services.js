// services.js

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  deleteUser
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import { db, auth, storage } from "./firebase";

// ============ GENERIC HELPERS ============
async function getAll(col) {
  const snap = await getDocs(collection(db, col));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function addItem(col, data) {
  return await addDoc(collection(db, col), data);
}

async function updateItem(col, id, data) {
  return await updateDoc(doc(db, col, id), data);
}

async function deleteItem(col, id) {
  return await deleteDoc(doc(db, col, id));
}

// ============ VEHICLES ============
export const getVehicles = () => getAll("vehicles");
export const addVehicle = (data) => addItem("vehicles", data);
export const updateVehicle = (id, data) => updateItem("vehicles", id, data);
export const deleteVehicle = (id) => deleteItem("vehicles", id);

// ============ DRIVERS ============
export const getDrivers = () => getAll("drivers");
export const addDriver = (data) => addItem("drivers", data);
export const updateDriver = (id, data) => updateItem("drivers", id, data);
export const deleteDriver = (id) => deleteItem("drivers", id);

// ============ MAINTENANCE ============
export const getMaintenance = () => getAll("maintenance");
export const addMaintenance = (data) => addItem("maintenance", data);
export const updateMaintenance = (id, data) => updateItem("maintenance", id, data);
export const deleteMaintenance = (id) => deleteItem("maintenance", id);

// ============ DOCUMENTS (WITH FILE UPLOAD) ============
export async function getDocuments() {
  return await getAll("documents");
}

export async function addDocument(data, file) {
  let fileUrl = null;

  if (file) {
    const fileRef = ref(storage, `docs/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    fileUrl = await getDownloadURL(fileRef);
  }

  return await addItem("documents", { ...data, fileUrl });
}

export async function updateDocument(id, data) {
  return await updateItem("documents", id, data);
}

export async function deleteDocument(id, fileUrl) {
  if (fileUrl) {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef).catch(() => {});
  }
  return await deleteItem("documents", id);
}

// ============ USERS (AUTH + FIRESTORE) ============
export async function getUsers() {
  return await getAll("users");
}

export async function addUser(data) {
  const cred = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  await addItem("users", {
    uid: cred.user.uid,
    name: data.name,
    email: data.email,
    role: data.role
  });
}

export async function updateUser(id, data) {
  return await updateItem("users", id, data);
}

export async function deleteUserAccount(id, uid) {
  await deleteItem("users", id);
  const user = auth.currentUser;
  if (user && user.uid === uid) {
    await deleteUser(user);
  }
}

// ============ NOTIFICATIONS (REAL-TIME) ============
export function listenNotifications(callback) {
  const unsub1 = onSnapshot(collection(db, "documents"), () => process());
  const unsub2 = onSnapshot(collection(db, "vehicles"), () => process());
  const unsub3 = onSnapshot(collection(db, "maintenance"), () => process());

  async function process() {
    const docs = await getDocuments();
    const vehicles = await getVehicles();
    const maintenance = await getMaintenance();

    const list = [];

    // وثائق منتهية
    docs.forEach((d) => {
      if (!d.expiry) return;
      const today = new Date();
      const exp = new Date(d.expiry);
      if (exp < today) {
        list.push({
          type: "document",
          title: `وثيقة منتهية: ${d.name}`,
          message: `المركبة: ${d.vehicle}`,
          date: d.expiry
        });
      }
    });

    // مركبات معطلة
    vehicles.forEach((v) => {
      if (v.status === "معطلة") {
        list.push({
          type: "vehicle",
          title: `مركبة معطلة: ${v.model}`,
          message: `اللوحة: ${v.plate}`,
          date: "اليوم"
        });
      }
    });

    // صيانة
    maintenance.forEach((m) => {
      list.push({
        type: "maintenance",
        title: `سجل صيانة: ${m.vehicle}`,
        message: `${m.type} — ${m.cost}`,
        date: m.date
      });
    });

    callback(list);
  }

  process();

  return () => {
    unsub1();
    unsub2();
    unsub3();
  };
}

// ============ AUTH GUARD ============
export function isLoggedIn() {
  return auth.currentUser !== null;
}
