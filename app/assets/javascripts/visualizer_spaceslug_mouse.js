var renderer; 
var render; 
var camera; 
 spaceslugMouse = function() {
      if (music_playing === false) {
      frequencyAmplitudeArray = 0; 
      }

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
      $( ".visualizer" ).empty();
      $( ".visualizer" ).prepend(renderer.domElement);

      camera.position.z = 10;
      var ringCount = 0; //counter for rings
      var i = 0; //counter for hue
      var j = 0; //counter for freq channel

      // stars 

          for( var i = 0; i < 50; i ++ ){

          geometry = new THREE.Geometry();

          for( var j = 0 ; j < 100; j++ ){

            var vert = new THREE.Vector3();

            vert.x = ( Math.random() - .5 ) * 1000;
            vert.y = ( Math.random() - .5 ) * 1000;
            vert.z = ( Math.random() - .5 ) * 1000;

            geometry.vertices.push( vert );

          }

          // var color = new THREE.Color();
          // color.r = ( Math.random() * .5 ) +.5;
          // color.g = ( Math.random() * .5 ) +.5;
          // color.b = ( Math.random() * .5 ) +.5;

          var material = new THREE.ParticleSystemMaterial({
            size: 2, 
            color: 0x393E69
          });

          var particles = new THREE.ParticleSystem( geometry , material );

          scene.add(particles);

        }

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

        // Cycle through hues
        circle.material.color.setHSL(i%1, 0.7, 0.7);
        i += 0.0001;

        // Mouse interaction
        circle.position.x = 8 * (mousePosition.x / window.innerWidth - 0.5);
        circle.position.y = -8 * (mousePosition.y / window.innerHeight - 0.5);
        circle.position.z = 2;

        scene.traverse (function (object)
        {
          if (object instanceof THREE.Line) {
            // Reduce saturation of rings based on intensity
            var hsl = object.material.color.getHSL();
            var averageVolume = getAverageVolume(frequencyAmplitudeArray);
            var musicIntensity = averageVolume/255;
            object.material.color.setHSL(hsl.h, musicIntensity, hsl.l);

            // Move circle further back
            object.position.z -= 0.5 * musicIntensity ;

            // Pulse to the music
            // Dealing with small numbers because circles are very sensitive
            // to changes in size           
            var scaleFactor = frequencyAmplitudeArray[j % frequencyAmplitudeArray.length]/25500;
            object.scale.x *= 2 * scaleFactor + 1;
            object.scale.y *= 2 * scaleFactor + 1;
            j++;

            // Make objects in the distance darker
            object.material.color.offsetHSL(0,0, -0.002);
          };
        });

        // Don't add a new circle if music is not playing
        if (getAverageVolume(frequencyAmplitudeArray)) {
          scene.add( circle );
          ringCount++;
        };

        // Delete the last element. Could not use scene.traverse to do this
        // as it didn't like the object being deleted.
        for ( var k =  0; k < scene.children.length ; k++ ) {
            var obj = scene.children[ k ];
            if ( obj instanceof THREE.Line && ringCount > 300) {
              scene.remove(obj);
              ringCount--;
              break;
            }
        }

        renderer.render(scene, camera);
      };
    } 