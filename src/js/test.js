var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var selectedCube = null;
var nextSelectedCube = null;
var actions = [];

var mouse = { x: 0, y: 0 };
renderer.domElement.addEventListener('mousemove', function(event) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});
renderer.domElement.addEventListener('mousedown', function(event) {
    actions.push("MOUSEDOWN");
});


var geometry = new THREE.BoxGeometry( .3, .3, .3 );
var material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0x333333,
    shininess: 15,
    map: null,
    specularMap: null,
    normalMap: null
});
var material2 = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    specular: 0x333333,
    shininess: 15,
    map: null,
    specularMap: null,
    normalMap: null
});

var light1 = new THREE.DirectionalLight( 0xdddddd, 0.8 );
var light2 = new THREE.DirectionalLight( 0xaaaaee, 0.5 );
var group = new THREE.Group();

scene.add( group );
scene.add( light1 );
scene.add( light2 );

var x, y, z, cube;
for (x=0 ; x<4 ; x++) {
    for (y=0 ; y<4 ; y++) {
        for (z=0 ; z<4 ; z++) {
            cube = new THREE.Mesh( geometry, material );
            cube.position.set((x - 1.5) * .3, (y - 1.5) * .3, (z - 1.5) * .3);
            group.add(cube);
        }
    }
}

camera.position.z = 3;
light1.position.set(3,0,5);
light2.position.set(-1,2,4);

function render(time) {
    group.rotation.x = time / 3000;
    group.rotation.y = time / 3111;

    var raycaster = new THREE.Raycaster();
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject( camera );
    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( group.children );
    
    nextSelectedCube = intersects.length > 0 ? intersects[0].object : null;
    if (selectedCube !== nextSelectedCube) {
        if (selectedCube) selectedCube.material = material;
        selectedCube = nextSelectedCube;
        if (selectedCube) selectedCube.material = material2;
    }
    
    while (actions.length > 0) {
        actions.pop();
        if (selectedCube) {
            group.remove(selectedCube);
        }
    }

    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
requestAnimationFrame( render );
