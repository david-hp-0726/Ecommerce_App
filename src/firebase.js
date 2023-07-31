import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Replace with my config
const firebaseConfig = {
  apiKey: "AIzaSyAiByCFIUsYvlVVhf4aFaNwvLmVaD_yNmc",
  authDomain: "ecommerce-619ed.firebaseapp.com",
  projectId: "ecommerce-619ed",
  storageBucket: "ecommerce-619ed.appspot.com",
  messagingSenderId: "202990276442",
  appId: "1:202990276442:web:a66330fdd7022261a7ed63",
  measurementId: "G-VEQ1XHHQMF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
