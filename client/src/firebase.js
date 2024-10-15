// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c717f.firebaseapp.com",
  projectId: "mern-auth-c717f",
  storageBucket: "mern-auth-c717f.appspot.com",
  messagingSenderId: "224184517056",
  appId: "1:224184517056:web:34a1d816c7f840d35e8825"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);