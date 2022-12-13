// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5btwyq3Y0_89NDy7vciVH7nH9JoPI3JA",
  authDomain: "project-fair-5c74b.firebaseapp.com",
  projectId: "project-fair-5c74b",
  storageBucket: "project-fair-5c74b.appspot.com",
  messagingSenderId: "1069603061171",
  appId: "1:1069603061171:web:76483f44aea7e9f5595fc6",
  measurementId: "G-31YK9Q473X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const updateUserDatabase = async (user, uid) => {
  if (typeof user !== "object") return;
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user });
};

export { app as default, auth, db, updateUserDatabase };
