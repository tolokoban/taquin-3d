{"intl":"var _intl_={\"en\":{\"welcome\":\"Welcome in the world of\"},\"fr\":{\"welcome\":\"Bienvenue dans le monde de\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\n","src":"window['#main']=function(exports,module){ var _intl_={\"en\":{\"welcome\":\"Welcome in the world of\"},\"fr\":{\"welcome\":\"Bienvenue dans le monde de\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\n var Cube = require(\"taquin.cube\");\r\nvar Grid = require(\"taquin.grid\");\r\nvar HollowCube = require(\"taquin.hollow-cube\");\r\nvar RotateTouch = require(\"taquin.rotate-touch\");\r\n\r\nvar W = Math.min( window.innerWidth, window.innerHeight );\r\nvar H = W;\r\nvar scene = new THREE.Scene();\r\nvar camera = new THREE.PerspectiveCamera( 35, W / H, 0.1, 1000 );\r\nvar renderer = new THREE.WebGLRenderer();\r\nrenderer.setSize( W, H );\r\ndocument.body.appendChild( renderer.domElement );\r\n\r\n\r\nvar selectedCube = null;\r\nvar nextSelectedCube = null;\r\nvar actions = [];\r\n\r\nvar mouse = { x: 0, y: 0 };\r\nrenderer.domElement.addEventListener('mousemove', function(event) {\r\n    mouse.x = ( event.clientX / W ) * 2 - 1;\r\n    mouse.y = - ( event.clientY / H ) * 2 + 1;\r\n});\r\nrenderer.domElement.addEventListener('mousedown', function(event) {\r\n    actions.push(\"MOUSEDOWN\");\r\n});\r\nrenderer.domElement.addEventListener('touchstart', function(event) {\r\n    mouse.x = ( event.clientX / W ) * 2 - 1;\r\n    mouse.y = - ( event.clientY / H ) * 2 + 1;\r\n    actions.push(\"MOUSEDOWN\");\r\n});\r\n\r\n\r\nvar material, material2 = new THREE.MeshPhongMaterial({\r\n    color: 0xff0000,\r\n    specular: 0x333333,\r\n    shininess: 15,\r\n    map: null,\r\n    specularMap: null,\r\n    normalMap: null\r\n});\r\n\r\nvar light1 = new THREE.DirectionalLight( 0xdddddd, 0.8 );\r\nvar light2 = new THREE.DirectionalLight( 0x9999ff, 0.5 );\r\nvar group = new THREE.Group();\r\n\r\nscene.add( light1 );\r\nscene.add( light2 );\r\n\r\nvar grid = new Grid(3,3,3);\r\nvar x, y, z, cube;\r\nfor (x=0 ; x<3 ; x++) {\r\n    for (y=0 ; y<3 ; y++) {\r\n        for (z=0 ; z<3 ; z++) {\r\n            if (x != 1 || y != 1 || z != 1) {\r\n                cube = Cube(x, y, z);\r\n                grid.cube(x, y, z, cube);\r\n                group.add(cube);\r\n            }\r\n        }\r\n    }\r\n}\r\nmaterial = cube.material;\r\n\r\nvar hollow = HollowCube(3);\r\nvar hole = createHole();\r\ngrid.setHole( hole );\r\nhollow.add(hole);\r\nvar grpA = new THREE.Group();\r\ngrpA.add(group);\r\nvar grpB = new THREE.Group();\r\ngrpB.add(hollow);\r\n\r\ngrpA.position.set(-.2, .2, -.5);\r\ngrpB.position.set(1.7, -1.7, 1);\r\ngrpB.scale.set(.3,.3,.3);\r\n\r\nscene.add( grpA );\r\nscene.add( grpB );\r\n\r\ncamera.position.z = 9;\r\nlight1.position.set(3,0,5);\r\nlight2.position.set(-1,2,4);\r\nvar time0 = Date.now();\r\ngroup.rotation.x = 0;\r\ngroup.rotation.y = 0;\r\ngroup.rotation.z = 0;\r\n\r\nvar touch = new RotateTouch(renderer.domElement);\r\n\r\nfunction render(time1) {\r\n    var deltaTime = time1 - time0;\r\n    touch.applyRotation(group, deltaTime);\r\n    touch.applyRotation(hollow, deltaTime);\r\n    time0 = time1;\r\n    touch.rotation.speedX *= .95;\r\n    touch.rotation.speedY *= .95;\r\n\r\n    if (!grid.anim(time1)) {\r\n        if (touch.tap()) {\r\n            var raycaster = new THREE.Raycaster();\r\n            var vector = new THREE.Vector3( touch.x, touch.y, 1 ).unproject( camera );\r\n            raycaster.set( camera.position, vector.sub( camera.position ).normalize() );\r\n            var intersects = raycaster.intersectObjects( group.children );\r\n            var cube = intersects.length > 0 ? intersects[0].object : null;\r\n            if (cube) {\r\n                grid.tap(cube, time1);\r\n            }\r\n        }\r\n    }\r\n\r\n    requestAnimationFrame( render );\r\n    renderer.render( scene, camera );\r\n}\r\nrequestAnimationFrame( render );\r\n\r\n\r\n\r\nfunction createHole(s) {\r\n    if (typeof s === 'undefined') s = .5;\r\n\r\n    var colors = [\r\n        new THREE.Color(0,1,0),\r\n        new THREE.Color(0,1,1),\r\n        new THREE.Color(0,0,1),\r\n        new THREE.Color(1,0,0),\r\n        new THREE.Color(1,1,0),\r\n        new THREE.Color(1,0,1)\r\n    ];\r\n    var geo = new THREE.Geometry();\r\n    geo.vertices.push(\r\n        new THREE.Vector3( s, s, s),\r\n        new THREE.Vector3( s, s,-s),\r\n        new THREE.Vector3(-s, s,-s),\r\n        new THREE.Vector3(-s, s, s),\r\n        new THREE.Vector3( s,-s, s),\r\n        new THREE.Vector3( s,-s,-s),\r\n        new THREE.Vector3(-s,-s,-s),\r\n        new THREE.Vector3(-s,-s, s)\r\n    );\r\n    [\r\n        [0,1,2,3], [0,4,5,1], [1,5,6,2], [2,6,7,3], [0,3,7,4], [4,7,6,5]\r\n    ].forEach(function (vertices, idx) {\r\n        var face1 = new THREE.Face3( vertices[0], vertices[1], vertices[2] );\r\n        var face2 = new THREE.Face3( vertices[0], vertices[2], vertices[3] );\r\n        face1.vertexColors[0] = face1.vertexColors[1] = face1.vertexColors[2] = colors[idx];\r\n        face2.vertexColors[0] = face2.vertexColors[1] = face2.vertexColors[2] = colors[idx];\r\n        geo.faces.push( face1, face2 );\r\n    });\r\n\r\n    geo.computeFaceNormals ();\r\n    geo.computeVertexNormals ();\r\n    \r\n    var mat = new THREE.MeshPhongMaterial({\r\n        specular: 0x111111,\r\n        shininess: 2,\r\n        vertexColors: THREE.VertexColors        \r\n    });\r\n\r\n    return new THREE.Mesh( geo, mat );\r\n}\r\n }\n","zip":"window[\"#main\"]=function(e,n){function o(e){var n=e-b;if(g.applyRotation(T,n),g.applyRotation(q,n),b=e,g.rotation.speedX*=.95,g.rotation.speedY*=.95,!x.anim(e)&&g.tap()){var t=new THREE.Raycaster,r=new THREE.Vector3(g.x,g.y,1).unproject(u);t.set(u.position,r.sub(u.position).normalize());var i=t.intersectObjects(T.children),a=i.length>0?i[0].object:null;a&&x.tap(a,e)}requestAnimationFrame(o),d.render(c,u)}function t(e){\"undefined\"==typeof e&&(e=.5);var n=[new THREE.Color(0,1,0),new THREE.Color(0,1,1),new THREE.Color(0,0,1),new THREE.Color(1,0,0),new THREE.Color(1,1,0),new THREE.Color(1,0,1)],o=new THREE.Geometry;o.vertices.push(new THREE.Vector3(e,e,e),new THREE.Vector3(e,e,-e),new THREE.Vector3(-e,e,-e),new THREE.Vector3(-e,e,e),new THREE.Vector3(e,-e,e),new THREE.Vector3(e,-e,-e),new THREE.Vector3(-e,-e,-e),new THREE.Vector3(-e,-e,e)),[[0,1,2,3],[0,4,5,1],[1,5,6,2],[2,6,7,3],[0,3,7,4],[4,7,6,5]].forEach(function(e,t){var r=new THREE.Face3(e[0],e[1],e[2]),i=new THREE.Face3(e[0],e[2],e[3]);r.vertexColors[0]=r.vertexColors[1]=r.vertexColors[2]=n[t],i.vertexColors[0]=i.vertexColors[1]=i.vertexColors[2]=n[t],o.faces.push(r,i)}),o.computeFaceNormals(),o.computeVertexNormals();var t=new THREE.MeshPhongMaterial({specular:1118481,shininess:2,vertexColors:THREE.VertexColors});return new THREE.Mesh(o,t)}var r=(require(\"$\").intl,require(\"taquin.cube\")),i=require(\"taquin.grid\"),a=require(\"taquin.hollow-cube\"),E=require(\"taquin.rotate-touch\"),s=Math.min(window.innerWidth,window.innerHeight),l=s,c=new THREE.Scene,u=new THREE.PerspectiveCamera(35,s/l,.1,1e3),d=new THREE.WebGLRenderer;d.setSize(s,l),document.body.appendChild(d.domElement);var w=[],p={x:0,y:0};d.domElement.addEventListener(\"mousemove\",function(e){p.x=e.clientX/s*2-1,p.y=2*-(e.clientY/l)+1}),d.domElement.addEventListener(\"mousedown\",function(e){w.push(\"MOUSEDOWN\")}),d.domElement.addEventListener(\"touchstart\",function(e){p.x=e.clientX/s*2-1,p.y=2*-(e.clientY/l)+1,w.push(\"MOUSEDOWN\")});var R,H=(new THREE.MeshPhongMaterial({color:16711680,specular:3355443,shininess:15,map:null,specularMap:null,normalMap:null}),new THREE.DirectionalLight(14540253,.8)),m=new THREE.DirectionalLight(10066431,.5),T=new THREE.Group;c.add(H),c.add(m);var v,h,C,f,x=new i(3,3,3);for(v=0;3>v;v++)for(h=0;3>h;h++)for(C=0;3>C;C++)(1!=v||1!=h||1!=C)&&(f=r(v,h,C),x.cube(v,h,C,f),T.add(f));R=f.material;var q=a(3),y=t();x.setHole(y),q.add(y);var V=new THREE.Group;V.add(T);var M=new THREE.Group;M.add(q),V.position.set(-.2,.2,-.5),M.position.set(1.7,-1.7,1),M.scale.set(.3,.3,.3),c.add(V),c.add(M),u.position.z=9,H.position.set(3,0,5),m.position.set(-1,2,4);var b=Date.now();T.rotation.x=0,T.rotation.y=0,T.rotation.z=0;var g=new E(d.domElement);requestAnimationFrame(o)};\n//# sourceMappingURL=main.js.map","map":{"version":3,"file":"main.js.map","sources":["main.js"],"sourcesContent":["window['#main']=function(exports,module){ var _intl_={\"en\":{\"welcome\":\"Welcome in the world of\"},\"fr\":{\"welcome\":\"Bienvenue dans le monde de\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\n var Cube = require(\"taquin.cube\");\r\nvar Grid = require(\"taquin.grid\");\r\nvar HollowCube = require(\"taquin.hollow-cube\");\r\nvar RotateTouch = require(\"taquin.rotate-touch\");\r\n\r\nvar W = Math.min( window.innerWidth, window.innerHeight );\r\nvar H = W;\r\nvar scene = new THREE.Scene();\r\nvar camera = new THREE.PerspectiveCamera( 35, W / H, 0.1, 1000 );\r\nvar renderer = new THREE.WebGLRenderer();\r\nrenderer.setSize( W, H );\r\ndocument.body.appendChild( renderer.domElement );\r\n\r\n\r\nvar selectedCube = null;\r\nvar nextSelectedCube = null;\r\nvar actions = [];\r\n\r\nvar mouse = { x: 0, y: 0 };\r\nrenderer.domElement.addEventListener('mousemove', function(event) {\r\n    mouse.x = ( event.clientX / W ) * 2 - 1;\r\n    mouse.y = - ( event.clientY / H ) * 2 + 1;\r\n});\r\nrenderer.domElement.addEventListener('mousedown', function(event) {\r\n    actions.push(\"MOUSEDOWN\");\r\n});\r\nrenderer.domElement.addEventListener('touchstart', function(event) {\r\n    mouse.x = ( event.clientX / W ) * 2 - 1;\r\n    mouse.y = - ( event.clientY / H ) * 2 + 1;\r\n    actions.push(\"MOUSEDOWN\");\r\n});\r\n\r\n\r\nvar material, material2 = new THREE.MeshPhongMaterial({\r\n    color: 0xff0000,\r\n    specular: 0x333333,\r\n    shininess: 15,\r\n    map: null,\r\n    specularMap: null,\r\n    normalMap: null\r\n});\r\n\r\nvar light1 = new THREE.DirectionalLight( 0xdddddd, 0.8 );\r\nvar light2 = new THREE.DirectionalLight( 0x9999ff, 0.5 );\r\nvar group = new THREE.Group();\r\n\r\nscene.add( light1 );\r\nscene.add( light2 );\r\n\r\nvar grid = new Grid(3,3,3);\r\nvar x, y, z, cube;\r\nfor (x=0 ; x<3 ; x++) {\r\n    for (y=0 ; y<3 ; y++) {\r\n        for (z=0 ; z<3 ; z++) {\r\n            if (x != 1 || y != 1 || z != 1) {\r\n                cube = Cube(x, y, z);\r\n                grid.cube(x, y, z, cube);\r\n                group.add(cube);\r\n            }\r\n        }\r\n    }\r\n}\r\nmaterial = cube.material;\r\n\r\nvar hollow = HollowCube(3);\r\nvar hole = createHole();\r\ngrid.setHole( hole );\r\nhollow.add(hole);\r\nvar grpA = new THREE.Group();\r\ngrpA.add(group);\r\nvar grpB = new THREE.Group();\r\ngrpB.add(hollow);\r\n\r\ngrpA.position.set(-.2, .2, -.5);\r\ngrpB.position.set(1.7, -1.7, 1);\r\ngrpB.scale.set(.3,.3,.3);\r\n\r\nscene.add( grpA );\r\nscene.add( grpB );\r\n\r\ncamera.position.z = 9;\r\nlight1.position.set(3,0,5);\r\nlight2.position.set(-1,2,4);\r\nvar time0 = Date.now();\r\ngroup.rotation.x = 0;\r\ngroup.rotation.y = 0;\r\ngroup.rotation.z = 0;\r\n\r\nvar touch = new RotateTouch(renderer.domElement);\r\n\r\nfunction render(time1) {\r\n    var deltaTime = time1 - time0;\r\n    touch.applyRotation(group, deltaTime);\r\n    touch.applyRotation(hollow, deltaTime);\r\n    time0 = time1;\r\n    touch.rotation.speedX *= .95;\r\n    touch.rotation.speedY *= .95;\r\n\r\n    if (!grid.anim(time1)) {\r\n        if (touch.tap()) {\r\n            var raycaster = new THREE.Raycaster();\r\n            var vector = new THREE.Vector3( touch.x, touch.y, 1 ).unproject( camera );\r\n            raycaster.set( camera.position, vector.sub( camera.position ).normalize() );\r\n            var intersects = raycaster.intersectObjects( group.children );\r\n            var cube = intersects.length > 0 ? intersects[0].object : null;\r\n            if (cube) {\r\n                grid.tap(cube, time1);\r\n            }\r\n        }\r\n    }\r\n\r\n    requestAnimationFrame( render );\r\n    renderer.render( scene, camera );\r\n}\r\nrequestAnimationFrame( render );\r\n\r\n\r\n\r\nfunction createHole(s) {\r\n    if (typeof s === 'undefined') s = .5;\r\n\r\n    var colors = [\r\n        new THREE.Color(0,1,0),\r\n        new THREE.Color(0,1,1),\r\n        new THREE.Color(0,0,1),\r\n        new THREE.Color(1,0,0),\r\n        new THREE.Color(1,1,0),\r\n        new THREE.Color(1,0,1)\r\n    ];\r\n    var geo = new THREE.Geometry();\r\n    geo.vertices.push(\r\n        new THREE.Vector3( s, s, s),\r\n        new THREE.Vector3( s, s,-s),\r\n        new THREE.Vector3(-s, s,-s),\r\n        new THREE.Vector3(-s, s, s),\r\n        new THREE.Vector3( s,-s, s),\r\n        new THREE.Vector3( s,-s,-s),\r\n        new THREE.Vector3(-s,-s,-s),\r\n        new THREE.Vector3(-s,-s, s)\r\n    );\r\n    [\r\n        [0,1,2,3], [0,4,5,1], [1,5,6,2], [2,6,7,3], [0,3,7,4], [4,7,6,5]\r\n    ].forEach(function (vertices, idx) {\r\n        var face1 = new THREE.Face3( vertices[0], vertices[1], vertices[2] );\r\n        var face2 = new THREE.Face3( vertices[0], vertices[2], vertices[3] );\r\n        face1.vertexColors[0] = face1.vertexColors[1] = face1.vertexColors[2] = colors[idx];\r\n        face2.vertexColors[0] = face2.vertexColors[1] = face2.vertexColors[2] = colors[idx];\r\n        geo.faces.push( face1, face2 );\r\n    });\r\n\r\n    geo.computeFaceNormals ();\r\n    geo.computeVertexNormals ();\r\n    \r\n    var mat = new THREE.MeshPhongMaterial({\r\n        specular: 0x111111,\r\n        shininess: 2,\r\n        vertexColors: THREE.VertexColors        \r\n    });\r\n\r\n    return new THREE.Mesh( geo, mat );\r\n}\r\n }\n"],"names":["window","exports","module","render","time1","deltaTime","time0","touch","applyRotation","group","hollow","rotation","speedX","speedY","grid","anim","tap","raycaster","THREE","Raycaster","vector","Vector3","x","y","unproject","camera","set","position","sub","normalize","intersects","intersectObjects","children","cube","length","object","requestAnimationFrame","renderer","scene","createHole","s","colors","Color","geo","Geometry","vertices","push","forEach","idx","face1","Face3","face2","vertexColors","faces","computeFaceNormals","computeVertexNormals","mat","MeshPhongMaterial","specular","shininess","VertexColors","Mesh","Cube","require","intl","Grid","HollowCube","RotateTouch","W","Math","min","innerWidth","innerHeight","H","Scene","PerspectiveCamera","WebGLRenderer","setSize","document","body","appendChild","domElement","actions","mouse","addEventListener","event","clientX","clientY","material","light1","color","map","specularMap","normalMap","DirectionalLight","light2","Group","add","z","hole","setHole","grpA","grpB","scale","Date","now"],"mappings":"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"},"dependencies":["mod/$","mod/taquin.cube","mod/taquin.grid","mod/taquin.hollow-cube","mod/taquin.rotate-touch"]}