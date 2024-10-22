import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_vBlBSZNrV6-Jr96hztS1rnh1X-Ghs_Y",
  authDomain: "svitlospace-b21f8.firebaseapp.com",
  projectId: "svitlospace-b21f8",
  storageBucket: "svitlospace-b21f8.appspot.com",
  messagingSenderId: "420959837419",
  appId: "1:420959837419:web:bb8b7ecd7b5d382c1172ae",
  measurementId: "G-1WG7ZP5DRY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);
export const auth = getAuth(app);
export { db, app, functions };
