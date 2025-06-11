import { map } from './bathroomModel.js';
import { fetchBathrooms } from './firebase.js';

class User {
constructor(position){
    this.position = position;
    this.marker = null;
}
 
getPosition() {
    return this.position;
}
setPosition(position) {
    this.position = position;
}

getMarker() {
    return this.marker; 
}

setMarker(marker) {
    this.marker = marker;
}

}

class Distance{
constructor(user, bathroom, distance) {
    this.user = user;
    this.bathroom = bathroom;
    this.distance = distance; // distance in miles
}

getUser() {
    return this.user;   
} 

setUser(user) {
    this.user = user;
} 

getBathroom() {
    return this.bathroom;   
}

setBathroom(bathroom) {
    this.bathroom = bathroom;
}

getDistance() {
    return this.distance;   
}
setDistance(distance) {
    this.distance = distance;   
}

}

async function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
       console.error("Geolocation is not supported by this browser.");
    }
}

async function showPosition(position) {
    console.log("User Latitude: " + position.coords.latitude +
        "\nUser Longitude: " + position.coords.longitude); 
     
    const user = new User(position);
    const usermarker = new google.maps.Marker({
     position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
     },
    map: map,
    title: "You are here!"
});

window.user = user; // store the user object globally, this is kind of hacky
findNearestBathroom(user); // find the nearest bathroom after getting the user's location
return user; 
} 

function showError(error) {
    console.error("Error occurred. Error code: " + error.code);
}


async function findNearestBathroom(user) {
    console.log("Finding nearest bathroom...");
    const userLat = user.getPosition().coords.latitude;
    const userLon = user.getPosition().coords.longitude;
    
    const distances = [];
    const bathrooms = await fetchBathrooms(); 
    for (const bathroom of bathrooms) {
    const distance = distanceFormula(userLat, userLon, bathroom.getbLatitude(), bathroom.getbLongitude());
    if(distance==0) {
            console.warn(bathroom.getName()+ "has a distance of 0 miles");
        } 
        else {
        console.log(`Distance to ${bathroom.getName()}: ${distance} miles`);
        distances.push(new Distance(user, bathroom, distance));
        } 
    }

    // Sort distances in ascending order
    distances.sort((a, b) => a.distance - b.distance);
    console.log(distances);
    console.log("Nearest bathroom found: " + distances[0].getBathroom().getName() + " at a distance of " + distances[0].getDistance() + " miles");

    return distances[0].getBathroom(); // return the nearest bathroom
}

function distanceFormula(lat1, lon1, lat2, lon2) {
    
        let dLat = deg2rad((lat2 - lat1));
        let dLon = deg2rad((lon2 - lon1)); 
        const R = 3963.1; // Radius of the earth in miles   

        // haversine nonsense 
    const a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
         Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // convert to miles 
  return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export { getLocation, showPosition, showError, findNearestBathroom, distanceFormula, User };

window.findNearestBathroom = findNearestBathroom;
window.getLocation = getLocation;
window.showPosition = showPosition;
window.showError = showError;
window.User = User;
window.Distance = Distance;
