// Music playing?

var music_playing = false;

// Browser support hacks

window.AudioContext = (function(){
  return  window.webkitAudioContext ||
          window.AudioContext       ||
          window.mozAudioContext;
})();

$(document).ready(function() {

  // The AudioContext is the primary 'container' for all your audio node objects.
  try {
      audioContext = new webkitAudioContext();
  } catch(e) {
      alert('Web Audio API is not supported in this browser');
  };

  // ------------------------- Three.js Stuff -------------------------

  var scene = new THREE.Scene();
  var width = window.innerWidth * 0.03;
  var height = window.innerHeight * 0.05;
  var camera = new THREE.OrthographicCamera( 0, width, height / 2, height / - 2, 1, 10 );
  scene.add( camera );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.SphereGeometry( 1, 24, 24 );
  var material = new THREE.MeshBasicMaterial( { color: 0xFF3456, wireframe: true } );

  for ( var i = 8; i > 0; i -- ) {
    var sphere = new THREE.Mesh( geometry, material );

    var myPosition = (i + 1) * 3
    sphere.position.x += myPosition;

    var myScale = 1.1 * (i + 1);
    sphere.scale.y *= myScale;

    scene.add( sphere );
  }

  camera.position.z = 10;

  var render = function () {
    requestAnimationFrame( render );

    if (music_playing) {
      console.log(frequencyAmplitudeArray);
    };

    // index of frequencies array
    var j = 0;

    scene.traverse (function (object)
    {
        if (object instanceof THREE.Mesh)
        {
          object.rotation.y += 0.005;
          if (music_playing) {
            object.scale.y = (j + 1) * (1 + frequencyAmplitudeArray[j]/512)
            j++
          };
        };
    });

    renderer.render(scene, camera);
  };

  render();

  // ------------------------- End three.js -------------------------

  // Creating an Audio object.
  var audio0 = new Audio();
  audio0.src = 'assets/feeling_good.mp3';
  audio0.controls = true;
  audio0.autoplay = false;
  audio0.loop = true;

  // Passing the Audio object into the sourceNode.
  var sourceNode = audioContext.createMediaElementSource(audio0);

  // Initalising the Analyser Node object.
  var analyserNode = audioContext.createAnalyser();
  // Setting the bin count (number of data bands).
  analyserNode.fftSize = 32; // Must be ** 2, and min 32.
  //
  analyserNode.smoothingTimeConstant = 0.0; //
  // number of samples to collect before analyzing data.
  sampleSize = 1024

  // Creates a ScriptProcessorNode used for direct audio processing.
  var javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);


  // Connecting the nodes
    /// AnalyserNode needs to be connected to both the destination (speakers)!
    /// Javascript node needs to be connected from the analyserNode and to the
    /// destination!
  sourceNode.connect(analyserNode);
  analyserNode.connect(javascriptNode);
  analyserNode.connect(audioContext.destination);
  javascriptNode.connect(audioContext.destination);


  // Uint8Array = Unsigned Integer 8bit byte Array
  // Values between 0-255 will be pushed into this array
  // Which represent -1 to +1 (in audio terms)
  var frequencyAmplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);

  // Copies the current time-domain (waveform) data into the passed frequencyAmplitudeArray.
  var getFrequencies = function() {
    analyserNode.getByteFrequencyData(frequencyAmplitudeArray);
    return frequencyAmplitudeArray;
  };

  // Play sound & visualise
  $("#start").on('click', function() {
    music_playing = true;
    audio0.play();
    // An event listener which is called periodically for audio processing.
    javascriptNode.onaudioprocess = function () {
      // Get the Time Domain data for this sample
      analyserNode.getByteFrequencyData(frequencyAmplitudeArray);
    }
  });

  // Stop sound & visualise
  $("#stop").on('click', function() {
    audio0.pause();
    audio0.currentTime = 0;
    music_playing = false;
  });

});

