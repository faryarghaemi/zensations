// var controls;

$(document).ready(function() {

  // Visualisation selection
  tracksMenu.loadTracks();


  $('#spaceslug_mouse').on('click', function() {
    if (music_playing === true) {
    spaceslugMouse();
    mouseMovement();
    render(); 
    mouseOrbitControls();
  } else {
    alert('Select a song idiot.'); 
  }
  });


  $('#spaceslug_leap').on('click', function() {
    if (music_playing === true) {
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
  } else {
    alert('Select a song idiot.'); 
  }

  });


  $('#discoattack_leap').on('click', function() {
    if (music_playing === true) {
    discoattackLeap();
    render();
  } else {
    alert('Select a song idiot.'); 
  }
  });

  $('#discoattack_mouse').on('click', function() {
    if (music_playing === true) {
    discoattackMouse();
    mouseMovement(); 
    render();
    mouseOrbitControls(); 
  } else {
    alert('Select a song idiot.'); 
  }
  });

    discoattackMouse();
    mouseMovement(); 
    render();
    


  // Track selection

  

});
