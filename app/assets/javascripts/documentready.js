$(document).ready(function() {
    

  $('#spaceslug').on('click',function(){    
    // if (frame.length > 0) {
    //   spaceslugLeap(); 
    //   leapOrbitControls(); 
    // } else {
    //   spaceslugMouse(); 
    //   mouseMovement(); 
    //   mouseOrbitControls(); 
    // }
    spaceslugLeap(); 
     
  });

  $('#discoattack').on('click',function(){ 
    if (frame.length > 0) {
      discoattackLeap(); 
    } 
    // } else {
    //   discoattackMouse(); 
    // }
  });    


}); 