function onResize(element, callback) {
  var height = element.clientHeight;
  var width  = element.clientWidth;
  
  return setInterval(function() {
      if (element.clientHeight != height || element.clientWidth != width) {
        height = element.clientHeight;
        width  = element.clientWidth;
        callback();
      }
  }, 500);
}
var canvas = document.getElementById('canvas'); 
var renderer = new THREE.WebGLRenderer({canvas: canvas});
cameraTarget = new THREE.Vector3( 0, -0.25, 0 );
canvas.width  = canvas.clientWidth;
canvas.height = canvas.clientHeight;
renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);

var scene = new THREE.Scene();
scene.background = new THREE.Color( "rgb(0, 0, 255)" );

var camera = new THREE.PerspectiveCamera(35, canvas.clientWidth/canvas.clientHeight, 1, 15);
camera.position.z = 4;

var loader = new THREE.STLLoader();
var spindle = new THREE.Object3D();
loader.load( './models/wheel.stl', function ( geometry ) {

  var material2 = new THREE.MeshPhongMaterial( { color: 0x111111, specular: 0x111111, shininess: 200 } );
  spindle = new THREE.Mesh( geometry, material2 );

  spindle.position.set( 0, 0.3, 0);
  spindle.rotation.set( 0,0 ,Math.PI / 2 ); //- Math.PI / 2
  spindle.scale.set( 0.005, 0.005, 0.005 );

  spindle.castShadow = false;
  spindle.receiveShadow = false;

  scene.add( spindle );

} );


var light = new THREE.DirectionalLight(0xffffff, 0.55);
light.position.set(0, 0, 1);
scene.add(light);

onResize(canvas, function () {
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
});
var render = function () {
  requestAnimationFrame( render );
  // spindle.rotation.x += 0.01;
  spindle.rotation.y += 0.01;
  
  var timer = Date.now() * 0.0005;
  renderer.render(scene, camera);
};
render();
