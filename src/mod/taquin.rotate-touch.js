var MOUSEDOWN = 1;
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
