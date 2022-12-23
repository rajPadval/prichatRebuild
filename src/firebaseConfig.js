// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvoaCNQF2Z0T3rmC0VYP9PjDKLRVOkMwE",
  authDomain: "prichat-c433e.firebaseapp.com",
  projectId: "prichat-c433e",
  storageBucket: "prichat-c433e.appspot.com",
  messagingSenderId: "690987292005",
  appId: "1:690987292005:web:fe46b85cb35abf0f0c3d8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();