import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAb-9FZTBcallOvrBlFIDcvEB70O0jw2H0",
  authDomain: "chatmini-2dfad.firebaseapp.com",
  projectId: "chatmini-2dfad",
  storageBucket: "chatmini-2dfad.appspot.com",
  messagingSenderId: "641342175460",
  appId: "1:641342175460:web:40c678a8fc6bb5eeb254f1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);