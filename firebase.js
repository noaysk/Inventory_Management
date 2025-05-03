// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvCJZ4X-EWi8Icrk_gte8VfAkI7WUWFgY",
    authDomain: "mountshiga-783ed.firebaseapp.com",
    projectId: "mountshiga-783ed",
    storageBucket: "mountshiga-783ed.firebasestorage.app",
    messagingSenderId: "664043568527",
    appId: "1:664043568527:web:e2f45a8738790768df9ffa",
    measurementId: "G-57MFF1ES20"
  };
  

// Firebase初期化
const firebaseApp = initializeApp(firebaseConfig);

// Firestoreインスタンスを取得
const db = getFirestore(firebaseApp);

// firebaseApp と db をエクスポート
export { firebaseApp, db };
