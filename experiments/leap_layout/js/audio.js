// Music playing?

var music_playing = false;

// Browser support hacks

window.AudioContext = (function() {
  return window.webkitAudioContext ||
    window.AudioContext ||
    window.mozAudioContext;
})();

$(document).ready(function() {

  // Define default formUrl
  var formUrl = 'https://soundcloud.com/actuallygrimes/d-r-o-m-e-whoknoidontno';

  // Handle the form submit event to load the new URL
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formUrl = document.getElementById('input').value;
    searchSoundCloud(formUrl).then(createAudio);
    // Add error checking for empty/dudd form(URL)
  });

  // The AudioContext is the primary 'container' for all your audio node objects.
  try {
    audioContext = new webkitAudioContext();
  } catch (e) {
    alert('Web Audio API is not supported in this browser');
  };

  var searchSoundCloud = function(trackUrl) {
    var soundCloudUrl = 'http://api.soundcloud.com/resolve.json?';

    return $.getJSON(soundCloudUrl, {
      url: trackUrl,
      client_id: 'c6407cab6ee52bfb52b2dc922c512b07'
    })
  };

  var createAudio = function(result) {

    // Define sreamUrl
    var streamUrl = result.stream_url;

    // Creating an Audio object.
    var audio0 = new Audio(),
      source,
      // `stream_url` you'd get from 
      // requesting http://api.soundcloud.com/tracks/165133010.json
      url = streamUrl + '?client_id=c6407cab6ee52bfb52b2dc922c512b07';

    audio0.src = url;
    audio0.controls = true;
    audio0.autoplay = false;
    audio0.loop = true;

    // Passing the Audio object into the sourceNode.
    var sourceNode = audioContext.createMediaElementSource(audio0);

    // Initalising the Analyser Node object.
    var analyserNode = audioContext.createAnalyser();
    // Setting the bin count (number of data bands).
    analyserNode.fftSize = 1024; // Must be ** 2, and min 32.
    //
    analyserNode.smoothingTimeConstant = 0.7; //
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
    // Note that this is a global
    frequencyAmplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);

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
      javascriptNode.onaudioprocess = function() {
          // Get the Time Domain data for this sample
          analyserNode.getByteFrequencyData(frequencyAmplitudeArray);
        }
        // Render in three.js
      render();
      // controls = new THREE.OrbitControls( camera );
      // controls.damping = 0.2;

      controls = new THREE.LeapTwoHandControls(camera, controller, scene);

      controls.translationSpeed = 0.1;
      controls.translationDecay = 0.3;
      controls.scaleDecay = 0.5;
      controls.rotationSlerp = 0.8;
      controls.rotationSpeed = 0.01;
      controls.pinchThreshold = 0.8;
      controls.transSmoothing = 0.5;
      controls.rotationSmoothing = 0.2;
      animate();
    });

    // Stop sound & visualise
    $("#stop").on('click', function() {
      audio0.pause();
      audio0.currentTime = 0;
      music_playing = false;

    });
  };

});
