// var controls;

$(document).ready(function() {

  // Visualisation selection
  tracksMenu.loadTracks();


  $('#spaceslug_mouse').on('click', function() {
    if (music_playing === true) {
    spaceslugMouse();
    mouseMovement();
    render(); 
    var controls = new THREE.OrbitControls(camera);
    controls.damping = 2;
  } else {
    alert('Please select a song first.'); 
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
    alert('Please select a song first.'); 
  }

  });


  $('#discoattack_leap').on('click', function() {
    if (music_playing === true) {
    discoattackLeap();
    render();
  } else {
    alert('Please select a song first.'); 
  }
  });

  $('#discoattack_mouse').on('click', function() {
    if (music_playing === true) {
    discoattackMouse();
    mouseMovement(); 
    render();
    var controls = new THREE.OrbitControls(camera);
    controls.damping = 2;
  } else {
    alert('Please select a song first.'); 
  }
  });

    discoattackMouse();
    mouseMovement(); 
    render();
    


  // Track selection

  

});
