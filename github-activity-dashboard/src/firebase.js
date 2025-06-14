import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFZReA085G-iYzr7n1RtKzKbHOb6YP_Vw",
  authDomain: "github-activity-tracker-7d8c8.firebaseapp.com",
  projectId: "github-activity-tracker-7d8c8",
  storageBucket: "github-activity-tracker-7d8c8.firebasestorage.app",
  messagingSenderId: "936150977919",
  appId: "1:936150977919:web:071cbdadfb1d470ae35e4a",
  measurementId: "G-WWYH4X66QV"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
