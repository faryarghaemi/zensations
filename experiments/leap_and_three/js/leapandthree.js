

$(document).ready(function() {

var position = function(x,y,z) { 
  debugger;
  cube.position.x += x; 
  cube.position.y += y;
  cube.position.z += z; 

  console.log(x, y, z); 
  
} 

  window.output = $('#output');
  Leap.loop({
      hand: function(hand) {
        var screenPosition = hand.screenPosition(hand.palmPosition);
        var outputContent = "x: " + (screenPosition[0].toPrecision(4)) + 'px' +
          "        <br/>y: " + (screenPosition[1].toPrecision(4)) + 'px' +
          "        <br/>z: " + (screenPosition[2].toPrecision(4)) + 'px';

        var el = document.elementFromPoint(
          hand.screenPosition()[0],
          hand.screenPosition()[1]
        );
        output.html(outputContent);

        position(screenPosition[0].toPrecision(4), screenPosition[1].toPrecision(4), screenPosition[2].toPrecision(4)); 

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


  var geometry = new THREE.BoxGeometry(10, 10, 10);
  var material = new THREE.MeshBasicMaterial({
    color: 0xff00ff
  });
  var cube = new THREE.Mesh(geometry, material);
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
