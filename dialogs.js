import {map} from './bathroomModel.js'; 
import { writeOneBr } from './firebase.js';
function openAddDialog (){
    closePopOut(); 
    const dialog = document.getElementById("addDialog");
    dialog.showModal();
}

function openDialog(bathroom){
    //document.getElementById("bathroomName").innerHTML = Bathroom.getName()
    const dialog = document.getElementById("myDialog");
    dialog.showModal(); 
    enableDialogClose(dialog); 

    const bathroomNameEl = document.getElementById("bathroomName");
    if (bathroomNameEl) {
        bathroomNameEl.innerHTML = bathroom.getName() || "Bathroom Details"; // Display name
    }

    // not sure if these clear automatically because its a form now - handle during cleanup? 
    const notesField = document.getElementById("notes");  
    notesField.value = ""; 
    const handicapAccesible = document.getElementById("HandicapAccesible");
    handicapAccesible.checked = false
    const genderNeutral = document.getElementById("GenderNeutral");
    genderNeutral.checked = false
    const babyChanging = document.getElementById("BabyChanging");
    babyChanging.checked = false

    // i think this makes it into a global variable so that it's values can be passed around 
    window.currentBathroom = bathroom;
  }

  function closeDialogAndDoJackShit(){
    const dialog = document.getElementById("myDialog");
    dialog.close();
    document.getElementById("location").value = ""; 
  }

document.getElementById("brFields").addEventListener("submit", function(event) {

    event.preventDefault(); 
    
    const newBathroom = window.currentBathroom;
    const address = newBathroom.getAddress();
    console.log("address from text field: "+ address);
    
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
       
       // all this trying to identify where it breaks down
       const notesField = document.getElementById("notes");
       let notesText = ""; // turns out let allows you to change it later on
       if (notesField) {
       notesText = notesField.value;
       } else {
        console.error("Notes field not found in the DOM.");
       }
         if (notesText) {
       newBathroom.setNotes(notesText);
         } else {
            console.error("Notes text not found in textField.");
            newBathroom.setNotes("");
         }

    console.log("notes: "+newBathroom.getNotes());
    writeOneBr(newBathroom);
    dialog.close();
    document.getElementById("location").value = ""; // not sure if this is even needed 
}); 

function closeAddDialog(){
    const dialog = document.getElementById("addDialog");
    dialog.close();
    openDialog();
  }


function closePopOut() {
    const popOut = document.getElementById("selectedBR");
    popOut.classList.remove('visible');
    map.setZoom(15);
  }

function cancelAdd(){
    closeAddDialog();
    const dialog = document.getElementById("myDialog");
    dialog.close();
}

function enableDialogClose(dialogElement) {
  console.log("Dialog opened, enabling close on backdrop click");
  const backdropClickHandler = (event) => {
    if (event.target === dialogElement) {
      dialogElement.close();
      console.log("Backdrop clicked, closing dialog");
    }
  };

  dialogElement.addEventListener("click", backdropClickHandler);

 // gets rid of this nonsense when the dialog actually is closed 
  const closeEventHandler = () => {
    console.log("Dialog closed from backdrop click");
    dialogElement.removeEventListener("click", backdropClickHandler);
    dialogElement.removeEventListener("close", closeEventHandler);
  };
  
  dialogElement.addEventListener("close", closeEventHandler);
}

// making shit global?? didn't have to do this before 
window.openAddDialog = openAddDialog;
window.openDialog = openDialog;
window.closePopOut = closePopOut;
window.closeAddDialog=closeAddDialog; 
window.cancelAdd=cancelAdd; 
window.closeDialogAndDoJackShit = closeDialogAndDoJackShit; 

// export everything 
export {openAddDialog};
export{openDialog};
export {closePopOut}; 
export {closeAddDialog}
export{enableDialogClose}