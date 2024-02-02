// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmRGFFYBz4MVQzrzFZZz5-vlzXQvKScLE",
  authDomain: "flashcode-6cb10.firebaseapp.com",
  projectId: "flashcode-6cb10",
  storageBucket: "flashcode-6cb10.appspot.com",
  messagingSenderId: "614924550810",
  appId: "1:614924550810:web:9c926274121bd21b621523",
  measurementId: "G-KEXP9B5YHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);