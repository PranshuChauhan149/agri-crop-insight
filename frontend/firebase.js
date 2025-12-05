// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "agri-crop-a6855.firebaseapp.com",
  projectId: "agri-crop-a6855",
  storageBucket: "agri-crop-a6855.firebasestorage.app",
  messagingSenderId: "80840053456",
  appId: "1:80840053456:web:b999ed433755b4e55cc4d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
