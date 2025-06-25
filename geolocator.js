import { map, bathroomArray, Bathroom } from './bathroomModel.js';
import { fetchBathrooms } from './firebase.js';
import { enableDialogClose } from './dialogs.js';

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

let locationAllowed = false; // global variable to track if location is allowed
async function getLocation(){
	return new Promise((resolve, reject) => {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(async (position) => {
			const user = new User(position);
			window.user = user; // store the user object globally, this is kind of hacky
			locationAllowed = true; 
			window.locationAllowed = locationAllowed; 
		resolve(position);
		return position; 
		}, (error) => {
			showError(error);
			reject(error); 
		});

	} else {
		// i know this isnt the logic thats running when users reject location perms 
	   console.error("Geolocation is not supported by this browser.");
	   reject(new Error("Geolocation is not supported by this browser."));
	}
}); 
}

const pinSize = window.innerWidth <= 768 ? 64 : 47; // Larger size for mobile (<=768px)
// not sure if js will be happy if i make it WORD but i htink it works like this 
let userMarker = new google.maps.Marker({
	position: null, // will be updated later
	title: "You are here", 
	icon: {
		url: "./pee-removebg-preview (1).png", // path to your icon
		scaledSize: new google.maps.Size(pinSize, pinSize) // default size, will be updated later
	},
});

async function addUserMarker() {
	if(navigator.geolocation){
		navigator.geolocation.watchPosition(async (position) => {
			
			// resetting attributes of existing marker instead of creating a new one 
			userMarker.scaledSize = new google.maps.Size(pinSize, pinSize);
			userMarker.setPosition({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});

			userMarker.setMap(map);

			if (window.user){
				console.log("window user exists, updating position");
				window.user.setPosition(position);
			} else {
				const user = new User(position);
				window.user = user; // store the user object globally
			}
		}, 
		(error) => {
			showError(error);
		});  
	} else {
		console.error("Geolocation is not supported by this browser.");
	   reject(new Error("Geolocation is not supported by this browser."));
	}
}

function showError(error) {
    console.error("Error occurred. Error code: " + error.code);
}


async function findNearestBathroom() {
	if (locationAllowed == true){
		user = window.user; // get the user object from the global scope
		console.log("Finding nearest bathroom...");
		const userLat = user.position.coords.latitude;
		const userLon = user.position.coords.longitude;
		
		const distances = [];
		const bathrooms = bathroomArray;
		for (const bathroom of bathrooms) {
		const distance = distanceFormula(userLat, userLon, bathroom.getbLatitude(), bathroom.getbLongitude());
		if(distance==0) {
				console.warn(bathroom.getName()+ "has a distance of 0 miles");
			} 
			else {
			distances.push(new Distance(user, bathroom, distance));
			} 
		}

		// Sort distances in ascending order
		distances.sort((a, b) => a.distance - b.distance);
		console.log(distances);
		console.log("Nearest bathroom found: " + distances[0].getBathroom().getName() + " at a distance of " + distances[0].getDistance() + " miles");

		const nearestBathroom = distances[0].getBathroom();
		openNearestBathroom(nearestBathroom); // open the nearest bathroom
		return nearestBathroom; 
	} else {
		console.warn("Location not allowed, cannot find nearest bathroom.");
		const warning = document.getElementById("locationWarning"); 
		warning.showModal(); 
		enableDialogClose(warning); 
	}
}

async function specificDistance(bathroom){
	let SD = null; // default value for specific distance
	const thisUser = window.user; // get the user object from the global scope
	if(!thisUser) {
		console.error("User object is not defined, cannot calculate distance.");
		return;
	}
	// i def need to keep better track of my users 
	const userLat = thisUser.getPosition().coords.latitude;
	const userLon = thisUser.getPosition().coords.longitude;

	SD = await distanceFormula(userLat, userLon, bathroom.getbLatitude(), bathroom.getbLongitude());
	console.warn("Specfic distance for bathroom" + bathroom.getName() + " is" + SD);
	SD = SD.toFixed(2); // round to 2 decimal places
	return SD;
}

async function openNearestBathroom(bathroom){
	const pin = bathroom.getPin();

	console.log("Opening nearest bathroom, this is hte pin: ", pin);
	google.maps.event.trigger(pin, 'click');
}

// mathy shit below here 
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

export { getLocation, showError, findNearestBathroom, distanceFormula, User, addUserMarker, Distance, specificDistance };

window.findNearestBathroom = findNearestBathroom;
window.getLocation = getLocation;
window.showError = showError;
window.User = User;
window.Distance = Distance;