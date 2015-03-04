$(document).ready(function() {
    

  $('#spaceslug').on('click',function(){    
    if (frame.length > 0) {
      spaceslugLeap(); 
      leapOrbitControls(); 
    } else {
      spaceslugMouse(); 
      mouseMovement(); 
      mouseOrbitControls(); 
    }
     
  });

}); 