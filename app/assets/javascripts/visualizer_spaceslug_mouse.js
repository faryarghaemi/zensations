var renderer; 
var render; 
var camera; 
 spaceslugMouse = function() {
    

      var currentXrot = 0; 
      var currentYrot = 0; 
      var getAverageVolume = function(array) {
        var values = 0;
        var average;

        var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }

        average = values / length;
        return average;
      }

      var scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 1000 );

      renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );

      document.body.appendChild( renderer.domElement );

      camera.position.z = 10;
      var ballCount = 0; //counter for spheres
      var i = 0; //counter for hue
      var j = 0; //counter for freq channel

     render = function () {
        // Throttle frame rate
        setTimeout( function() {
          requestAnimationFrame( render );
        }, 1000 / 30 );

        // Define circle
        var radius   = 2,
        segments = 64,
        material = new THREE.LineBasicMaterial( { color: 0xFFFFFF } ),
        geometry = new THREE.CircleGeometry( radius, segments );
        // Remove center vertex
        geometry.vertices.shift();
        // to work with MeshBasicMaterial
        var circle = new THREE.Line( geometry, material )

        // Rotate rings
        circle.rotation.x = currentXrot;
        circle.rotation.y = currentYrot;
        currentXrot += 0.1;
        currentYrot += 0.01;

        // Setting colour twice - Ineffient
        // You can do this directly without pusher - see setHSL in three.js
        var color = pusher.color('hsv', [Math.round(i), 70, 100]).hex6();
        circle.material.color.setHex( color );
        i += 0.1;

        // Mouse interaction
        circle.position.x = 8 * (mousePosition.x / window.innerWidth - 0.5);
        circle.position.y = -8 * (mousePosition.y / window.innerHeight - 0.5);
        circle.position.z = 2;

        scene.traverse (function (object)
        {
          if (object instanceof THREE.Line) {

            var sensitivity = 1
            
            // Cycle through colours
            var hsl = object.material.color.getHSL();
            // var averageVolume = getAverageVolume(frequencyAmplitudeArray);
            // var musicIntensity = Math.pow(averageVolume/255, sensitivity);
            // object.material.color.setHSL(hsl.h, musicIntensity, hsl.l);

            // Move circle further back
            object.position.z -= 0.5 ;

            // Pulse to the music
            // Dealing with small numbers because circles are very sensitive
            // to changes in size           
            // var scaleFactor = frequencyAmplitudeArray[j % frequencyAmplitudeArray.length]/25500;
            // object.scale.x *= scaleFactor + 0.996;
            // object.scale.y *= scaleFactor + 0.996;
            // j++;

            // Make objects in the distance darker
            object.material.color.offsetHSL(0,0, -0.002);

          };
        });

        // Don't add a new circle if music is not playing
        // if (getAverageVolume(frequencyAmplitudeArray)) {
          scene.add( circle );
        //   ballCount++;
        // };

        // Delete the last element. Could not use scene.traverse to do this
        // as it didn't like the object being deleted
        for ( var k =  0; k < scene.children.length ; k++ ) {
            var obj = scene.children[ k ];
            if ( obj instanceof THREE.Line && obj.position.z < -10) {
              scene.remove(obj);
            }
        }

        renderer.render(scene, camera);
      };
    } 