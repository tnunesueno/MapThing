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
const bathroom1 = new Bathroom("207 S. Sydenham St Philadelphia PA USA",10,true,false,true);
const bathroom2 = new Bathroom("2000 Sansom Street Philadelphia PA USA", 10, false, true, false);
const bathroom3 = new Bathroom("1937 Callowhill St Philadelphia PA USA", 10, true, false, true);
const bathroom4 = new Bathroom("7101 Emlen St Philadelphia PA USA", 10, false, true, false);
const bathroom5 = new Bathroom("923 Race St Philadelphia PA USA", 10, true, false, true);

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
            } 
            console.log("BATHROOM LAT " + Bathroom.bLatitude + "BATHROOM LONG " + Bathroom.bLongitude);

            pin = new google.maps.marker.AdvancedMarkerElement({
                position: {lat: latitude, lng: longitude},
                map: map,
                title: Bathroom.getAddress(),
                gmpClickable: true,
            }); 
            
           addPinToMap(latitude, longitude);

          }); 
        }

        for (let i = 0; i < array.length; i++) {
            geocodeBathroom(array[i]);
        }

        function addBathroomFromAddress(address) {
            console.log("addBathroomFromAddress function called");
            const newBathroom = new Bathroom(address + "Philadelphia PA USA", 0, 0, 0, 0, 0, 0);
         //   geocodeBathroom(newBathroom);
            array.push(newBathroom);

            for (let i = 0; i < array.length; i++) {
                geocodeBathroom(array[i]);
            }
        }

        function addPinToMap(lat, lng) {
            console.log("addPinToMap function called");
            pin = new google.maps.marker.AdvancedMarkerElement({
                position: {lat: lat, lng: lng},
                map: map,
                title: "New Bathroom",
            });
        }

        pin.addListener('click', ({ domEvent, latLng }) => {
            const { target } = domEvent;
            infoWindow.close();
            infoWindow.setContent(marker.title);
            infoWindow.open(marker.map, marker);
            });   
        
        // this doesn't work. look into how to actually push the coordinates to the object.
        async function updateBathroomCoordinates(Bathroom) {
            console.log("updateBathroomCoordinates function called");
            const { bLatitude, bLongitude } = await geocodeBathroom(Bathroom);
            Bathroom.setbLatitude(bLatitude);
            Bathroom.setbLongitude(bLongitude);
        }