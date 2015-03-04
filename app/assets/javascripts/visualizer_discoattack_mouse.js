// var sphere;
// var geometry;
// var sphereMaterials;
// var newColor;
// var sphereColor;
// var floorColor;
var render;
var renderer;
var camera;

discoattackMouse = function() {

  // scene & camera info 

  var scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // sphere info 

  var geometry = new THREE.SphereGeometry(40, 16, 16, 16);

  // setting sphereMaterials for sphere that changes color with gestures 
  var sphereMaterials = new THREE.MeshPhongMaterial({
    ambient: 0x030303,
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    shading: THREE.FlatShading
  });

  var newColor;
  var sphereColor = function(newColor) {
    sphere.material.color.setHex(newColor);
  };


  var createSphere = function() {
    var sphere = new THREE.Mesh(geometry, sphereMaterials);
    sphere.castShadow = true;
    return sphere;
  };

  sphere = createSphere();

  scene.add(sphere);




  // the light sources 
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0.2, 1, 0.2);
  directionalLight.castShadow = true;
  scene.add(directionalLight);


  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 0, 0.2);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, -1, 0.2);
  directionalLight.castShadow = true;
  scene.add(directionalLight);


  // floor
  var floorColor = function(r, g, b) {
    // var floor = scene.getObjectByName('floor');
    floor.material.color.setRGB(r, g, b);
  };

  var floorGeometry = new THREE.BoxGeometry(350, 1000, 2);
  var floorMaterial = new THREE.MeshPhongMaterial({
    ambient: 0x030303,
    color: 'rgb(227, 0, 31)',
    specular: 0x009900,
    shininess: 30,
    shading: THREE.FlatShading,
  });
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);


  floor.rotation.x = -1.5;
  floor.position.y = -100;
  floor.name = 'floor';

  scene.add(floor);




  // // floor color v2

  //   $(window).on('mousemove', function(event) {

  //   var red = Math.round((event.pageX / window.innerWidth) * 255);
  //   var green = Math.round((event.pageY / window.innerHeight) * 255);

  //   var pageZ = Math.sqrt(event.pageY * event.pageY + event.pageX * event.pageX)
  //   var innerZ = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight)
  //   var blue = Math.round(pageZ / innerZ * 255);


  //   floorColor(red, green, blue);


  // });


  // shadow 

  renderer.shadowMapEnabled = true;
  // renderer.shadowMapSoft = true;

  renderer.shadowCameraNear = 0;
  renderer.shadowCameraFar = 20;
  renderer.shadowCameraFov = 30;

  renderer.shadowMapBias = 0.0039;
  renderer.shadowMapDarkness = 0.5;
  renderer.shadowMapWidth = 1024;
  renderer.shadowMapHeight = 1024;

  floor.receiveShadow = true;

  // camera position 
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 500;

  // initializing the canvas 
  var canvasElement = $("canvas");

  // rendering the info 
  render = function() {
    if (music_playing === false) {
      frequencyAmplitudeArray = 0;
    }


    requestAnimationFrame(render);

    sphere.scale.y = (1 + frequencyAmplitudeArray[0] / 512);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

      // Mouse interaction
  sphere.position.x = 1000 * (mousePosition.x / window.innerWidth - 0.5);
  sphere.position.y = -1000 * (mousePosition.y / window.innerHeight - 0.5);
  sphere.position.z = 2;
  // debugger

    // floor color 

  var red = Math.round(((sphere.position.x / 40) / window.innerWidth) * 255);
  var green = Math.round(((sphere.position.y / 20) / window.innerHeight) * 255);

  var pageZ = Math.sqrt((sphere.position.y / 20) * (sphere.position.y / 20) + (sphere.position.x / 40) * (sphere.position.x / 40));
  var innerZ = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
  var blue = Math.round(pageZ / innerZ * 255);

  // the function below is to get the brightest colors for the floor 
  var colorResponse = function(color) {
    color = color * Math.PI / 2;
    return (0.8) * Math.sin(color) + 0.4;

  }

  var r = colorResponse(red);
  var g = colorResponse(green);
  var b = colorResponse(blue);


  floorColor(r, g, b);

    scene.traverse(function(objects) {
    if (objects instanceof THREE.Mesh && !(objects.name === 'floor')) {
      // Move objects further back
      objects.position.z -= 0.60;

      // Rotate objects
      objects.rotation.x += 0.01;
      objects.rotation.y += 0.01;
    };
  });

        // Delete the last element. Could not use scene.traverse to do this
        // as it didn't like the object being deleted
        for ( var k =  0; k < scene.children.length ; k++ ) {
            var obj = scene.children[ k ];
            if ( obj instanceof THREE.Mesh && obj.position.z < -1500 && ! (obj.name === 'floor')) {
              scene.remove(obj);
            }
        }



    renderer.render(scene, camera);
  };

  render();


  window.addEventListener("keydown", moveSomething, false);

  function moveSomething(e) {
    switch (e.keyCode) {
      case 65:
        var newColor = 0xF53B84;
        sphereColor(newColor);
        break;
      case 83:
        var newColor = 0xBC87FF;
        sphereColor(newColor);
        break;
      case 68:
        var newColor = 0x0F5B30;
        sphereColor(newColor);
        break;
      case 70:
        var newColor = 0xFFFF25;
        sphereColor(newColor);
        break;
      case 13:
        var drawsphere = function() {
          sphere = createSphere();
          scene.add(sphere);
        };
        drawsphere();
        _.debounce(drawsphere, 2000);
        break;
      case 18:
        var drawsphere = function() {
          var newColor = 0xdddddd;
          sphereColor(newColor);
          // break;
        }
    }

  };

  // stretching/squishing the disco ball 

  // window.addEventListener("keydown", keysPressed, false);
  // window.addEventListener("keyup", keysReleased, false);

  // var keys = [];

  // function keysPressed(e) {
  //     keys[e.keyCode] = true;

  //     // Comma + Period
  //     if (keys[188] && keys[190]) {
  //         sphere.scale.x = 5 * x; 
  //     }

  //     // Shift + Comma + Period
  //     if (keys[16] && keys[188] && keys[190]) {
  //         sphere.scale.x = x / 5; 

  //         // prevent default browser behavior
  //         e.preventDefault(); 
  //     }
  // }

  // function keysReleased(e) {
  //     // mark keys that were released
  //     keys[e.keyCode] = false;
  // }









};
