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

          }); }

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
              document.getElementById("title").innerHTML = Bathroom.getName();
              document.getElementById("address").innerHTML = Bathroom.getAddress();
              document.getElementById("cleanlinessText").innerHTML = `Cleanliness: ${Bathroom.getCleanliness()}`;
              document.getElementById("handicap").innerHTML = `Handicap Accessible: ${Bathroom.getHandicapAccesible()}`;
              document.getElementById("genderNeutral").innerHTML = `Gender Neutral: ${Bathroom.getGenderNeutral()}`;
              document.getElementById("babyChanging").innerHTML = `Baby Changing Station: ${Bathroom.getBabyChangingStation()}`;
              popOut.style.display = "block"; // Show the popOut element

              });
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

    var Addy = place.formattedAddress;
    Addy = Addy = replaceAllChars(Addy, ",", ""); // remove commas
    Addy = Addy = replaceAllChars(Addy, "  ", " ");   // remove double spaces (shouldnt be any)
    
    const sequence = " PA";
    let index = Addy.indexOf(sequence); // should return an int for index
    console.log(`First occurrence at index: ${index}`);
    Addy = Addy.substring(0, index); // does chop at PA -> avoids postal code weirdness
    document.getElementById("location").value = Addy;
    console.log("addy minus pa and zip: "+ Addy);

    // Create a new Bathroom object and set its name field
    const newBathroom = new Bathroom(place.displayName, Addy, null, null, null, null, null, null, null);
    console.log("New Bathroom created with name: " + newBathroom.getName());

    // Proceed with geocoding and adding the bathroom to the map and array
    geocodeBathroom(newBathroom);
    array.push(newBathroom);
  } // send NAME to addpintoaddress with an html element?? 
 
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

  document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("location");
    if (input) {
      input.addEventListener("focus", initAutocomplete);
    }
  });

function openAddDialog(){
  const addDialog = document.getElementById("addDialog");
  addDialog.showModal();
}




    function openDialog(bathroom){
      const dialog = document.getElementById("myDialog");
      dialog.showModal(); 
  
      // i think this makes it into a global variable so that it's values can be passed around 
      window.currentBathroom = bathroom;
    }

    
  document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("addButton");
    if (input) {
      input.addEventListener("click", openAddDialog);
    }
  });

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