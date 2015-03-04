$(document).ready(function() {


  $('#spaceslug_mouse').on('click', function() {
    spaceslugMouse();
    mouseMovement();
    render(); 
    mouseOrbitControls();
  });


  $('#spaceslug_leap').on('click', function() {
    spaceslugLeap();
    render();
    leapOrbitControls();
  });

  $('#discoattack_leap').on('click', function() {
    discoattackLeap();
    render();
  });

    $('#discoattack_mouse').on('click', function() {
    discoattackMouse();
    mouseMovement(); 
    render();
    mouseOrbitControls(); 
  });


});
