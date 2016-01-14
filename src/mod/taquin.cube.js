


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
    var shift = Math.random() * canvas.width * 2 - canvas.width;
    var x = Math.min(-shift, 0);
    var color = Math.floor(120 + Math.random() * 6);
    while (x < Math.max(canvas.width, canvas.width - shift)) {
        ctx.strokeStyle = "rgb(" + color + "," + color + "," + color + ")";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + shift, 128);
        ctx.stroke();
        x += 2 + Math.random() * 5;
    }
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
