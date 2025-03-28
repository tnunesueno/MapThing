// Import the functions you need from the SDKs you need - not sure what this means

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js"; 


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

function writeOneBr(bathroom) {
  addDoc(collection(db, "bathrooms"), {
    name: bathroom.getName(),
    address: bathroom.getAddress(),
    latitude: bathroom.getLatitude(),
    longitude: bathroom.getLongitude(),
    cleanliness: bathroom.getCleanliness(),
    handicapAccessible: bathroom.getHandicapAccesible(),
    babyChangingStation: bathroom.getBabyChangingStation(),
  }).then(docRef => { 
    console.log("Document written with ID: ", docRef.id);
  });
}

export {writeOneBr, db};

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

export{writeBathroomsToFirestore}; 

var array = [];
async function fetchBathrooms() {
  const querySnapshot = await getDocs(collection(db, "bathrooms"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);

    array.push(doc.data());
  });
  console.log("array of fetched bathrooms" + array);
}

fetchBathrooms();



