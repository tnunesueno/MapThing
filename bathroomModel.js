class Bathroom {
    constructor(streetAddress, bLatitude, bLongitude, cleanliness, handicapAccesible, babyChangingStation, genderNeutral) {
        this.streetAddress = streetAddress;
        this.bLatitude = bLatitude;
        this.bLongitude = bLongitude;
        this.cleanliness = cleanliness;
        this.handicapAccesible = handicapAccesible;
        this.babyChangingStation = babyChangingStation;
        this.genderNeutral = genderNeutral;
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
}
// the addresses are the only true values here. remember to find a way to populate the rest with real data and put it in info windows??
const bathroom1 = new Bathroom("207 S. Sydenham St",null, null, 10,true,false,true);
const bathroom2 = new Bathroom("2000 Sansom Street",null, null, 10, false, true, false);
const bathroom3 = new Bathroom("1937 Callowhill St", null, null, 10, true, false, true);
const bathroom4 = new Bathroom("7101 Emlen St", null, null, 10, false, true, false);
const bathroom5 = new Bathroom("923 Race St", null, null, 10, true, false, true);

var array = []; 
array.push(bathroom1);
array.push(bathroom2);
array.push(bathroom3);
array.push(bathroom4);
array.push(bathroom5);

// Initialize and add the map
let map;

async function initMap() {
  // The location of Philadelphia
  const position = { lat: 39.9526, lng: -75.1652 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const {InfoWindow} = await google.maps.importLibrary("maps")
  // The map, centered at Philadelphia
  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
}

initMap();

// work on this just taking any bathroom? 
function geocodeBathroom(Bathroom) {
       address = Bathroom.getAddress(); 
        console.log("geocode function called");
        
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
            const newBathroom = new Bathroom(address, null, null, null, null, null,null);
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
            // document.getElementById("location").reset(); not sure why this doesnt work, reet is not a func?
        }
        
    // to do: 
    // delete pin func 
    // add cleanliness etc when adding pin 
    // save to json 
    // only one infowindow at once? 
    // list view side pop out 
    // directions? 