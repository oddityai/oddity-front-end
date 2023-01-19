import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2qqbu7SxSLz_IBfl1dizvclnYFfZE2Tw",
  authDomain: "oddity-fc1b7.firebaseapp.com",
  projectId: "oddity-fc1b7",
  storageBucket: "oddity-fc1b7.appspot.com",
  messagingSenderId: "1079832257530",
  appId: "1:1079832257530:web:040b761d27a095b6f0ba43",
  measurementId: "G-0Y4S8N0C6N",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db, firebaseApp };
