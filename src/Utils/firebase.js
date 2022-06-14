// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWxZ8MyGJ_z-AotcEJxerK_MkEFZ6OTHY",
  authDomain: "instagram-clone-cdfe2.firebaseapp.com",
  projectId: "instagram-clone-cdfe2",
  storageBucket: "instagram-clone-cdfe2.appspot.com",
  messagingSenderId: "758219333730",
  appId: "1:758219333730:web:2ec841e18cea49b1def13b",
  measurementId: "G-2YD4NYTH2Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//initialize services

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export const colRef = collection(db, "posts");
