var require = function() {
    var modules = {};
    
    return function(id, body) {
        var mod;
        body = window["#" + id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(exports, mod);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
}();
function addListener(e,l) {
    if (window.addEventListener) {
        window.addEventListener(e,l,false);
    } else {
        window.attachEvent('on' + e, l);
    }
};

addListener(
    'DOMContentLoaded',
    function() {
        document.body.parentNode.$data = {};
        // Attach controllers.
        APP = require('main');
setTimeout(function (){if(typeof APP.start==='function')APP.start()});
    }
);



//########################################
window['#$']=function(exports,module){  exports.config={
    name:"webgl-experiments",
    description:"WebGL experiments",
    author:"Tolokoban",
    version:"0.0.180",
    major:0,
    minor:0,
    revision:180,
    date:new Date(2016,1,8,9,39,36)
};
var currentLang = null;
exports.lang = function(lang) {
    if (lang === undefined) {
        lang = window.localStorage.getItem("Language");
        if (!lang) {
            lang = window.navigator.language;
            if (!lang) {
                lang = window.navigator.browserLanguage;
                if (!lang) {
                    lang = "fr";
                }
            }
        }
        lang = lang.substr(0, 2).toLowerCase();
    }
    currentLang = lang;
    window.localStorage.setItem("Language", lang);
    return lang;
};
exports.intl = function(words, params) {
    var dic = words[exports.lang()],
    k = params[0],
    txt, newTxt, i, c, lastIdx, pos;
    if (!dic) {
        //console.error("Missing internationalization for language : \"" + exports.lang() + "\"!");
        return k;
    }
    txt = dic[k];
    if (!txt) {
        //console.error("Missing internationalization [" + exports.lang() + "]: \"" + k + "\"!");
        return k;
    }
    if (params.length > 1) {
        newTxt = "";
        lastIdx = 0;
        for (i = 0 ; i < txt.length ; i++) {
            c = txt.charAt(i);
            if (c === '$') {
                newTxt += txt.substring(lastIdx, i);
                i++;
                pos = txt.charCodeAt(i) - 48;
                if (pos < 0 || pos >= params.length) {
                    newTxt += "$" + txt.charAt(i);
                } else {
                    newTxt += params[pos];
                }
                lastIdx = i + 1;
            } else if (c === '\\') {
                newTxt += txt.substring(lastIdx, i);
                i++;
                newTxt += txt.charAt(i);
                lastIdx = i + 1;
            }
        }
        newTxt += txt.substr(lastIdx);
        txt = newTxt;
    }
    return txt;
};
 }


//########################################
window['#main']=function(exports,module){ var _intl_={"en":{"welcome":"Welcome in the world of"},"fr":{"welcome":"Bienvenue dans le monde de"}},_$=require("$").intl;function _(){return _$(_intl_, arguments);}
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
 }


//########################################
window['#taquin.rotate-touch']=function(exports,module){  var MOUSEDOWN = 1;
var TOUCHSTART = 2;

var X_AXIS = new THREE.Vector3(1,0,0);
var Y_AXIS = new THREE.Vector3(0,1,0);

/**
 * Deal with touch/mouse gestures to make an object rotate.
 *
 * @param canvas {canvas} - the canvas on with we will attach touch/mouse events.
 * @param mesh {THREE.Mesh} - the object to rotate according to gestures.
 */
var RotateTouch = function(canvas) {
    var that = this;
    this.x = 0;
    this.y = 0;
    this._tap = false;
    this.rotation = { speedX: Math.random() * .01, speedY: Math.random() * .01 };
    var status = 0;
    var timeTouchStart = 0;
    var time0 = 0;
    canvas.addEventListener("touchstart", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        status = TOUCHSTART;
        timeTouchStart = time0 = Date.now();
        var touches = evt.changedTouches;
        if (touches.length > 0) {
            that.x = ( touches[0].clientX / canvas.width ) * 2 - 1;
            that.x0 = that.x;
            that.y = -( touches[0].clientY / canvas.height ) * 2 + 1;
            that.y0 = that.y;
        }
        // Stop rotation as soon as the user touches the screen.
        that.rotation.speedX = that.rotation.speedY = 0;
    });
    canvas.addEventListener("touchend", function(evt) {
        if (status != TOUCHSTART) return;
        evt.preventDefault();
        evt.stopPropagation();
        var deltaTime = Date.now() - timeTouchStart;
        if (deltaTime > 400) return;
        var x, y;
        var touches = evt.changedTouches;
        if (touches.length > 0) {
            x = ( touches[0].clientX / canvas.width ) * 2 - 1;
            y = -( touches[0].clientY / canvas.height ) * 2 + 1;
        }
        var dis = Math.max(Math.abs(that.x0 - x), Math.abs(that.y0 - y));
        if (dis > 0.05) return;
        that._tap = true;
    });
    canvas.addEventListener("touchmove", function(evt) {
        if (status != TOUCHSTART) return;
        evt.preventDefault();
        var touches = evt.changedTouches;
        var x, y;
        if (touches.length > 0) {
            x = ( touches[0].clientX / canvas.width ) * 2 - 1;
            y = -( touches[0].clientY / canvas.height ) * 2 + 1;
            var time1 = Date.now();
            var deltaTime = Math.max(0.001, time1 - time0);
            that.rotation.speedY = (x - that.x) / deltaTime;
            that.rotation.speedX = (y - that.y) / deltaTime;
            that.x = x;
            that.y = y;
            time0 = time1;
        }
    });

    canvas.addEventListener("mousedown", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        status = MOUSEDOWN;
        timeTouchStart = time0 = Date.now();
        that.x = ( evt.clientX / canvas.width ) * 2 - 1;
        that.x0 = that.x;
        that.y = -( evt.clientY / canvas.height ) * 2 + 1;
        that.y0 = that.y;
        // Stop rotation as soon as the user touches the screen.
        that.rotation.speedX = that.rotation.speedY = 0;
    });
    canvas.addEventListener("mouseup", function(evt) {
        if (status != MOUSEDOWN) return;
        status = 0;
        evt.preventDefault();
        evt.stopPropagation();
        var deltaTime = Date.now() - timeTouchStart;
        if (deltaTime > 400) return;
        var x, y;
        x = ( evt.clientX / canvas.width ) * 2 - 1;
        y = -( evt.clientY / canvas.height ) * 2 + 1;
        var dis = Math.max(Math.abs(that.x0 - x), Math.abs(that.y0 - y));
        if (dis > 0.05) return;
        that._tap = true;
    });
    canvas.addEventListener("mousemove", function(evt) {
        if (status != MOUSEDOWN) return;
        evt.preventDefault();
        var touches = evt.changedTouches;
        var x, y;
        x = ( evt.clientX / canvas.width ) * 2 - 1;
        y = -( evt.clientY / canvas.height ) * 2 + 1;
        var time1 = Date.now();
        var deltaTime = Math.max(0.001, time1 - time0);
        that.rotation.speedY = (x - that.x) / deltaTime;
        that.rotation.speedX = (y - that.y) / deltaTime;
        that.x = x;
        that.y = y;
        time0 = time1;
    });
};


/**
 * @return void
 */
RotateTouch.prototype.applyRotation = function(mesh, deltaTime) {
    var angX = this.rotation.speedX * deltaTime;
    var angY = -this.rotation.speedY * deltaTime;
    var Cx = Math.cos(angX);
    var Sx = Math.sin(angX);
    var Cy = Math.cos(angY);
    var Sy = Math.sin(angY);
    mesh.matrixAutoUpdate = false;
    var rotation = new THREE.Matrix4();
    var e = rotation.elements;
    e[0]  = Cy;      e[1]  = 0;      e[2]  = Sy;      e[3]  = 0;
    e[4]  = Sx*Sy;   e[5]  = Cx;     e[6]  = -Cy*Sx;  e[7]  = 0;
    e[8]  = -Cx*Sy;  e[9]  = Sx;     e[10] = Cx*Cy;   e[11] = 0;
    e[12] = 0;       e[13] = 0;      e[14] = 0;       e[15] = 1;

    mesh.matrix = rotation.multiply( mesh.matrix );
};


/**
 * @return void
 */
RotateTouch.prototype.tap = function() {
    if (this._tap) {
        this._tap = false;
        return true;
    }
    return false;
};


module.exports = RotateTouch;
 }


//########################################
window['#taquin.hollow-cube']=function(exports,module){  module.exports = function(side) {
    if (typeof side === 'undefined') side = 1;

    var grp = new THREE.Group();

    var mat1 = new THREE.LineBasicMaterial({ color: new THREE.Color(.5,.5,.5), linewidth: 1 });
    var mat0 = new THREE.LineBasicMaterial({ color: new THREE.Color(.1,.1,.1), linewidth: 1 });
    var a, b;
    var i, j;
    var c = side/2;
    var line;
    var mat;
    for ( i=0 ; i<4 ; i++ ) {
        a = (i - 1.5) * c / 1.5;
        for ( j=0 ; j<4 ; j++ ) {
            b = (j - 1.5) * c / 1.5;
            if ( (i == 0 || i == 3) && (j == 0 || j == 3) ) {
                mat = mat1;
            } else {
                mat = mat0;
            }
            line = new THREE.Geometry();
            line.vertices.push(
                new THREE.Vector3(a, b, -c),
                new THREE.Vector3(a, b, c)
            );
            grp.add( new THREE.Line( line, mat ) );
            line = new THREE.Geometry();
            line.vertices.push(
                new THREE.Vector3(a, -c, b),
                new THREE.Vector3(a, c, b)
            );
            grp.add( new THREE.Line( line, mat ) );
            line = new THREE.Geometry();
            line.vertices.push(
                new THREE.Vector3(-c, a, b),
                new THREE.Vector3(c, a, b)
            );
            grp.add( new THREE.Line( line, mat ) );
        }
    }
    return grp;
};
 }


//########################################
window['#taquin.grid']=function(exports,module){  /***************************************

 ***************************************/

var ANIM_SCALE = 1;
var ANIM_MOVE = 2;


var Grid = function(dx, dy, dz) {
    this._cubes = [];
    for (var loop = 0 ; loop < dx*dy*dz ; loop++) {
        this._cubes.push(null);
    }
    this._dx = dx;
    this._dy = dy;
    this._dz = dz;
    this._anim = {
        start: 0,
        end: 0,
        cube: null,
        type: 0,
        x0: 0, x1: 0,
        y0: 0, y1: 0,
        z0: 0, z1: 0
    };
};


/**
 * @return void
 */
Grid.prototype.setHole = function( hole ) {
    this._hole = hole;
};


/**
 * @return void
 */
Grid.prototype.anim = function(time) {
    var hole = this._hole;
    var anim = this._anim;
    if (!anim.cube) return false;
    var dur = anim.end - anim.start;
    if (anim.type == ANIM_SCALE) {
        if (time >= anim.end) {
            // End of animation. Set the scale to 1.
            anim.cube.scale.x = 1;
            anim.cube.scale.y = 1;
            anim.cube.scale.z = 1;
            anim.cube = null;
        } else {
            var scale = 1 - .5 * Math.sin(Math.PI * (time - anim.start) / dur);
            anim.cube.scale.x = anim.cube.scale.y = anim.cube.scale.z = scale;
        }
    } else {
        if (time >= anim.end) {
            // End of animation. Set the to target position.
            anim.cube.position.x = anim.x1;
            anim.cube.position.y = anim.y1;
            anim.cube.position.z = anim.z1;
            anim.cube = null;
        } else {
            anim.cube.position.x = anim.x0 + (anim.x1 - anim.x0) * (time - anim.start) / dur;
            anim.cube.position.y = anim.y0 + (anim.y1 - anim.y0) * (time - anim.start) / dur;
            anim.cube.position.z = anim.z0 + (anim.z1 - anim.z0) * (time - anim.start) / dur;
        }
        if (hole) {
            if (time >= anim.end) {
                // End of animation. Set the to target position.
                hole.position.x = anim.x0;
                hole.position.y = anim.y0;
                hole.position.z = anim.z0;
                hole = null;
            } else {
                hole.position.x = anim.x1 + (anim.x0 - anim.x1) * (time - anim.start) / dur;
                hole.position.y = anim.y1 + (anim.y0 - anim.y1) * (time - anim.start) / dur;
                hole.position.z = anim.z1 + (anim.z0 - anim.z1) * (time - anim.start) / dur;
            }
        }
    }
    return true;
};


/**
 * @return void
 */
Grid.prototype.tap = function(cube, time) {
    var coords = this.find(cube);
    if (!coords) return;
    var cx = coords.x;
    var cy = coords.y;
    var cz = coords.z;
    var x = cube.position.x;
    var y = cube.position.y;
    var z = cube.position.z;
    var vect = null;
    if (this.cube(cx + 1, cy + 0, cz + 0) === null) {
        vect = [1,0,0];
    }
    else if (this.cube(cx - 1, cy + 0, cz + 0) === null) {
        vect = [-1,0,0];
    }
    else if (this.cube(cx + 0, cy + 1, cz + 0) === null) {
        vect = [0,1,0];
    }
    else if (this.cube(cx + 0, cy - 1, cz + 0) === null) {
        vect = [0,-1,0];
    }
    else if (this.cube(cx + 0, cy + 0, cz + 1) === null) {
        vect = [0,0,1];
    }
    else if (this.cube(cx + 0, cy + 0, cz - 1) === null) {
        vect = [0,0,-1];
    }
    if (!vect) {
        this._anim = {
            cube: cube,
            type: ANIM_SCALE,
            start: time,
            end: time + 300
        };
    } else {
        this._anim = {
            cube: cube,
            type: ANIM_MOVE,
            start: time,
            end: time + 300,
            x0: x, y0: y, z0: z,
            x1: x + vect[0], y1: y + vect[1], z1: z + vect[2]
        };
        this.cube(cx + vect[0], cy + vect[1], cz + vect[2], cube);
        this.cube(cx, cy, cz, null);
        console.info("[taquin.grid] this._anim=...", this._anim);
    }
};


/**
 * @return void
 */
Grid.prototype.cube = function(x, y, z, cube) {
    var index = Math.floor(x + y * this._dx + z * this._dx * this._dy);
    if (index < 0 || index >= this._cubes.length) return undefined;
    if (typeof cube === 'undefined') return this._cubes[index];
    this._cubes[index] = cube;
    return this;
};


/**
 * @return void
 */
Grid.prototype.find = function(cube) {
    var x, y, z;
    for (z=0 ; z<this._dz; z++) {
        for (y=0 ; y<this._dy; y++) {
            for (x=0 ; x<this._dx; x++) {
                if (cube === this.cube(x, y, z)) return { x: x, y: y, z: z };
            }
        }
    }
    return null;
};


module.exports = Grid;
 }


//########################################
window['#taquin.cube']=function(exports,module){  var TEXTURE_SIDE = 128;


module.exports = function(x, y, z) {
    var color = "#" + (x > 0 ? '77' : 'ff') + (y > 0 ? '77' : 'ff') + (z > 0 ? '77' : 'ff');
    var materials = [
        // Left
        createMaterial(
            [
                "abcdefghi".charAt(z + 3*y),
                " ",
                "IHGFEDCBA".charAt(z + 3*y)
            ][x],
            ["#0ff", "#8bb", "#0bb"][x]),
        // Right
        createMaterial(
            [
                "IHGFEDCBA".charAt(2 - z + 3*y),
                " ",
                "abcdefghi".charAt(2 - z + 3*y)
            ][x],
            ["#f00", "#b44", "#b00"][x]),
        // Up
        createMaterial(
            [
                "ihgfedcba".charAt(x + 3*z),
                " ",
                "ABCDEFGHI".charAt(x + 3*z)
            ][y],
            ["#0f0", "#4b4", "#0b0"][y]),
        // Down
        createMaterial(
            [
                "IHGFEDCBA".charAt(2 - x + 3*z),
                " ",
                "abcdefghi".charAt(2 - x + 3*z)
            ][y],
            ["#f0f", "#b8b", "#b0b"][y]),
        // Back
        createMaterial(
            [
                "abcdefghi".charAt(2 - x + 3*y),
                " ",
                "IHGFEDCBA".charAt(2 - x + 3*y)
            ][z],
            ["#ff0", "#bb8", "#bb0"][z]),
        // Front
        createMaterial(
            [
                "IHGFEDCBA".charAt(x + 3*y),
                " ",
                "abcdefghi".charAt(x + 3*y)
            ][z],
            ["#00f", "#44b", "#00b"][z])
    ];
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 ),
        new THREE.MeshFaceMaterial( materials )
    );

    mesh.position.set(x - 1, y - 1, z - 1);
    return mesh;
};




function createCanvas(text, color) {
    var canvas = document.createElement("canvas");
    var W = TEXTURE_SIDE, H = TEXTURE_SIDE;
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
    ctx.font = 'Bold ' + Math.floor(W * 3 / 4) + 'px Arial';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.fillText(text, W / 2, H / 2);

    return canvas;
}

function createTexture(text, color) {
    var texture = new THREE.Texture(  createCanvas(text, color) );
    texture.needsUpdate = true;
    return texture;
}

function createBump(text) {
    var canvas = document.createElement("canvas");
    var W = TEXTURE_SIDE, H = TEXTURE_SIDE;
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#777";
    ctx.fillRect(1, 1, W - 2, H - 2);
    var shift = Math.random() * canvas.width * 2 - canvas.width;
    var x = Math.min(-shift, 0);
    var color = Math.floor(122 + Math.random() * 4);
    while (x < Math.max(canvas.width, canvas.width - shift)) {
        ctx.strokeStyle = "rgb(" + color + "," + color + "," + color + ")";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + shift, W);
        ctx.stroke();
        x += 2 + Math.random() * 5;
    }
    ctx.font = 'Bold ' + Math.floor(W * 3 / 4) + 'px Arial';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255, 255, 255, .3)";
    var x, y;
    for (y = -2 ; y < 3 ; y++) {
        for (x = -2 ; x < 3 ; x++) {
            ctx.fillText(text, W / 2 + x, H / 2 + y);
        }
    }

    var texture = new THREE.Texture(  canvas );
    texture.needsUpdate = true;
    return texture;
}

function createMaterial(text, color) {
    return new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 25,
        transparent: true,
        opacity: .6,
        map: createTexture(text, color),
        specularMap: null,
        bumpMap: createBump(text)
    });
}
 }
