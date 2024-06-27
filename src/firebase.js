// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "cosmetic-9c4bc.firebaseapp.com",
  projectId: "cosmetic-9c4bc",
  storageBucket: "cosmetic-9c4bc.appspot.com",
  messagingSenderId: "613770706821",
  appId: "1:613770706821:web:099ab87329616756aa4eec",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
