import { initializeApp } from 'firebase/app';
// import { getApp, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMS7vWHx0LmD7AeSWpBubCaxbgv4EEyLc",
    authDomain: "smartfridge-b50d1.firebaseapp.com",
    projectId: "smartfridge-b50d1",
    storageBucket: "smartfridge-b50d1.appspot.com",
    messagingSenderId: "104830455974",
    appId: "1:104830455974:web:17f8139a06ddf10eb8a467",
    measurementId: "G-35NHTPNBZ3"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// onAuthStateChanged(FIREBASE_AUTH,(user) =>{
//     if(user){

//     }else{

//     }
// })
