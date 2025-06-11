import{db, fetchBathrooms, collection, getDocs, writeBathroomsToFirestore, writeOneBr} from './firebase.js';
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
//import { Analytics } from "@vercel/analytics/next" 
import { openAddDialog, openDialog, closePopOut, closeAddDialog, enableDialogClose} from './dialogs.js';
import{getLocation, showPosition, showError, distanceFormula, findNearestBathroom, User } from './geolocator.js';

/*export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}*/

class Bathroom {
    constructor(name, streetAddress, bLatitude, bLongitude, cleanliness, handicapAccesible, babyChangingStation, genderNeutral, notes, hours, id) {
        this.name = name;  
        this.streetAddress = streetAddress;
        this.bLatitude = bLatitude;
        this.bLongitude = bLongitude;
        this.cleanliness = cleanliness;
        this.handicapAccesible = handicapAccesible;
        this.babyChangingStation = babyChangingStation;
        this.genderNeutral = genderNeutral;
        this.notes = notes;
        this.id = id;
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

    getHours() {
        return this.hours;
    }

    setHours(newHours) {
        this.hours = newHours;
    }

    getId() {
        return this.id;
    } 

    setId(newId) {
        this.id = newId;
    }

}
// Initialize and add the map
let map;

async function initMap() {
    const position = { lat: 39.9526, lng: -75.1652 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { PinElement } = await google.maps.importLibrary("marker");
    const { InfoWindow } = await google.maps.importLibrary("maps");
    const { Place } = await google.maps.importLibrary("places");
    // The map, centered at Philadelphia
    await getLocation(); 
    map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
        draggable: true, 
        scrollwheel: true, 
    });

    initAutocomplete(); // hopefully this fixes all the nonsense with the places
}

initMap();
addBathroomsToMap(); // this is the function that adds the bathrooms to the map

function geocodeBathroom(Bathroom) {
    return new Promise((resolve, reject) => {
       var address = Bathroom.getAddress(); 
        
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
  
              Bathroom.setbLatitude(latitude);
              Bathroom.setbLongitude(longitude);
            
              addPinToMap(latitude, longitude, Bathroom);
              resolve({latitude, longitude}); // Resolve the promise after adding the pin
            } else {
                console.error("Geocode was not successful for the following reason: " + status);
                reject(status)
            }
          }); 
        }); 
}

let pins = []; 
        function addPinToMap(lat, lng, Bathroom) {
            if (typeof map === 'undefined') {
                console.error("Map is not defined.");
                return;
            }

            const pinSize = window.innerWidth <= 768 ? 64 : 47; // Larger size for mobile (<=768px)
          
            const pin = new google.maps.Marker({
                icon: {
                  url: "./glyph.png",
                  scaledSize: new google.maps.Size(pinSize, pinSize), // Adjust size as neede
                },
                position: {lat: lat, lng: lng},
                map: map,
                title: Bathroom.getAddress(),
            });
            pins.push(pin);
            // Add a click event listener to the pin 
            pin.addListener("click", () => {
             map.setCenter({lat: lat, lng: lng});
             map.setZoom(19); 
             pin.setIcon({
              url: "1-removebg-preview (1).png",
              scaledSize: new google.maps.Size(47, 47), 
             });
            
              const popOut = document.getElementById("selectedBR");
              if(Bathroom.getName()){
                document.getElementById("name").innerHTML = Bathroom.getName();
              } else {
                document.getElementById("name").display = "none";
              }
        // it should alwsy have an address and cleanliness is a number 
              document.getElementById("address").innerHTML = Bathroom.getAddress();
              document.getElementById("cleanlinessText").innerHTML = `Cleanliness: ${Bathroom.getCleanliness()}`;

              if (Bathroom.getHandicapAccesible()==true){
                document.getElementById("handicap").innerHTML = `Handicap Accessible`;
               //document.getElementById("handicap").innerHTML = "<img src=\"./wheelchair.svg\" width=\"400px\" height=\"150px\">";
              } else {
               document.getElementById("handicapBigThing").style.display = "none"; 
              }

              if(Bathroom.getGenderNeutral()==true){
                document.getElementById("genderNeutral").innerHTML = `Gender Neutral`;
              }
              else{
                document.getElementById("genderNeutralBigThing").style.display = "none"; 
              }
              
             if(Bathroom.getBabyChangingStation()==true){
                document.getElementById("babyChanging").innerHTML = `Baby Changing Station Available`;
             } else{
              document.getElementById("babyChangingBigThing").style.display = "none";
             }

             if(Bathroom.getNotes()){
              document.getElementById("notesDisplay").innerHTML = Bathroom.getNotes();
              document.getElementById("notesDisplay").style.display = "block";
              } else{
                document.getElementById("notesDisplay").style.display = "none";
              }
              popOut.style.display = "flex"; 
              popOut.classList.add('visible');
              });

              const closeButton = document.getElementById("closePopOutButton");
              closeButton.addEventListener("click", () => {
                //popOut.style.display = "none"; this is done separately - i dont think i need it here anymore
                map.setZoom(17); // Reset zoom level
                pin.setIcon({
                  url: "./glyph.png",
                  scaledSize: new google.maps.Size(47, 47), // Adjust size as needed
                });
                
              });

        }
                   
 let bathroomArray = []; 

  async function addBathroomsToMap() {
    try {
        const bathrooms = await fetchBathrooms();
        console.log(`Fetched ${bathrooms.length} bathrooms.`);

        for (const bathroom of bathrooms) {
            const lat = bathroom.getbLatitude();
            const lng = bathroom.getbLongitude();

            // Helper to check if a coordinate is a valid number
            const isValidCoordinate = (coord) => typeof coord === 'number' && !isNaN(coord);

            if (isValidCoordinate(lat) && isValidCoordinate(lng)) {
                // Coordinates are valid, add pin directly
                addPinToMap(lat, lng, bathroom);
            } else {
                // Coordinates are invalid or missing, attempt to geocode
                console.log(`Bathroom "${bathroom.getName() || bathroom.getAddress()}" needs geocoding. Current lat/lng: ${lat}, ${lng}.`);
                try {
                    const {latitude: newLat, longitude: newLng} = await geocodeBathroom(bathroom);

                    if (bathroom.getId() && isValidCoordinate(newLat) && isValidCoordinate(newLng)) {
                        const brDocRef = doc(db, "bathrooms", bathroom.getId());
                        await updateDoc(brDocRef, {
                            latitude: newLat,
                            longitude: newLng,
                        });
                        console.log(`Firestore updated for bathroom "${bathroom.getName() || bathroom.getAddress()}" with new coordinates: ${newLat}, ${newLng}.`);
                    } else {
                        console.warn(`Skipping Firestore update for "${bathroom.getName() || bathroom.getAddress()}". Missing ID or invalid new coordinates after geocoding. ID: ${bathroom.getId()}, Lat: ${newLat}, Lng: ${newLng}`);
                    }
                } catch (error) {
                    console.error(`Error geocoding or updating Firestore for bathroom "${bathroom.getName() || bathroom.getAddress()}":`, error);
                }
              }
        
            bathroomArray.push(bathroom); 
            
            }
    } catch (error) {
        console.error("Error fetching bathrooms in addBathroomsToMap:", error);
    }
}

        // all of this nonsense is ai bs that doens't work FIX IT 
        document.getElementById("addButton").addEventListener("click", (event) => {
          const addDialog = document.getElementById("addDialog");
          if (addDialog) {
              addDialog.showModal(); // Open the dialog
          }
          event.stopPropagation(); // Prevent the click from propagating to the document
      });
        document.addEventListener("click", (event) => {
              const addDialog = document.getElementById("addDialog");
              const button = document.getElementById("floatingPanel");
          
              if (addDialog.open && !addDialog.contains(event.target)) {
                  addDialog.close();
                  console.log("addDialog closed because of outside click.");
              }
          });

// start of autocomplete code
        let title;
        let results;
        let input;
        let token;
       
            let request = {
              input: document.getElementById("location").value,
              origin: { lat: 40, lng: -75 },
              language: "en-US",
              region: "us",
              sessionToken: token,
              includeQueryPredictions: true, 
            };

  async function initAutocomplete() {   
            
        title = document.getElementById("title");
        results = document.getElementById("results"); 
        token = new google.maps.places.AutocompleteSessionToken();
        input = document.getElementById("location"); // not sure how the hell this works but it does 
        input.addEventListener("input", makeAcRequest); // This will trigger makeAcRequest on input event
        request = refreshToken(request);
        }
       
      async function makeAcRequest(input) {

        const philadelphiaBounds = {
          north: 40.15,
          south: 39.87,
          east: -74.95,
          west: -75.28,
        };
      
          // Reset elements and exit if an empty string is received.
          if (input.target.value == "") {
            title.innerText = "";
            results.replaceChildren();
            return;
          }
        // Add the latest char sequence to the request.
        request.input = input.target.value; 
        
        // this makes like a box 
        request.locationBias = philadelphiaBounds; 

        const { suggestions } =
        await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
        request,
        );
        console.log("Suggestions:", suggestions);

        results.replaceChildren();


  for (const suggestion of suggestions) {
    const placePrediction = suggestion.placePrediction;
    console.log("Place Prediction:", placePrediction);
    // Create a link for the place, add an event handler to fetch the place.
    const a = document.createElement("a"); // do this for the wrapper to put the stuff in? 

    a.addEventListener("click", () => {
      onPlaceSelected(placePrediction);
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

    // clicking on a suggested place.
    async function onPlaceSelected(placePrediction) {
      console.log("onPlaceSelected called with prediction :", placePrediction);

      const placeId = placePrediction.placeId;

      if (!placePrediction.placeId) {
          console.error("Place does not have a id.");
          return;
      }
      
      const place = new google.maps.places.Place({id: placeId});
      const otherPlace = placePrediction.toPlace();

    
        await place.fetchFields({ fields : ["displayName", "formattedAddress", "regularOpeningHours"] });
        if (!place.displayName || !place.formattedAddress) {
        console.error("Place does not have a name or formatted address.");
        } 

        const name = place.displayName;
        const address = place.formattedAddress;
        const openingHours = place.regularOpeningHours;
        console.log("Place Name:", name);
        console.log("Place Address:", address);
        console.log("Place Opening Hours:", openingHours);

        const newBathroom = new Bathroom(name, address, null, null, null, null, null, null, null, openingHours);
        console.log("New Bathroom created:", newBathroom);
  
    geocodeBathroom(newBathroom);
    openDialog(newBathroom); // this is the function that opens the dialog

  }
 
  
  async function refreshToken(request) {
    token = new google.maps.places.AutocompleteSessionToken();
    request.sessionToken = token;
    return request;
  }

  // START OF FILTER CODE 

  function updateFilterInput() {

    const filterPanel = document.getElementById("filterPanel");
    filterPanel.showModal(); 

    enableDialogClose(filterPanel);
    const filterField = document.getElementById("filterField").value;
    const filterInputContainer = document.getElementById("filterInputContainer");

    // Clear the existing input
    filterInputContainer.innerHTML = "";
    const formattedFieldName = filterField.replace(/([A-Z])/g, " $1").toLowerCase();

    // Add the appropriate input field based on the selected filter field
    if (filterField === "cleanliness") {
        filterInputContainer.innerHTML = `
            <label for="filterValue">Minimum Cleanliness (1-10):</label>
            <input type="number" id="filterValue" min="1" max="10" value="5">
        `;
    } else if (filterField === "handicapAccessible" || filterField === "genderNeutral") {
        filterInputContainer.innerHTML = `
            <label for="filterValue">Is ${formattedFieldName}?</label>
            <select id="filterValue">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        `;
    } else if (filterField === "babyChangingStation") {
      filterInputContainer.innerHTML = `
          <label for="filterValue">Contains ${formattedFieldName}?</label>
          <select id="filterValue">
              <option value="true">Yes</option>
              <option value="false">No</option>
          </select>
      `;
   }

   // change the onaction ot be clearing the filters 
    const filterButton = document.getElementById("filter");
    filterButton.textContent = "Clear Filters";
    filterButton.onclick = clearFilters(); // Change the button's onclick to clearFilters

  }

function applyFilters() {
    const filterPanel = document.getElementById("filterPanel");
    filterPanel.close();

    const filterField = document.getElementById("filterField").value;
    const filterValue = document.getElementById("filterValue").value;

    // Fetch all bathrooms (assuming you have them stored in an array)
    fetchBathrooms().then((bathrooms) => {
        const filteredBathrooms = bathrooms.filter((bathroom) => {
            if (filterField === "cleanliness") {
                return bathroom.getCleanliness() >= parseInt(filterValue, 10);
            } else if (filterField === "handicapAccessible") {
                return bathroom.getHandicapAccesible() === (filterValue === "true");
            } else if (filterField === "genderNeutral") {
                return bathroom.getGenderNeutral() === (filterValue === "true");
            } else if (filterField === "babyChangingStation") {
                return bathroom.getBabyChangingStation() === (filterValue === "true");
            } else if (filterField === "notes") {
                return bathroom.getNotes().toLowerCase().includes(filterValue.toLowerCase());
            } else if (filterField === "location") {
                return bathroom.getAddress().toLowerCase().includes(filterValue.toLowerCase());
            }
            return true; // Default to include all bathrooms if no filter matches
        });

        updateMapWithFilteredBathrooms(filteredBathrooms);
    });
}

function updateMapWithFilteredBathrooms(filteredBathrooms) {
    // Clear existing pins from the map
    clearMapPins();

    // Add pins for the filtered bathrooms
    filteredBathrooms.forEach((bathroom) => {
        console.log("Bathroom Latitude:", bathroom.getbLatitude());
        console.log("Bathroom Longitude:", bathroom.getbLongitude());
        
        geocodeBathroom(bathroom); // Geocode the bathroom to get its coordinates
    });

    console.log("Filtered bathrooms displayed on the map:", filteredBathrooms);
}
                          
function clearFilters() {
  const filterButton = document.getElementById("filter");
  filterButton.textContent = "Filter"; 
  filterButton.onclick = updateFilterInput(); 

  clearMapPins();
  fetchBathrooms().then((bathrooms) => {
    bathrooms.forEach((bathroom) => {
        geocodeBathroom(bathroom); // Re-add all bathrooms to the map
    });
  });
}

function clearMapPins(){
pins.forEach(pin => {
    pin.setMap(null);
});
}

document.getElementById("filter").addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent the event from propagating
  updateFilterInput(); 
});

export{Bathroom, initMap, geocodeBathroom, addPinToMap, fetchBathrooms, map, makeAcRequest, replaceAllChars, refreshToken, updateFilterInput, applyFilters, clearFilters, updateMapWithFilteredBathrooms, clearMapPins};

  window.initMap = initMap;
  window.geocodeBathroom = geocodeBathroom;
  window.addPinToMap = addPinToMap;
  window.fetchBathrooms = fetchBathrooms;
  window.initAutocomplete = initAutocomplete;
  window.onPlaceSelected = onPlaceSelected;
  window.makeAcRequest = makeAcRequest;
  window.replaceAllChars = replaceAllChars;
  window.refreshToken = refreshToken;
  window.updateFilterInput = updateFilterInput;
  window.applyFilters = applyFilters;
  window.clearFilters = clearFilters;
  window.updateMapWithFilteredBathrooms = updateMapWithFilteredBathrooms;
  window.clearMapPins = clearMapPins;
  window.makeAcRequest = makeAcRequest;
    
  // TO DO: 
    // add hours of operation 
    // location services + directions to nearest bathroom
    // popout to view all bathrooms in a list
    // search by name 
    // mess arounf with margins 
         // more margin on bulleted lists, less margin on titles/headings 

  // add find nearest button to the floating panel at the bototm, and make clearFilters button replace filter button when filters are applied 