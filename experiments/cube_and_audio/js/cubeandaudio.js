var cube;
var geometry;
var cubeMaterials;
$(document).ready(function() {

  // cube info 

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.BoxGeometry(50, 50, 50, 2, 2, 2);

  // each cube side gets another color
  var cubeMaterials = [
    new THREE.MeshBasicMaterial({
      color: 0x33AA55,
      transparent: true,
      opacity: 0.8
    }),
    new THREE.MeshBasicMaterial({
      color: 0x55CC00,
      transparent: true,
      opacity: 0.8
    }),
    new THREE.MeshBasicMaterial({
      color: 0x669999,
      transparent: true,
      opacity: 0.8
    }),
    new THREE.MeshBasicMaterial({
      color: 0x801515,
      transparent: true,
      opacity: 0.8
    }),
    new THREE.MeshBasicMaterial({
      color: 0xD49A6A,
      transparent: true,
      opacity: 0.8
    }),
    new THREE.MeshBasicMaterial({
      color: 0x55AA55,
      transparent: true,
      opacity: 0.8
    }),
  ];

  // setting cubeMaterials for multi-colored cube 
  // var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterials);

  // setting cubeMaterials for cube that changes color with gestures 
  var cubeMaterials = new THREE.MeshBasicMaterial({
    color: 0x8796FF
  });

  var newColor;
  var cubeColor = function(newColor) {
    cube.material.color.setHex(newColor);
  };

  cube = new THREE.Mesh(geometry, cubeMaterials);

  scene.add(cube);

  // debugger;
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

  // info for number of fingers and hands 

  function concatData(id, data) {
    return id + ": " + data + "<br>";
  }

  function getFingerName(fingerType) {
    switch (fingerType) {
      case 0:
        return 'Thumb';
        break;

      case 1:
        return 'Index';
        break;

      case 2:
        return 'Middle';
        break;

      case 3:
        return 'Ring';
        break;

      case 4:
        return 'Pinky';
        break;
    }
  }

  function concatJointPosition(id, position) {
    return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
  }


  var output_two = document.getElementById('output_two');
  var frameString = "",
    handString = "",
    fingerString = "";
  var hand, finger;

  // Leap.loop uses browser's requestAnimationFrame
  var options = {
    enableGestures: true
  };

  // hand and finger info put on screen 
  // Main Leap Loop
  // var handNumber = function() {
  //   Leap.loop(options, function(frame) {
  //     frameId = frame.id;
  //     frameHandsLength = frame.hands.length;
  //     frameFingersLength = frame.fingers.length;

  //     frameString = concatData("frame_id", frameId);
  //     frameString += concatData("num_hands", frameHandsLength);
  //     frameString += concatData("num_fingers", frameFingersLength);
  //     frameString += "<br>";

  //     // Showcase some new V2 features
  //     for (var i = 0, len = frame.hands.length; i < len; i++) {
  //       hand = frame.hands[i];
  //       handString = concatData("hand_type", hand.type);
  //       handString += concatData("confidence", hand.confidence);
  //       handString += concatData("pinch_strength", hand.pinchStrength);
  //       handString += concatData("grab_strength", hand.grabStrength);

  //       handString += '<br>';

  //       frameString += handString;
  //       frameString += fingerString;
  //     }

  //     output_two.innerHTML = frameString;

  //   });

  // };

  // handNumber();

  // end of info for number of fingers and hands 



  // initializing the controller 
  var deviceLoopController = new Leap.Controller({
    frameEventName: 'deviceFrame'
  });
  deviceLoopController.on("frame", function(frame) {
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
      displayArea.strokeText("(" + canvasX.toFixed(1) + ", " + canvasY.toFixed(1) + ")", canvasX, canvasY);
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
            // console.log("Swipe Gesture");
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
          // console.log(swipeDirection)
        }
      }
    }
  });


  // changing the cube position in relation to hand position 
  controller.connect();
  var position = function(x, y, z) {


    cube.position.x = parseFloat(x);

    cube.position.y = parseFloat(y) - window.innerHeight / 2;

    cube.position.z = parseFloat(z);


  }

  window.outputRight = $('#outputRight');
  window.outputLeft = $('#outputLeft');
  Leap.loop({
      hand: function(hand, frame) {
        // debugger;
        if (hand.type === "right") {
          var screenPositionRight = hand.screenPosition(hand.palmPosition);
          // var outputContentRight = "xRight: " + (screenPositionRight[0].toPrecision(4)) + 'px' +
          //   "        yRight: " + (screenPositionRight[1].toPrecision(4)) + 'px' +
          //   "        zRight: " + (screenPositionRight[2].toPrecision(4)) + 'px';

          // outputRight.html(outputContentRight);


        } else if (hand.type === "left") {

          var screenPositionLeft = hand.screenPosition(hand.palmPosition);
          // var outputContentLeft = "xLeft: " + (screenPositionLeft[0].toPrecision(4)) + 'px' +
          //   "        yLeft: " + (screenPositionLeft[1].toPrecision(4)) + 'px' +
          //   "        zLeft: " + (screenPositionLeft[2].toPrecision(4)) + 'px';

          // outputLeft.html(outputContentLeft);


        }


        var frame = controller.frame();

        // creating more cubes with grab strength 
        // console.log(hand.grabStrength); 

        if (hand.grabStrength >= 0.90 && hand.confidence >= 0.40) {
          cube = new THREE.Mesh(geometry, cubeMaterials);
          scene.add(cube);

        }

        scene.traverse(function(cube) {
          if (cube instanceof THREE.Mesh) {
            // Move cube further back
            cube.position.z -= 0.20;

            // Rotate cubes
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
          };
        });

        



        // differentiates between one hand and two hands 

        if (frame.hands.length === 2) {
          var xFirstHand = (parseFloat(frame.hands[0].palmPosition[0].toPrecision(4)));

          var xSecondHand = (parseFloat(frame.hands[1].palmPosition[0].toPrecision(4)));

          var x = (((xFirstHand) + (xSecondHand)) / 2);

          var yFirstHand = (parseFloat(frame.hands[0].palmPosition[1].toPrecision(4)));
          var ySecondHand = (parseFloat(frame.hands[1].palmPosition[1].toPrecision(4)));

          var y = ((yFirstHand) + (ySecondHand) / 2);

          var zFirstHand = (parseFloat(frame.hands[0].palmPosition[2].toPrecision(4)));
          var zSecondHand = (parseFloat(frame.hands[1].palmPosition[2].toPrecision(4)));

          var z = ((zFirstHand) + (zSecondHand) / 2);

          position(x, y, z);


          // var previousFrame = controller.frame(150);
          // var handScale = hand.scaleFactor(previousFrame);
          // cube.scale.x = handScale;

          // console.log("Hand Scale: " + handScale);

          var previousFrame = controller.frame(150);
          var frameScale = frame.scaleFactor(previousFrame);
          cube.scale.x = frameScale;

          // console.log("Frame Scale: " + frameScale);


        } else if (frame.hands.length === 1) {

          var x = (hand.palmPosition[0].toPrecision(4));
          var y = (hand.palmPosition[1].toPrecision(4));
          var z = (hand.palmPosition[2].toPrecision(4));


          position(x, y, z);


        }


      }

    })
    .use('screenPosition', {
      scale: 100

    });



  // initializing the canvas 
  var canvasElement = $("canvas");



});
