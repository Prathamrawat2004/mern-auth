// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-71c21.firebaseapp.com",
  projectId: "mern-auth-71c21",
  storageBucket: "mern-auth-71c21.appspot.com",
  messagingSenderId: "726657707371",
  appId: "1:726657707371:web:00e9c402533ccae8ee702e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);