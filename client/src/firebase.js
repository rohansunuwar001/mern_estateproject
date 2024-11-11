// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-cf28c.firebaseapp.com",
  projectId: "mern-estate-cf28c",
  storageBucket: "mern-estate-cf28c.firebasestorage.app",
  messagingSenderId: "889076470380",
  appId: "1:889076470380:web:25b3d8656cb9ff7d927e49"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);