import {map} from './bathroomModel.js'; 
function openAddDialog (){
    closePopOut(); 
    const dialog = document.getElementById("addDialog");
    dialog.showModal();
}

function openDialog(bathroom){
    //document.getElementById("bathroomName").innerHTML = Bathroom.getName()
    const dialog = document.getElementById("myDialog");
    dialog.showModal(); 

    // i think this makes it into a global variable so that it's values can be passed around 
    window.currentBathroom = bathroom;
  }

function closeDialog(){ 

    const newBathroom = window.currentBathroom;
    const address = newBathroom.getAddress();
    console.log("address from text field: "+ address);
    geocodeBathroom(newBathroom);
    
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

       document.getElementById("notes").value = newBathroom.notes;
       console.log("notes: "+newBathroom.notes);

    dialog.close();
    document.getElementById("location").value = ""; 
}

function closeAddDialog(){
    const dialog = document.getElementById("addDialog");
    dialog.close();
    openDialog();
  }


function closePopOut() {
    document.getElementById("selectedBR").style.display = "none";
    map.setZoom(15);
  }


  function openDialogAndWait(bathroom) {
    closeAddDialog(); 
    return new Promise((resolve) => {
        // Open the dialog
        openDialog(bathroom);
        window.currentBathroom = bathroom; // can give it to closedialog
        const dialog = document.getElementById("myDialog");
        // Add an event listener for the "close" event
        dialog.addEventListener(
            "close", // in theory the fields will already be updated before this closes
            () => {
                resolve();
            },
            { once: true } // Ensure the listener is only triggered once
        );
    });
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
export {closeAddDialog}
export{openDialogAndWait}