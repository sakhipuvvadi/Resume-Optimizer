
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKtIQ70-MFi2kdbjhyavCa9C_5eL9vcRY",
  authDomain: "careercraft-700b1.firebaseapp.com",
  projectId: "careercraft-700b1",
  storageBucket: "careercraft-700b1.firebasestorage.app",
  messagingSenderId: "531502348231",
  appId: "1:531502348231:web:4d9630c7ca2bb3a9c60be2",
  measurementId: "G-7J7FH2T3V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };
