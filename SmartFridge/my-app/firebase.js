import { initializeApp } from 'firebase/app';
// import { getApp, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_APIKET, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID,
    FIREBASE_APPID, FIREBASE_MEASUREMENTID } from '@env';

// Initialize Firebase
const firebaseConfig = {
    apiKey: FIREBASE_APIKET,
    authDomain: FIREBASE_AUTHDOMAIN,
    projectId: FIREBASE_PROJECTID,
    storageBucket: FIREBASE_STORAGEBUCKET,
    messagingSenderId: FIREBASE_MESSAGINGSENDERID,
    appId: FIREBASE_APPID,
    measurementId: FIREBASE_MEASUREMENTID
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// onAuthStateChanged(FIREBASE_AUTH,(user) =>{
//     if(user){

//     }else{

//     }
// })
