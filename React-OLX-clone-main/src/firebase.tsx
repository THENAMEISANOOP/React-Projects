import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCrBFqZDRiopFE0hpPGPkpYtP-_SobAXok",
    authDomain: "olx--clone-f93b6.firebaseapp.com",
    projectId: "olx--clone-f93b6",
    storageBucket: "olx--clone-f93b6.firebasestorage.app",
    messagingSenderId: "203005168656",
    appId: "1:203005168656:web:91ab196dba369997a20e95"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}