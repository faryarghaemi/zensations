$(document).ready(function() {
    

  $('#spaceslug').on('click',function(){    
    if (frame && frame.length > 0) {
      spaceslugLeap(); 
      leapOrbitControls(); 
    } else {
      spaceslugMouse(); 
      mouseMovement(); 
      mouseOrbitControls(); 
    }
     
  });

  $('#discoattack').on('click',function(){ 
    if (frame && frame.length > 0) {
      discoattackLeap(); 
    } 
    // } else {
    //   discoattackMouse(); 
    // }
  });    


}); 