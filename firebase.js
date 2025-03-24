// Import the functions you need from the SDKs you need - not sure what this means

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js"; 
import { arrayPromise } from "./bathroomModel.js"; // Correctly import the named export 'array'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
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


async function writeBathroomsToFirestore(array) {
  try {
    for (const bathroom of array) {
      addDoc(collection(db, "bathrooms"), {
        name: bathroom.getName(),
        address: bathroom.getAddress(),
        latitude: bathroom.bLatitude,
        longitude: bathroom.bLongitude,
        cleanliness: bathroom.getCleanliness(),
        handicapAccessible: bathroom.getHandicapAccesible(),
        babyChangingStation: bathroom.getBabyChangingStation(),
        genderNeutral: bathroom.getGenderNeutral(),
        notes: bathroom.notes
      }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      });
      
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export{writeBathroomsToFirestore, db}; 

// Wait for the array to be fully populated before writing to Firestore
/*arrayPromise.then((array) => {
  console.log("Array ready for Firestore:", array);
  writeBathroomsToFirestore(array);
}).catch((error) => {
  console.error("Error populating array:", error);
});*/

async function fetchBathrooms() {
  const querySnapshot = await getDocs(collection(db, "bathrooms"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

fetchBathrooms();
/*// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {auth } from 'firebase/auth';

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
const analytics = getAnalytics(app);
document.addEventListener('DOMContentLoaded', function() {
  const loadEl = document.querySelector('#load');
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.firestore().doc('/foo/bar').get().then(() => { });
  // firebase.functions().httpsCallable('yourFunction')().then(() => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  // firebase.analytics(); // call to activate
  // firebase.analytics().logEvent('tutorial_completed');
  // firebase.performance(); // call to activate
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  

  try {
  let app = firebase.app();
  let features = [
    'auth', 
    'database', 
    'firestore',
    'storage', 
  ].filter(feature => typeof app[feature] === 'function');
  loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
} catch (e) {
  console.error(e);
  loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
}
});
*/