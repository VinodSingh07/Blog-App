// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs5mHoeHXErDoh0Fm34sZaFu86Jetfemw",
  authDomain: "blog-app-14f42.firebaseapp.com",
  projectId: "blog-app-14f42",
  storageBucket: "blog-app-14f42.firebasestorage.app",
  messagingSenderId: "753757434480",
  appId: "1:753757434480:web:0d8cf5e1dd3a4df7483ab5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
