import { map } from './bathroomModel.js';

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
       console.error("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.warn("Latitude: " + position.coords.latitude +
        "\nLongitude: " + position.coords.longitude); 
     
    addUserToMap(position);  
} 

function showError(error) {
    console.error("Error occurred. Error code: " + error.code);
}

function addUserToMap(position){
const usermarker = new google.maps.Marker({
    position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    },
    map: map,
    title: "You are here!"
});
}

export { getLocation, showPosition, showError };