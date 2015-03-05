// var controls;

$(document).ready(function() {


  $('#spaceslug_mouse').on('click', function() {
    spaceslugMouse();
    mouseMovement();
    render(); 
    mouseOrbitControls();
  });


  $('#spaceslug_leap').on('click', function() {
    spaceslugLeap();

    controls = new THREE.LeapTwoHandControls(camera, controller, scene);

    controls.translationSpeed = 0.1;
    controls.translationDecay = 0.3;
    controls.scaleDecay = 0.5;
    controls.rotationSlerp = 0.8;
    controls.rotationSpeed = 0.01;
    controls.pinchThreshold = 0.8;
    controls.transSmoothing = 0.5;
    controls.rotationSmoothing = 0.2;
    render();

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
