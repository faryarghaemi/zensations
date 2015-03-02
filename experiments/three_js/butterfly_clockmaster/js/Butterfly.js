/ **
 * The main class.
 * /
function Main () {
    this.initialize (this, arguments);
}

/ **
 * [Constant] is the frame rate.
 * /
Main.FPS = 60;
/ **
 * [Constant] of the screen width (Unit: px) is.
 * /
Main.SCREEN_W = 465;
/ **
 * [Constant] height of the screen (unit: px) is.
 * /
Main.SCREEN_H = 465;

Main.prototype = {

    camera: null,
    scene: null,
    renderer: null,

    _wingLeft: null,
    _wingRight: null,
    _count: 0,
    _intervalId: 0,

    / **
     * Provides initialization.
     * /
    initialize: function () {
    / / ---------------------------------
    / / 3D Initialization
    / / ---------------------------------
    / / Initialize the camera
    this.camera = new THREE.Camera (60, Main.SCREEN_W / Main.SCREEN_H, 1, 10000);
    / / Initialize renderer
    this.renderer = new THREE.CanvasRenderer ();
    document.getElementById ("container"). appendChild (this.renderer.domElement); / / # container added
    this.renderer.setSize (Main.SCREEN_W, Main.SCREEN_H);
    / / 3D scene initialization
    this.scene = new THREE.Scene ();

    / / ---------------------------------
    / / Create content
    / / ---------------------------------
    / / Ground
    var mat = new THREE.MeshColorStrokeMaterial (0xe0e0e0, 1, 1);
    var plane = new THREE.Mesh (new Plane (1000, 1000, 10, 10), mat);
    plane.rotation.x = -90 * (Math.PI / 180);
    this.scene.addObject (plane);

    / / Butterfly
    / / "Create a butterfly's" wings material (PNG file for reading)
    var matL = this._loadImage ("http://clockmaker.jp/labs/101003_js_3d/imgs/butterfly_wind_r.png");
    var matR = this._loadImage ("http://clockmaker.jp/labs/101003_js_3d/imgs/butterfly_wind_l.png");

    / / Create a plane butterfly wings pasted
    this._wingLeft = new THREE.Mesh (new Plane (200, 200, 1, 1), matL);
    this._wingRight = new THREE.Mesh (new Plane (200, 200, 1, 1), matR);

    / / To use the matrix calculation, automatic updates are turned OFF
    this._wingLeft.autoUpdateMatrix = false;
    this._wingRight.autoUpdateMatrix = false;

    / / Add to the scene
    this.scene.addObject (this._wingLeft);
    this.scene.addObject (this._wingRight);
    }
    / **
     * Play.
     * /
    play: function () {
    / / Animation
    this._intervalId = setInterval (Delegate.create (this._intervalHandler, this), 1000 / Main.FPS);
    }
    / **
     * Stop.
     * /
    stop: function () {
    clearInterval (this._intervalId);
    }

    / **
     URL of the image * Create an instance of the Material.
     * @ Param {String} The URL of the image.
     * @ Return {THREE.MeshBitmapUVMappingMaterial} Materials
     * /
    _loadImage: function (path) {

    var canvas = document.createElement ('canvas');
    canvas.width = 32;
    canvas.height = 32;

    var material = new THREE.MeshBitmapUVMappingMaterial (canvas);

    var image = new Image ();
    image.onload = function () {
        material.bitmap = this;
    };
    image.src = path;

    return material;
    }

    / **
     * SetInterval is a handler.
     * /
    _intervalHandler: function () {

    / / Set Animation
    / / Left wing
    var ml = this._wingLeft.matrix;
    ml.identity ();
    ml.multiplySelf (THREE.Matrix4.translationMatrix (-100, Math.sin (this._count / 10) * -25 240, 0));
    ml.multiplySelf (THREE.Matrix4.translationMatrix (100, 0, 0));
    ml.multiplySelf (THREE.Matrix4.rotationZMatrix (Math.sin (this._count / 10) * 40 * Math.PI / 180));
    ml.multiplySelf (THREE.Matrix4.translationMatrix (-100, 0, 0));
    ml.multiplySelf (THREE.Matrix4.rotationXMatrix (-Math.PI / 2));

    / / Right wing
    var mr = this._wingRight.matrix;
    mr.identity ();
    mr.multiplySelf (THREE.Matrix4.translationMatrix (100, Math.sin (this._count / 10) * -25 240, 0));
    mr.multiplySelf (THREE.Matrix4.translationMatrix (-100, 0, 0));
    mr.multiplySelf (THREE.Matrix4.rotationZMatrix (Math.sin (this._count / 10) * -40 * Math.PI / 180));
    mr.multiplySelf (THREE.Matrix4.translationMatrix (100, 0, 0));
    mr.multiplySelf (THREE.Matrix4.rotationXMatrix (-Math.PI / 2));

    / / Camera motion
    this.camera.position.x = 500 * Math.sin (this._count / 80);
    this.camera.position.y = 700;
    this.camera.position.z = 500 * Math.cos (this._count / 80);

    / / Render
    this.renderer.render (this.scene, this.camera);

    / / Rentaringukaunto
    this._count;
    }
};

/ **
 * Delegate is a utility class that handles the transfer of the scope.
 * /
var Delegate = {
    / **
     * Create a transfer function scope.
     * @ Param func The function to execute
     * @ Param thisObj you transfer Scope
     * @ Return Function transfer functions have been
     * /
    create: function (func, thisObj) {
    var del = function () {
        return func.apply (thisObj, arguments);
    };
    / / Property information is defined as a function
    del.func = func;
    del.thisObj = thisObj;
    return del;
    }
};

var main = new Main ();
main.play ();