var Cube = require("taquin.cube");
var Grid = require("taquin.grid");
var RotateTouch = require("taquin.rotate-touch");

var W = Math.min( window.innerWidth, window.innerHeight );
var H = W;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, W / H, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( W, H );
document.body.appendChild( renderer.domElement );


var selectedCube = null;
var nextSelectedCube = null;
var actions = [];

var mouse = { x: 0, y: 0 };
renderer.domElement.addEventListener('mousemove', function(event) {
    mouse.x = ( event.clientX / W ) * 2 - 1;
    mouse.y = - ( event.clientY / H ) * 2 + 1;
});
renderer.domElement.addEventListener('mousedown', function(event) {
    actions.push("MOUSEDOWN");
});
renderer.domElement.addEventListener('touchstart', function(event) {
    mouse.x = ( event.clientX / W ) * 2 - 1;
    mouse.y = - ( event.clientY / H ) * 2 + 1;
    actions.push("MOUSEDOWN");
});


var material, material2 = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    specular: 0x333333,
    shininess: 15,
    map: null,
    specularMap: null,
    normalMap: null
});

var light1 = new THREE.DirectionalLight( 0xdddddd, 0.8 );
var light2 = new THREE.DirectionalLight( 0x9999ff, 0.5 );
var group = new THREE.Group();

scene.add( group );
scene.add( light1 );
scene.add( light2 );

var grid = new Grid(3,3,3);
var x, y, z, cube;
for (x=0 ; x<3 ; x++) {
    for (y=0 ; y<3 ; y++) {
        for (z=0 ; z<3 ; z++) {
            if (x != 1 || y != 1 || z != 1) {
                cube = Cube(x, y, z);
                grid.cube(x, y, z, cube);
                group.add(cube);
            }
        }
    }
}
material = cube.material;

camera.position.z = 4.3;
light1.position.set(3,0,5);
light2.position.set(-1,2,4);
var time0 = Date.now();
group.rotation.x = 0;
group.rotation.y = 0;
group.rotation.z = 0;

var touch = new RotateTouch(renderer.domElement);

function render(time1) {
    var deltaTime = time1 - time0;
    touch.applyRotation(group, deltaTime);
    time0 = time1;
    touch.rotation.speedX *= .95;
    touch.rotation.speedY *= .95;

    if (!grid.anim(time1)) {
        if (touch.tap()) {
            var raycaster = new THREE.Raycaster();
            var vector = new THREE.Vector3( touch.x, touch.y, 1 ).unproject( camera );
            raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
            var intersects = raycaster.intersectObjects( group.children );
            var cube = intersects.length > 0 ? intersects[0].object : null;
            if (cube) {
                grid.tap(cube, time1);
            }
        }
    }

    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
requestAnimationFrame( render );
