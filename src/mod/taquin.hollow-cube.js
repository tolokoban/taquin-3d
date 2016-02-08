module.exports = function(side) {
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
