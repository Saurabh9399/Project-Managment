// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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

const storage = getStorage(app);

const updateUserDatabase = async (user, uid) => {
  if (typeof user !== "object") return;
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user });
};

const getUserFromDatabase = async (uid) => {
  const docRef = doc(db, "users", uid);
  const result = await getDoc(docRef);

  if (!result.exists()) return null;
  return result.data();
};

const uploadImage = (file, progressCallback, urlCallback, errorCallback) => {
  if (!file) {
    errorCallback("file not found");
    return;
  }

  const fileType = file.type;
  const fileSize = file.size / 1024 / 1024;

  if (!fileType.includes("image")) {
    errorCallback("File must be an image");
    return;
  }
  if (fileSize > 2) {
    errorCallback("File must be smaller than 2MB");
    return;
  }
  const storageRef = ref(storage, `images/${file.name}`);

  const task = uploadBytesResumable(storageRef, file);

  task.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressCallback(progress);
    },
    (error) => {
      errorCallback(error.message);
    },
    () => {
      getDownloadURL(storageRef).then((url) => {
        urlCallback(url);
      });
    }
  );
};

export {
  app as default,
  auth,
  db,
  updateUserDatabase,
  getUserFromDatabase,
  uploadImage,
};
