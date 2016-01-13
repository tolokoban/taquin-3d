


module.exports = function(x, y, z) {
    var color = "#" + (x > 0 ? '77' : 'ff') + (y > 0 ? '77' : 'ff') + (z > 0 ? '77' : 'ff');
    var materials = [
        // Left
        createMaterial(
            "L", //"ABCDEFGHI".charAt((x+y+z) % 9),
            color),
        // Right
        createMaterial(
            "R", //"ABCDEFGHI".charAt((x+y+z) % 9),
            color),
        // Up
        createMaterial(
            "U", //"ABCDEFGHI".charAt((x+y+z) % 9),
            color),
        // Down
        createMaterial(
            "D", //"ABCDEFGHI".charAt((x+y+z) % 9),
            color),
        // Back
        createMaterial(
            "B", //"ABCDEFGHI".charAt((x+y+z) % 9),
            color),
        // Front
        createMaterial(
            "F", //"ABCDEFGHI".charAt((x+y+z) % 9),
            ["#f80", "#777", "#840"][z]),
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
    canvas.width = 128;
    canvas.height = 128;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 128, 128);
    ctx.font = 'Bold 96px Arial';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.fillText(text, 64, 64);

    return canvas;
}

function createTexture(text, color) {
    var texture = new THREE.Texture(  createCanvas(text, color) );
    texture.needsUpdate = true;
    return texture;
}

function createBump(text) {
    var canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = "#777";
    ctx.fillRect(1, 1, 126, 126);
    ctx.font = 'Bold 96px Arial';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255, 255, 255, .3)";
    var x, y;
    for (y = -2 ; y < 3 ; y++) {
        for (x = -2 ; x < 3 ; x++) {
            ctx.fillText(text, 64 + x, 64 + y);
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
        map: createTexture(text, color),
        specularMap: null,
        bumpMap: createBump(text)
    });
}
