function openDialog(bathroom){
    const dialog = document.getElementById("myDialog");
    dialog.showModal(); 

    // i think this makes it into a global variable so that it's values can be passed around 
    window.currentBathroom = bathroom;
 }

function openAddDialog (){
     const dialog = document.getElementById("addDialog");
     dialog.showModal();
}

// fix close dialog to do the bathroom thing with the names 
function closeDialog(){ 
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

// making shit global?? didn't have to do this before 
window.openAddDialog = openAddDialog;
window.openDialog = openDialog;
window.closeDialog=closeDialog; 

// export everything 
export {openAddDialog};
export{openDialog}
export{closeDialog}