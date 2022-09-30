import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase app/project config for authentication. 
const firebaseConfig = {
  apiKey: "AIzaSyDlW-CDk-xI-xXiQTxndIeiWIw97lYSzMA",
  authDomain: "imdb-37ef3.firebaseapp.com",
  projectId: "imdb-37ef3",
  storageBucket: "imdb-37ef3.appspot.com",
  messagingSenderId: "602010060004",
  appId: "1:602010060004:web:085cdd46486c76d2da18f1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //exporting so can be used in other components for auth
