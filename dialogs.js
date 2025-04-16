import {map} from './bathroomModel.js'; 
function openAddDialog (){
    const dialog = document.getElementById("addDialog");
    dialog.showModal();
}

function openDialog(bathroom){
    const dialog = document.getElementById("myDialog");
    dialog.showModal(); 

    // i think this makes it into a global variable so that it's values can be passed around 
    window.currentBathroom = bathroom;
  }

function closeDialog(){ 

    const bathroom = window.currentBathroom;
    const address = bathroom.getAddress();
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


function closePopOut() {
    document.getElementById("selectedBR").style.display = "none";
    map.setZoom(15);
  }

// making shit global?? didn't have to do this before 
window.openAddDialog = openAddDialog;
window.openDialog = openDialog;
window.closeDialog=closeDialog; 
window.closePopOut = closePopOut;

// export everything 
export {openAddDialog};
export{openDialog};
export{closeDialog};
export {closePopOut}; 