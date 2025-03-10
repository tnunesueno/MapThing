// Import the functions you need from the SDKs you need - not sure what this means

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { collection, getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBQCJP0lTLWp4gRzh6bv_YZv9EmndPSkCc",
  authDomain: "where2wizz.firebaseapp.com",
  projectId: "where2wizz",
  storageBucket: "where2wizz.firebasestorage.app",
  messagingSenderId: "491577614536",
  appId: "1:491577614536:web:52965a10ae2d325a3e45fd",
  measurementId: "G-HLEL0645BV"
};

// FIREBASE STUFF DOES NOT WORK 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);