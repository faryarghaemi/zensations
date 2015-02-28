$(document).ready(function() {

  // cube info 

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  var geometry = new THREE.BoxGeometry(50, 50, 50, 2, 2, 2);


  var material = new THREE.MeshBasicMaterial({
    color: 0x8796FF
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  var newColor;
  var cubeColor = function(newColor) {
    cube.material.color.setHex(newColor);
  };

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 500;


  var render = function() {

    requestAnimationFrame(render);

    cube.scale.y = (1 + frequencyAmplitudeArray[0] / 512);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  render();

  // end cube info 


  // initializing the canvas 
  var canvasElement = $("canvas")


  // initializing the controller 
  var controller = new Leap.Controller();
  controller.on("frame", function(frame) {
    if (frame.pointables.length > 0) {
      canvasElement.width = canvasElement.width; //clear

      //Get a pointable and normalize the tip position
      var pointable = frame.pointables[0];
      // setting the interaction box so it doesn't go outside of frame (i think i still need to clamp)
      var interactionBox = frame.interactionBox;
      // normalizing
      var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);

      // Convert the normalized coordinates to span the canvas (math in docs)
      var canvasX = canvasElement.width * normalizedPosition[0];
      var canvasY = canvasElement.height * (1 - normalizedPosition[1]);

      // don't know what the code below does 
      // displayArea.strokeText("(" + canvasX.toFixed(1) + ", " + canvasY.toFixed(1) + ")", canvasX, canvasY);
    }
  });

  // tells you with gestures you are using 
  var controller = Leap.loop({
    enableGestures: true
  }, function(frame) {
    if (frame.valid && frame.gestures.length > 0) {
      frame.gestures.forEach(function(gesture) {
        switch (gesture.type) {
          case "circle":
            // console.log("Circle Gesture");
            break;
          case "keyTap":
            // console.log("Key Tap Gesture");
            break;
          case "screenTap":
            // console.log("Screen Tap Gesture");
            break;
          case "swipe":
            console.log("Swipe Gesture");
            break;
        }
      });
    }

    // Display Gesture object data
    // also changing the color with swipe direction 
    if (frame.gestures.length > 0) {
      for (var i = 0; i < frame.gestures.length; i++) {
        var gesture = frame.gestures[i];
        if (gesture.type === "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if (isHorizontal) {
            if (gesture.direction[0] > 0) {
              var swipeDirection = "right";
              var newColor = 0xF5F29C;
              cubeColor(newColor);
            } else {
              var swipeDirection = "left";
              var newColor = 0xF53B84;
              cubeColor(newColor);
            }
          } else { //vertical
            if (gesture.direction[1] > 0) {
              var swipeDirection = "up";
              var newColor = 0xBC87FF;
              cubeColor(newColor);
            } else {
              var swipeDirection = "down";
              var newColor = 0xF5B89C;
              cubeColor(newColor);
            }
          }
          console.log(swipeDirection)
        }
      }
    }
  });


  // changing the cube position in relation to hand position 
  controller.connect();
  var position = function(x, y, z) {

    cube.position.x = (x + window.innerWidth);

    cube.position.y = (y - window.innerHeight / 2);

    cube.position.z = parseFloat(z);

  }

  window.output = $('#output');
  Leap.loop({
      hand: function(hand) {
        var screenPosition = hand.screenPosition(hand.palmPosition);
        var outputContent = "x: " + (screenPosition[0].toPrecision(4)) + 'px' +
          "        <br/>y: " + (screenPosition[1].toPrecision(4)) + 'px' +
          "        <br/>z: " + (screenPosition[2].toPrecision(4)) + 'px';

        output.html(outputContent);

        var x = (hand.palmPosition[0].toPrecision(4));
        var y = (hand.palmPosition[1].toPrecision(4));
        var z = (hand.palmPosition[2].toPrecision(4));

        position(x, y, z);

      }

    })
    .use('screenPosition', {
      scale: 200

    });




});
