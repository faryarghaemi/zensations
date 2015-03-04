$(document).ready(function() {


  $('#spaceslug_mouse').on('click', function() {
    spaceslugMouse();
    mouseMovement();
    render(); 
    // render().then(function () {
    //   controls = new THREE.OrbitControls(camera);
    //   controls.damping = 0.2;
    // }); 
    // mouseOrbitControls();

   
  });


  $('#spaceslug_leap').on('click', function() {
    spaceslugLeap();
    render();
    // leapOrbitControls();
  });

  $('#discoattack_leap').on('click', function() {
    discoattackLeap();
    render();
  });


});
