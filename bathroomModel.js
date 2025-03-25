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

console.log(array); // for debugging purposes, remove later

async function populateArray(){
for (let i = 0; i < array.length; i++) {
  await geocodeBathroom(array[i]); // Wait for geocoding to complete for each bathroom
}
console.log("All bathrooms geocoded:", array);
return array; // Return the fully populated array
}

const arrayPromise = populateArray();
export {arrayPromise}; 
import { writeBathroomsToFirestore } from './firebase.js';
//writeBathroomsToFirestore(array);
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
     var address = Bathroom.getAddress(); 
     //console.log ("address to geocode: "+ address);
      
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
           // console.log("should be geocoding");
            //console.log(latitude+ ", "+longitude);
            Bathroom.setbLatitude(latitude);
            Bathroom.setbLongitude(longitude);

            //console.log("BATHROOM LAT " + Bathroom.bLatitude + "BATHROOM LONG " + Bathroom.bLongitude);
          
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
           // map.setCenter(Bathroom.getbLatitude,Bathroom.getbLongitude,17);
          
            const popOut = document.getElementById("selectedBR");
            document.getElementById("name").innerHTML = Bathroom.getName();
            document.getElementById("address").innerHTML = Bathroom.getAddress();
            document.getElementById("cleanlinessText").innerHTML = `Cleanliness: ${Bathroom.getCleanliness()}`;
            document.getElementById("handicap").innerHTML = `Handicap Accessible: ${Bathroom.getHandicapAccesible()}`;
            document.getElementById("genderNeutral").innerHTML = `Gender Neutral: ${Bathroom.getGenderNeutral()}`;
            document.getElementById("babyChanging").innerHTML = `Baby Changing Station: ${Bathroom.getBabyChangingStation()}`;
            popOut.style.display = "block"; // Show the popOut element

            });
          }

      function openDialog(bathroom){
        const dialog = document.getElementById("myDialog");
        dialog.showModal();
    
        // Store the Bathroom object in a global variable for later use in closeDialog
        window.currentBathroom = bathroom;
      }
      
      function closeDialog() {
        const dialog = document.getElementById("myDialog");
    
        // Retrieve the Bathroom object from the global variable
        const newBathroom = window.currentBathroom;
    
        // Get cleanliness from the slider
        const slider = document.getElementById("myRange");
        const value = slider.value;
        newBathroom.setCleanliness(value);
        console.log("Cleanliness: " + newBathroom.getCleanliness());
    
        // Get checkbox values
        if (document.getElementById("HandicapAccesible").checked) {
            console.log("Handicap Accessible box checked");
            newBathroom.setHandicapAccesible(true);
        } else {
            console.log("Handicap Accessible box unchecked");
            newBathroom.setHandicapAccesible(false);
        }
    
        if (document.getElementById("GenderNeutral").checked) {
            console.log("Gender Neutral box checked");
            newBathroom.setGenderNeutral(true);
        } else {
            console.log("Gender Neutral box unchecked");
            newBathroom.setGenderNeutral(false);
        }
    
        if (document.getElementById("BabyChanging").checked) {
            console.log("Baby Changing Station box checked");
            newBathroom.setBabyChangingStation(true);
        } else {
            console.log("Baby Changing Station box unchecked");
            newBathroom.setBabyChangingStation(false);
        }
    
        // Geocode the bathroom and add it to the map and array
        geocodeBathroom(newBathroom);
        array.push(newBathroom);
    
        // Close the dialog
        dialog.close();
        document.getElementById("location").value = ""; // Clear the location input
    }

    window.closeDialog = closeDialog; // Make the function available in the global scope


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

      window.initAutocomplete = initAutocomplete; // supposed to put on the global scopre
     
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
  fields: ["displayName", "formattedAddress"],
});

let placeText = document.createTextNode(
  place.displayName + ": " + place.formattedAddress,
);

results.replaceChildren(placeText);
title.innerText = "Selected Place:";
input.value = "";
refreshToken(request);

var Addy = place.formattedAddress;
Addy = replaceAllChars(Addy, ",", ""); // Remove commas
Addy = replaceAllChars(Addy, "  ", " "); // Remove double spaces

const sequence = " PA";
let index = Addy.indexOf(sequence); // Find " PA" in the address
console.log(`First occurrence at index: ${index}`);
Addy = Addy.substring(0, index); // Remove " PA" and postal code
document.getElementById("location").value = Addy;
console.log("Address minus PA and zip: " + Addy);

// Create a new Bathroom object with the displayName and address
const newBathroom = new Bathroom(place.displayName, Addy, null, null, null, null, null, null, null);
console.log("New Bathroom created with name: " + newBathroom.getName());

// Open the dialog and pass the Bathroom object to finalize its properties
openDialog(newBathroom);
}  

// Helper function to refresh the session token.
async function refreshToken(request) {
  // Create a new session token and add it to the request.
  token = new google.maps.places.AutocompleteSessionToken();
  request.sessionToken = token;
  return request;
}

function closePopOut() {
  document.getElementById("selectedBR").style.display = "none";
}

window.closePopOut = closePopOut; // Make the function available in the global scope

// TO DO 
// move away from the array ASAP 
// add save and restore
// decide whether to geocode once or every time the map is loaded
// figure out why tf nothing will display over the map
// zoom in on selected pin 
// make a plus button that opens the interface to add a bathroom 
// turn the og add a bathroom into a search bar 