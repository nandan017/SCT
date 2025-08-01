// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBceoX2g0-IT0GqeRjEexUs1xKmRJBqGFY",
  authDomain: "tracebloc-web.firebaseapp.com",
  projectId: "tracebloc-web",
  storageBucket: "tracebloc-web.firebasestorage.app",
  messagingSenderId: "737411173574",
  appId: "1:737411173574:web:af428488a02f544c2a5bc7",
  measurementId: "G-2LBCNVZJBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);