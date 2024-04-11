// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3NX6vGy5Aoy1YZ5t3I2Amsup-d8gHDRc",
    authDomain: "rnchatapp-60e05.firebaseapp.com",
    projectId: "rnchatapp-60e05",
    storageBucket: "rnchatapp-60e05.appspot.com",
    messagingSenderId: "396461359062",
    appId: "1:396461359062:web:090bd29275c862ad06ae77"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);