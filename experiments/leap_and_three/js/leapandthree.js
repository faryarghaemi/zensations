var cube;




$(document).ready(function() {

var canvasElement = $("canvas")


var controller = new Leap.Controller();
controller.on("frame", function(frame){
    if(frame.pointables.length > 0)
    {
        canvasElement.width = canvasElement.width; //clear
        
        //Get a pointable and normalize the tip position
        var pointable = frame.pointables[0];
        var interactionBox = frame.interactionBox;
        var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);
        
        // Convert the normalized coordinates to span the canvas
        var canvasX = canvasElement.width * normalizedPosition[0];
        var canvasY = canvasElement.height * (1 - normalizedPosition[1]);
        //we can ignore z for a 2D context
        
        // displayArea.strokeText("(" + canvasX.toFixed(1) + ", " + canvasY.toFixed(1) + ")", canvasX, canvasY);
    }
});
controller.connect();
var position = function(x,y,z) { 
  // debugger;
  // console.log("X: " + x + " Y: " + y + " Z: " + z);

  cube.position.x = x + window.innerWidth; 

  cube.position.y = ( y - window.innerHeight / 2)  ;
  // cube.position.y = parseFloat(y  - window.innerHeight) + 500;

  cube.position.z = parseFloat(z);   
// debugger;
  // console.log(x, y, z); 
  
} 

  window.output = $('#output');
  Leap.loop({
      hand: function(hand) {
        var screenPosition = hand.screenPosition(hand.palmPosition);
        // debugger;
        console.log(hand.palmPosition);
        var outputContent = "x: " + (screenPosition[0].toPrecision(4)) + 'px' +
          "        <br/>y: " + (screenPosition[1].toPrecision(4)) + 'px' +
          "        <br/>z: " + (screenPosition[2].toPrecision(4)) + 'px';

        var el = document.elementFromPoint(
          hand.screenPosition()[0],
          hand.screenPosition()[1]
        );
        output.html(outputContent);

        var x = (hand.palmPosition[0].toPrecision(4));
        var y = (hand.palmPosition[1].toPrecision(4));
        var z = hand.palmPosition[2].toPrecision(4);


        position(x, y, z); 

      }

    })
    .use('screenPosition', {
      scale: 0.001

    });


  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  var geometry = new THREE.BoxGeometry(100, 100, 100);
  var material = new THREE.MeshBasicMaterial({
    color: 0xff00ff
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.x = -1; 
  camera.position.y = -1;
  camera.position.z = 1000; 



  var render = function() {
    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  render();

});
