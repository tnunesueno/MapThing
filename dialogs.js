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

  function closeDialogAndDoJackShit(){
    const dialog = document.getElementById("myDialog");
    dialog.close();
    document.getElementById("location").value = ""; 
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

       newBathroom.setNotes(document.getElementById("notes").value);
       console.log("notes: "+newBathroom.notes);

    dialog.close();
    document.getElementById("location").value = ""; 
    //const fieldsPopulated = true; 
   // window.fieldsPopulated = fieldsPopulated; // this is a hacky way to get the value of the boolean to the other file
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
    openDialog(bathroom);
   
    return new Promise((resolve) => {
       
        window.currentBathroom = bathroom; // can give it to geocoding and close bathroom? 
        const dialog = document.getElementById("myDialog");
        const newBathroom = window.currentBathroom;

        dialog.addEventListener('close', 
            () => {

            const address = newBathroom.getAddress();
            console.log("address from text field: "+ address);
            geocodeBathroom(newBathroom);
            
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

               // WHY DO MY NOTES NOT WORK
               const notesField = document.getElementById("notes");
               if (notesField) {
                const notesValue = notesField.value;
                newBathroom.setNotes(notesValue);
                console.log("Notes:", notesValue);
            } else {
                console.error("Notes field not found in the DOM.");
            }

            document.getElementById("location").value = ""; 
            resolve(window.currentBathroom);
        },
        {once: true});
    });

   
}

function cancelAdd(){
    closeAddDialog();
    const dialog = document.getElementById("myDialog");
    dialog.close();
}

// making shit global?? didn't have to do this before 
window.openAddDialog = openAddDialog;
window.openDialog = openDialog;
window.closeDialog=closeDialog; 
window.closePopOut = closePopOut;
window.closeAddDialog=closeAddDialog; 
window.cancelAdd=cancelAdd; 
window.closeDialogAndDoJackShit = closeDialogAndDoJackShit; 
window.openDialogAndWait = openDialogAndWait; 

// export everything 
export {openAddDialog};
export{openDialog};
export{closeDialog};
export {closePopOut}; 
export {closeAddDialog}
export{openDialogAndWait}