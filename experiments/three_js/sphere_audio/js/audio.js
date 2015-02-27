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
    audio0.play();
    // An event listener which is called periodically for audio processing.
    javascriptNode.onaudioprocess = function () {
      // Get the Time Domain data for this sample
      analyserNode.getByteFrequencyData(frequencyAmplitudeArray);
      // Draw..
      requestAnimFrame(drawFrequencyDomain);
    }
  });

  // Stop sound & visualise
  $("#stop").on('click', function() {
    audio0.pause();
    audio0.currentTime = 0;
    clearCanvas();
  });

  // Setting the canvas width & height.
  var canvasWidth  = 512;
  var canvasHeight = 256;

  // Ninja'd code, not too sure on the inner workings, but this is what draws the data in the frequencyAmplitudeArray by iterating through each bin.
  function drawFrequencyDomain() {
    clearCanvas();
    for (var i = 0; i < frequencyAmplitudeArray.length; i++) {
      ctx.fillStyle = '#000000';
      var y = canvasHeight - Math.round(frequencyAmplitudeArray[i]);
      ctx.fillRect(i,0,1,y);
    }
  }

  function clearCanvas() {
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
});

