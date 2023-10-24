// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw92S94Z6Ufvr1iI_0IStgmEzUGthmSSY",
  authDomain: "oauthapp-83e8a.firebaseapp.com",
  projectId: "oauthapp-83e8a",
  storageBucket: "oauthapp-83e8a.appspot.com",
  messagingSenderId: "202508843051",
  appId: "1:202508843051:web:ab935814171c71f9dbd26e",
  measurementId: "G-XR9SYE8DRL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);