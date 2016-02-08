var Cube = require("taquin.cube");
var Grid = require("taquin.grid");
var HollowCube = require("taquin.hollow-cube");
var RotateTouch = require("taquin.rotate-touch");

var W = Math.min( window.innerWidth, window.innerHeight );
var H = W;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 35, W / H, 0.1, 1000 );
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

var hollow = HollowCube(3);
var hole = createHole();
grid.setHole( hole );
hollow.add(hole);
var grpA = new THREE.Group();
grpA.add(group);
var grpB = new THREE.Group();
grpB.add(hollow);

grpA.position.set(-.2, .2, -.5);
grpB.position.set(1.7, -1.7, 1);
grpB.scale.set(.3,.3,.3);

scene.add( grpA );
scene.add( grpB );

camera.position.z = 9;
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
    touch.applyRotation(hollow, deltaTime);
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



function createHole(s) {
    if (typeof s === 'undefined') s = .5;

    var colors = [
        new THREE.Color(0,1,0),
        new THREE.Color(0,1,1),
        new THREE.Color(0,0,1),
        new THREE.Color(1,0,0),
        new THREE.Color(1,1,0),
        new THREE.Color(1,0,1)
    ];
    var geo = new THREE.Geometry();
    geo.vertices.push(
        new THREE.Vector3( s, s, s),
        new THREE.Vector3( s, s,-s),
        new THREE.Vector3(-s, s,-s),
        new THREE.Vector3(-s, s, s),
        new THREE.Vector3( s,-s, s),
        new THREE.Vector3( s,-s,-s),
        new THREE.Vector3(-s,-s,-s),
        new THREE.Vector3(-s,-s, s)
    );
    [
        [0,1,2,3], [0,4,5,1], [1,5,6,2], [2,6,7,3], [0,3,7,4], [4,7,6,5]
    ].forEach(function (vertices, idx) {
        var face1 = new THREE.Face3( vertices[0], vertices[1], vertices[2] );
        var face2 = new THREE.Face3( vertices[0], vertices[2], vertices[3] );
        face1.vertexColors[0] = face1.vertexColors[1] = face1.vertexColors[2] = colors[idx];
        face2.vertexColors[0] = face2.vertexColors[1] = face2.vertexColors[2] = colors[idx];
        geo.faces.push( face1, face2 );
    });

    geo.computeFaceNormals ();
    geo.computeVertexNormals ();
    
    var mat = new THREE.MeshPhongMaterial({
        specular: 0x111111,
        shininess: 2,
        vertexColors: THREE.VertexColors        
    });

    return new THREE.Mesh( geo, mat );
}
