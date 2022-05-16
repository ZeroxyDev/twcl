// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_FIRE,
  authDomain: "kron-538a0.firebaseapp.com",
  projectId: "kron-538a0",
  storageBucket: "kron-538a0.appspot.com",
  messagingSenderId: "879460282380",
  appId: "1:879460282380:web:47f432b23490056ed27e29",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
