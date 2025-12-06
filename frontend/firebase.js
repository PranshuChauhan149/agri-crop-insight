import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYoNWvQ2qO9HHeNhWkba6Y6cgN5YnF-6M",
  authDomain: "agri-crop-a6855.firebaseapp.com",
  projectId: "agri-crop-a6855",
  storageBucket: "agri-crop-a6855.appspot.com",   // ✅ FIXED
  messagingSenderId: "80840053456",
  appId: "1:80840053456:web:b999ed433755b4e55cc4d5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
