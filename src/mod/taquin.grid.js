/***************************************

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
Grid.prototype.anim = function(time) {
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
console.log(cx, cy, cz);
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
console.info("[taquin.grid] vect=...", vect);
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
