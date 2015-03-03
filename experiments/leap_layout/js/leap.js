var controller; 
var frame; 
$(document).ready(function() {


// normalizing the coordinates 

  var leapCoordinates = document.getElementById('lmCoordinates');
  var normalizedCoordinates = document.getElementById('normalizedCoordinates');
  var windowCoordinates = document.getElementById('windowCoordinates');

  // var circlePosition; 

  var controller = Leap.loop(function(frame) {
    var frame = controller.frame();
    var interactionBox = frame.interactionBox;

    if (frame.pointables.length > 0) {
      //Leap coordinates
      var tipPosition = frame.pointables[0].tipPosition;
      // leapCoordinates.innerText = vectorToString(tipPosition, 1);

      //Normalized coordinates
      var normalizedPosition = interactionBox.normalizePoint(tipPosition, true);
      // normalizedCoordinates.innerText = vectorToString(normalizedPosition, 4);

      //Pixel coordinates in current window
      var windowPosition = [normalizedPosition[0] * window.innerWidth,
        window.innerHeight - (normalizedPosition[1] * window.innerHeight),
        0
      ];
      // debugger
      // windowCoordinates.innerText = vectorToString(windowPosition, 0);
      var windowPositionX = parseInt(windowPosition[0]);
      var windowPositionY = parseInt(windowPosition[1]); 

      circlePosition(windowPositionX, windowPositionY); 

    }



  });



  function vectorToString(vector, digits) {
    if (typeof digits === "undefined") {
      digits = 1;
    }
    return "(" + vector[0].toFixed(digits) + ", " + vector[1].toFixed(digits) + ", " + vector[2].toFixed(digits) + ")";
  }
  

});
