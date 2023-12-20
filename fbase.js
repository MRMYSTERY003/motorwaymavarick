import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js"; 
import {getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword,  signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import { getDatabase,ref,set,child,onValue,update,remove, } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHCLZ7unC_5AV9WGbr0x4lHYHFGIq4-Xw",
    authDomain: "motorwaymavericks-23929.firebaseapp.com",
    databaseURL: "https://motorwaymavericks-23929-default-rtdb.firebaseio.com",
    projectId: "motorwaymavericks-23929",
    storageBucket: "motorwaymavericks-23929.appspot.com",
    messagingSenderId: "175834495669",
    appId: "1:175834495669:web:f9c4a037dcf72a4f275cfc"
  };


let app;
app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);
const auth = getAuth();


export {auth,database,ref,set,onValue,signInWithEmailAndPassword,child, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged };
