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
class Bathroom {
    constructor(name, streetAddress, bLatitude, bLongitude, cleanliness, handicapAccesible, babyChangingStation, genderNeutral, notes) {
        this.name = name;  
        this.streetAddress = streetAddress;
        this.bLatitude = bLatitude;
        this.bLongitude = bLongitude;
        this.cleanliness = cleanliness;
        this.handicapAccesible = handicapAccesible;
        this.babyChangingStation = babyChangingStation;
        this.genderNeutral = genderNeutral;
        this.notes = notes;
    }

    getName() {
        return this.name;
    }

    setName(newName) {  
    this.name = newName;
    }
   
    getAddress() {
        return this.streetAddress;
    }

    setAddress(newAddress) {
        this.streetAddress = newAddress;
    }

    getbLatitude() {
        return this.bLatitude;
    }

    setbLatitude(newbLatitude) {
        this.bLatitude = newbLatitude;
    }

    getbLongitude() {
        return this.bLongitude;
    }

    setbLongitude(newbLongitude) {
        this.bLongitude = newbLongitude;
    }

    getCleanliness() {
        return this.cleanliness;
    }

    setCleanliness(newCleanliness) {
        this.cleanliness = newCleanliness;
    }

    getHandicapAccesible() {
        return this.handicapAccesible;
    }

    setHandicapAccesible(newHandicapAccesible) {
        this.handicapAccesible = newHandicapAccesible;
    }

    getBabyChangingStation() {
        return this.babyChangingStation;
    }

    setBabyChangingStation(newBabyChangingStation) {
        this.babyChangingStation = newBabyChangingStation;
    }

    getGenderNeutral() {
        return this.genderNeutral;
    }

    setGenderNeutral(newGenderNeutral) {
        this.genderNeutral = newGenderNeutral;
    }

    getNotes() {  
        return this.notes;
    }
    
    setNotes(newNotes) {  
      this.notes = newNotes;
    }

}

// the addresses are the only true values here. remember to find a way to populate the rest with real data and put it in info windows??
const bathroom1 = new Bathroom(null, "207 S. Sydenham St",null, null, 10,true,false,true, null)
const bathroom2 = new Bathroom(null, "2000 Sansom Street",null, null, 10, false, true, false, null);
const bathroom3 = new Bathroom(null," 1937 Callowhill St", null, null, 10, true, false, true, null);
const bathroom4 = new Bathroom("Mt. Airy Coffee", "7101 Emlen St", null, null, 10, false, true, false, null);
const bathroom5 = new Bathroom(null, "923 Race St", null, null, 10, true, false, true, null);
const bathroom6 = new Bathroom("Liberty Place Food Court", "1625 Chestnut St", null, null, 8, true, true, false, "Bathroom on hallway between Fuwa and Bain’s Deli");
const bathroom7 = new Bathroom("Just Salad", "1729 Chestnut St", null, null, 8, true, false, true, "Code: 9532. No inside lock. Single stall.");
const bathroom8 = new Bathroom("DIG", "1616 Chestnut St", null, null, 8, true, true, true, "Code: 2929. Single stall.");
const bathroom9 = new Bathroom("Di Bruno Bros", "1730 Chestnut Street", null, null, 8, true, false, true, "Bathroom behind elevator access door.");
const bathroom10 = new Bathroom("Cheesecake Factory", "1430 Walnut St", null, null, 10, true, true, false, "Bathroom is through dining room, which is upstairs. Elevator available.");
const bathroom11 = new Bathroom("CAVA", "1713 Chestnut St", null, null, 8, true, true, true, "Code: 09876.");
const bathroom12 = new Bathroom("Capital One Café", "135 S 17th St", null, null, 9, true, true, false, "Bathroom upstairs.");
const bathroom13 = new Bathroom("Ten Asian Food Hall", "1715 Chestnut St", null, null, 7, true, false, false, "notes");

var array = []; 
array.push(bathroom1);
array.push(bathroom2);
array.push(bathroom3);
array.push(bathroom4);
array.push(bathroom5);
array.push(bathroom6);
array.push(bathroom7);
array.push(bathroom8);
array.push(bathroom9);
array.push(bathroom10);
array.push(bathroom11);
array.push(bathroom12);
array.push(bathroom13);

// Initialize and add the map
let map;

async function initMap() {

    // The location of Philadelphia
    const position = { lat: 39.9526, lng: -75.1652 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { InfoWindow } = await google.maps.importLibrary("maps");
    const { Place } = await google.maps.importLibrary("places");
    // The map, centered at Philadelphia
    map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
    });
}

initMap();

function geocodeBathroom(Bathroom) {
       address = Bathroom.getAddress(); 
       console.log ("address to geocode: "+ address);
        
        if (typeof google === 'undefined') {
            console.error("Google Maps API is not loaded.");
            return;
        }
        // adding the pin inside the geo code function is temporary.
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            
            if (status == google.maps.GeocoderStatus.OK) {
            var latitude= results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
              console.log("should be geocoding");
              console.log(latitude+ ", "+longitude);
              Bathroom.setbLatitude(latitude);
              Bathroom.setbLongitude(longitude);

              console.log("BATHROOM LAT " + Bathroom.bLatitude + "BATHROOM LONG " + Bathroom.bLongitude);
            
              addPinToMap(latitude, longitude, Bathroom);
            } else {
                console.error("Geocode was not successful for the following reason: " + status);
            }

          }); 
        }
        
        for (let i = 0; i < array.length; i++) {
          geocodeBathroom(array[i]);
        }

        function addPinToMap(lat, lng, Bathroom) {
            console.log("addPinToMap function called");
            if (typeof map === 'undefined') {
                console.error("Map is not defined.");
                return;
            }
            
            const pin = new google.maps.marker.AdvancedMarkerElement({
              //  glyph: png.pngtree.com/png-vector/20230903/ourmid/pngtree-open-white-toilet-png-image_9951695.png;
                position: {lat: lat, lng: lng},
                map: map,
                title: Bathroom.getAddress(),
            });
            console.log("Pin created at " + lat + ", " + lng);

            // maybe make only one info window and change the content based on the pin clicked? so two can't be opened at once 
            const infowindowContent = ` 
             ${Bathroom.getAddress()} <br/> 
            <div> <p>Cleanliness: ${Bathroom.getCleanliness()} <br/>
               Handicap Accessible: ${Bathroom.getHandicapAccesible()} <br/>
               Baby Changing Station: ${Bathroom.getBabyChangingStation()}<br/>
                Gender Neutral: ${Bathroom.getGenderNeutral()}</p> 
            </div> `;    

            const infowindow = new google.maps.InfoWindow({
                content: infowindowContent,
                ariaLabel: Bathroom.getAddress(),
              });
        
            pin.addListener("click", () => {
                infowindow.open({
                  anchor: pin,
                  map,
                });
              });
        
        }

        function openDialog(){
           const dialog = document.getElementById("myDialog");
           dialog.showModal(); 
        }
        
        function closeDialog(){ 

            var address = document.getElementById("location").value;
            console.log("address from text field: "+ address);
            const newBathroom = new Bathroom(null, address, null, null, null, null, null,null,null);
            geocodeBathroom(newBathroom);
            array.push(newBathroom);
            
            const dialog = document.getElementById("myDialog");
            var slider = document.getElementById("myRange");
            var value = slider.value;

            newBathroom.setCleanliness(value);
            console.log("cleanliness: "+newBathroom.getCleanliness());
            
            if(document.getElementById("HandicapAccesible").checked){
                console.log("HA box checked");
              
                newBathroom.setHandicapAccesible(true);
               } else {
                console.log("HA box unchecked")
                HA = false;
                newBathroom.setHandicapAccesible(false);
               }

               if(document.getElementById("GenderNeutral").checked){
                console.log("GN box checked");
                newBathroom.setGenderNeutral(true);
               } else {
                console.log("GN box unchecked")
               newBathroom.setGenderNeutral(false); 
               }

               if(document.getElementById("BabyChanging").checked){
                console.log("babychaing box checked");
                newBathroom.setBabyChangingStation(true);
               } else {
                console.log("baby changing box unchecked")
               newBathroom.setBabyChangingStation(false); 
               }

            dialog.close();
            document.getElementById("location").value = ""; //not sure why this doesnt work, reet is not a func?
        }
        document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("location").addEventListener("input", function() {
        
        var words = document.getElementById("location").value;
        var container = document.getElementById("wrapper");
        if (container){
        if(words==null || words=="") {
        container.style.display = "none";}
        else {
        container.style.display = "block"; }
        }
        })
        });

        let title;
        let results;
        let input;
        let token;
       
            // Add an initial request body.
            let request = {
              input: document.getElementById("location").value,
             locationRestriction: {
               west: 76,
               north: 41,
               east: 74,
               south:38,
              },
              origin: { lat: 40, lng: -75 },
              language: "en-US",
              region: "us",
            };


      async function initAutocomplete() {   
            
        title = document.getElementById("title");
        results = document.getElementById("results"); 
        token = new google.maps.places.AutocompleteSessionToken();
        input = document.querySelector("input"); // not sure how the hell this works but it does 
        input.addEventListener("input", makeAcRequest); // This will trigger makeAcRequest on input event
        request = refreshToken(request);
        }
       
      async function makeAcRequest(input) {
          // Reset elements and exit if an empty string is received.
          if (input.target.value == "") {
            title.innerText = "";
            results.replaceChildren();
            return;
          }
        // Add the latest char sequence to the request.
        request.input = input.target.value;
        // Fetch autocomplete suggestions and show them in a list.
        // @ts-ignore
        const { suggestions } =
        await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
        request,
        );


       // title.innerText = 'Query predictions for "' + request.input + '"';
        // Clear the list first.
        results.replaceChildren();


  for (const suggestion of suggestions) {
    const placePrediction = suggestion.placePrediction;
    // Create a link for the place, add an event handler to fetch the place.
    const a = document.createElement("a"); // do this for the wrapper to put the stuff in? 

    a.addEventListener("click", () => {
      onPlaceSelected(placePrediction.toPlace());
    });
    a.innerText = placePrediction.text.toString();

    // Create a new list element.
    const li = document.createElement("li");

    li.appendChild(a);
    results.appendChild(li);

        }
    }

    function replaceAllChars(str, charToReplace, replacementChar) {
        return str.replaceAll(charToReplace, replacementChar);
      }

    // Event handler for clicking on a suggested place.
async function onPlaceSelected(place) {
    await place.fetchFields({
      fields: ["displayName", "formattedAddress"], // put this on the dialog
    });

 
    let placeText = document.createTextNode(
      place.displayName + ": " + place.formattedAddress,
    );
 
    results.replaceChildren(placeText);
    title.innerText = "Selected Place:";
    input.value = "";
    refreshToken(request);

    openDialog();
    var Addy = place.formattedAddress;
    Addy = Addy = replaceAllChars(Addy, ",", ""); // remove commas
    Addy = Addy = replaceAllChars(Addy, "  ", " ");   // remove double spaces (shouldnt be any)
    
    const sequence = " PA";
    let index = Addy.indexOf(sequence); // should return an int for index
    console.log(`First occurrence at index: ${index}`);
    Addy = Addy.substring(0, index); // does chop at PA -> avoids postal code weirdness STILL DOESN'T GEOCODE

    document.getElementById("location").value = Addy;
    console.log("addy minus pa and zip: "+ Addy);
  } // send NAME to addpintoaddress with an html element?? 
 
  // Helper function to refresh the session token.
  async function refreshToken(request) {
    // Create a new session token and add it to the request.
    token = new google.maps.places.AutocompleteSessionToken();
    request.sessionToken = token;
    return request;
  }
 //window.init = initAutocomplete;



    // to do: 
    // ADD THE TOILET GRAPHIC
    // delete pin func 
    // save to json + upload from server 
    // location services
    // only one infowindow at once? 
    // list view side pop out 
    // directions to nearest bathroom
    // popout to view all
    // search 
    // filter 