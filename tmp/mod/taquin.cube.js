{"intl":"","src":"window['#taquin.cube']=function(exports,module){  \r\n\r\n\r\nmodule.exports = function(x, y, z) {\r\n    var color = \"#\" + (x > 0 ? '77' : 'ff') + (y > 0 ? '77' : 'ff') + (z > 0 ? '77' : 'ff');\r\n    var materials = [\r\n        // Left\r\n        createMaterial(\r\n            [\r\n                \"abcdefghi\".charAt(z + 3*y),\r\n                \" \",\r\n                \"IHGFEDCBA\".charAt(z + 3*y)\r\n            ][x],\r\n            [\"#0ff\", \"#8bb\", \"#0bb\"][x]),\r\n        // Right\r\n        createMaterial(\r\n            [\r\n                \"IHGFEDCBA\".charAt(2 - z + 3*y),\r\n                \" \",\r\n                \"abcdefghi\".charAt(2 - z + 3*y)\r\n            ][x],\r\n            [\"#f00\", \"#b44\", \"#b00\"][x]),\r\n        // Up\r\n        createMaterial(\r\n            [\r\n                \"ihgfedcba\".charAt(x + 3*z),\r\n                \" \",\r\n                \"ABCDEFGHI\".charAt(x + 3*z)\r\n            ][y],\r\n            [\"#0f0\", \"#4b4\", \"#0b0\"][y]),\r\n        // Down\r\n        createMaterial(\r\n            [\r\n                \"IHGFEDCBA\".charAt(2 - x + 3*z),\r\n                \" \",\r\n                \"abcdefghi\".charAt(2 - x + 3*z)\r\n            ][y],\r\n            [\"#f0f\", \"#b8b\", \"#b0b\"][y]),\r\n        // Back\r\n        createMaterial(\r\n            [\r\n                \"abcdefghi\".charAt(2 - x + 3*y),\r\n                \" \",\r\n                \"IHGFEDCBA\".charAt(2 - x + 3*y)\r\n            ][z],\r\n            [\"#ff0\", \"#bb8\", \"#bb0\"][z]),\r\n        // Front\r\n        createMaterial(\r\n            [\r\n                \"IHGFEDCBA\".charAt(x + 3*y),\r\n                \" \",\r\n                \"abcdefghi\".charAt(x + 3*y)\r\n            ][z],\r\n            [\"#00f\", \"#44b\", \"#00b\"][z])\r\n    ];\r\n    var mesh = new THREE.Mesh(\r\n        new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 ),\r\n        new THREE.MeshFaceMaterial( materials )\r\n    );\r\n\r\n    mesh.position.set(x - 1, y - 1, z - 1);\r\n    return mesh;\r\n};\r\n\r\n\r\n\r\n\r\nfunction createCanvas(text, color) {\r\n    var canvas = document.createElement(\"canvas\");\r\n    canvas.width = 128;\r\n    canvas.height = 128;\r\n    var ctx = canvas.getContext(\"2d\");\r\n\r\n    ctx.fillStyle = color;\r\n    ctx.fillRect(0, 0, 128, 128);\r\n    ctx.font = 'Bold 96px Arial';\r\n    ctx.textAlign = \"center\";\r\n    ctx.textBaseline = \"middle\";\r\n    ctx.fillStyle = \"#000\";\r\n    ctx.fillText(text, 64, 64);\r\n\r\n    return canvas;\r\n}\r\n\r\nfunction createTexture(text, color) {\r\n    var texture = new THREE.Texture(  createCanvas(text, color) );\r\n    texture.needsUpdate = true;\r\n    return texture;\r\n}\r\n\r\nfunction createBump(text) {\r\n    var canvas = document.createElement(\"canvas\");\r\n    canvas.width = 128;\r\n    canvas.height = 128;\r\n    var ctx = canvas.getContext(\"2d\");\r\n\r\n    ctx.fillStyle = \"#000\";\r\n    ctx.fillRect(0, 0, 128, 128);\r\n    ctx.fillStyle = \"#777\";\r\n    ctx.fillRect(1, 1, 126, 126);\r\n    var shift = Math.random() * canvas.width * 2 - canvas.width;\r\n    var x = Math.min(-shift, 0);\r\n    var color = Math.floor(120 + Math.random() * 6);\r\n    while (x < Math.max(canvas.width, canvas.width - shift)) {\r\n        ctx.strokeStyle = \"rgb(\" + color + \",\" + color + \",\" + color + \")\";\r\n        ctx.beginPath();\r\n        ctx.moveTo(x, 0);\r\n        ctx.lineTo(x + shift, 128);\r\n        ctx.stroke();\r\n        x += 2 + Math.random() * 5;\r\n    }\r\n    ctx.font = 'Bold 96px Arial';\r\n    ctx.textAlign = \"center\";\r\n    ctx.textBaseline = \"middle\";\r\n    ctx.fillStyle = \"rgba(255, 255, 255, .3)\";\r\n    var x, y;\r\n    for (y = -2 ; y < 3 ; y++) {\r\n        for (x = -2 ; x < 3 ; x++) {\r\n            ctx.fillText(text, 64 + x, 64 + y);\r\n        }\r\n    }\r\n\r\n    var texture = new THREE.Texture(  canvas );\r\n    texture.needsUpdate = true;\r\n    return texture;\r\n}\r\n\r\nfunction createMaterial(text, color) {\r\n    return new THREE.MeshPhongMaterial({\r\n        specular: 0x333333,\r\n        shininess: 25,\r\n        map: createTexture(text, color),\r\n        specularMap: null,\r\n        bumpMap: createBump(text)\r\n    });\r\n}\r\n }\r\n","zip":"window[\"#taquin.cube\"]=function(e,t){function a(e,t){var a=document.createElement(\"canvas\");a.width=128,a.height=128;var r=a.getContext(\"2d\");return r.fillStyle=t,r.fillRect(0,0,128,128),r.font=\"Bold 96px Arial\",r.textAlign=\"center\",r.textBaseline=\"middle\",r.fillStyle=\"#000\",r.fillText(e,64,64),a}function r(e,t){var r=new THREE.Texture(a(e,t));return r.needsUpdate=!0,r}function n(e){var t=document.createElement(\"canvas\");t.width=128,t.height=128;var a=t.getContext(\"2d\");a.fillStyle=\"#000\",a.fillRect(0,0,128,128),a.fillStyle=\"#777\",a.fillRect(1,1,126,126);for(var r=Math.random()*t.width*2-t.width,n=Math.min(-r,0),i=Math.floor(120+6*Math.random());n<Math.max(t.width,t.width-r);)a.strokeStyle=\"rgb(\"+i+\",\"+i+\",\"+i+\")\",a.beginPath(),a.moveTo(n,0),a.lineTo(n+r,128),a.stroke(),n+=2+5*Math.random();a.font=\"Bold 96px Arial\",a.textAlign=\"center\",a.textBaseline=\"middle\",a.fillStyle=\"rgba(255, 255, 255, .3)\";var n,l;for(l=-2;3>l;l++)for(n=-2;3>n;n++)a.fillText(e,64+n,64+l);var h=new THREE.Texture(t);return h.needsUpdate=!0,h}function i(e,t){return new THREE.MeshPhongMaterial({specular:3355443,shininess:25,map:r(e,t),specularMap:null,bumpMap:n(e)})}t.exports=function(e,t,a){var r=[i([\"abcdefghi\".charAt(a+3*t),\" \",\"IHGFEDCBA\".charAt(a+3*t)][e],[\"#0ff\",\"#8bb\",\"#0bb\"][e]),i([\"IHGFEDCBA\".charAt(2-a+3*t),\" \",\"abcdefghi\".charAt(2-a+3*t)][e],[\"#f00\",\"#b44\",\"#b00\"][e]),i([\"ihgfedcba\".charAt(e+3*a),\" \",\"ABCDEFGHI\".charAt(e+3*a)][t],[\"#0f0\",\"#4b4\",\"#0b0\"][t]),i([\"IHGFEDCBA\".charAt(2-e+3*a),\" \",\"abcdefghi\".charAt(2-e+3*a)][t],[\"#f0f\",\"#b8b\",\"#b0b\"][t]),i([\"abcdefghi\".charAt(2-e+3*t),\" \",\"IHGFEDCBA\".charAt(2-e+3*t)][a],[\"#ff0\",\"#bb8\",\"#bb0\"][a]),i([\"IHGFEDCBA\".charAt(e+3*t),\" \",\"abcdefghi\".charAt(e+3*t)][a],[\"#00f\",\"#44b\",\"#00b\"][a])],n=new THREE.Mesh(new THREE.BoxGeometry(1,1,1,1,1,1),new THREE.MeshFaceMaterial(r));return n.position.set(e-1,t-1,a-1),n}};\n//# sourceMappingURL=taquin.cube.js.map","map":{"version":3,"file":"taquin.cube.js.map","sources":["taquin.cube.js"],"sourcesContent":["window['#taquin.cube']=function(exports,module){  \r\n\r\n\r\nmodule.exports = function(x, y, z) {\r\n    var color = \"#\" + (x > 0 ? '77' : 'ff') + (y > 0 ? '77' : 'ff') + (z > 0 ? '77' : 'ff');\r\n    var materials = [\r\n        // Left\r\n        createMaterial(\r\n            [\r\n                \"abcdefghi\".charAt(z + 3*y),\r\n                \" \",\r\n                \"IHGFEDCBA\".charAt(z + 3*y)\r\n            ][x],\r\n            [\"#0ff\", \"#8bb\", \"#0bb\"][x]),\r\n        // Right\r\n        createMaterial(\r\n            [\r\n                \"IHGFEDCBA\".charAt(2 - z + 3*y),\r\n                \" \",\r\n                \"abcdefghi\".charAt(2 - z + 3*y)\r\n            ][x],\r\n            [\"#f00\", \"#b44\", \"#b00\"][x]),\r\n        // Up\r\n        createMaterial(\r\n            [\r\n                \"ihgfedcba\".charAt(x + 3*z),\r\n                \" \",\r\n                \"ABCDEFGHI\".charAt(x + 3*z)\r\n            ][y],\r\n            [\"#0f0\", \"#4b4\", \"#0b0\"][y]),\r\n        // Down\r\n        createMaterial(\r\n            [\r\n                \"IHGFEDCBA\".charAt(2 - x + 3*z),\r\n                \" \",\r\n                \"abcdefghi\".charAt(2 - x + 3*z)\r\n            ][y],\r\n            [\"#f0f\", \"#b8b\", \"#b0b\"][y]),\r\n        // Back\r\n        createMaterial(\r\n            [\r\n                \"abcdefghi\".charAt(2 - x + 3*y),\r\n                \" \",\r\n                \"IHGFEDCBA\".charAt(2 - x + 3*y)\r\n            ][z],\r\n            [\"#ff0\", \"#bb8\", \"#bb0\"][z]),\r\n        // Front\r\n        createMaterial(\r\n            [\r\n                \"IHGFEDCBA\".charAt(x + 3*y),\r\n                \" \",\r\n                \"abcdefghi\".charAt(x + 3*y)\r\n            ][z],\r\n            [\"#00f\", \"#44b\", \"#00b\"][z])\r\n    ];\r\n    var mesh = new THREE.Mesh(\r\n        new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 ),\r\n        new THREE.MeshFaceMaterial( materials )\r\n    );\r\n\r\n    mesh.position.set(x - 1, y - 1, z - 1);\r\n    return mesh;\r\n};\r\n\r\n\r\n\r\n\r\nfunction createCanvas(text, color) {\r\n    var canvas = document.createElement(\"canvas\");\r\n    canvas.width = 128;\r\n    canvas.height = 128;\r\n    var ctx = canvas.getContext(\"2d\");\r\n\r\n    ctx.fillStyle = color;\r\n    ctx.fillRect(0, 0, 128, 128);\r\n    ctx.font = 'Bold 96px Arial';\r\n    ctx.textAlign = \"center\";\r\n    ctx.textBaseline = \"middle\";\r\n    ctx.fillStyle = \"#000\";\r\n    ctx.fillText(text, 64, 64);\r\n\r\n    return canvas;\r\n}\r\n\r\nfunction createTexture(text, color) {\r\n    var texture = new THREE.Texture(  createCanvas(text, color) );\r\n    texture.needsUpdate = true;\r\n    return texture;\r\n}\r\n\r\nfunction createBump(text) {\r\n    var canvas = document.createElement(\"canvas\");\r\n    canvas.width = 128;\r\n    canvas.height = 128;\r\n    var ctx = canvas.getContext(\"2d\");\r\n\r\n    ctx.fillStyle = \"#000\";\r\n    ctx.fillRect(0, 0, 128, 128);\r\n    ctx.fillStyle = \"#777\";\r\n    ctx.fillRect(1, 1, 126, 126);\r\n    var shift = Math.random() * canvas.width * 2 - canvas.width;\r\n    var x = Math.min(-shift, 0);\r\n    var color = Math.floor(120 + Math.random() * 6);\r\n    while (x < Math.max(canvas.width, canvas.width - shift)) {\r\n        ctx.strokeStyle = \"rgb(\" + color + \",\" + color + \",\" + color + \")\";\r\n        ctx.beginPath();\r\n        ctx.moveTo(x, 0);\r\n        ctx.lineTo(x + shift, 128);\r\n        ctx.stroke();\r\n        x += 2 + Math.random() * 5;\r\n    }\r\n    ctx.font = 'Bold 96px Arial';\r\n    ctx.textAlign = \"center\";\r\n    ctx.textBaseline = \"middle\";\r\n    ctx.fillStyle = \"rgba(255, 255, 255, .3)\";\r\n    var x, y;\r\n    for (y = -2 ; y < 3 ; y++) {\r\n        for (x = -2 ; x < 3 ; x++) {\r\n            ctx.fillText(text, 64 + x, 64 + y);\r\n        }\r\n    }\r\n\r\n    var texture = new THREE.Texture(  canvas );\r\n    texture.needsUpdate = true;\r\n    return texture;\r\n}\r\n\r\nfunction createMaterial(text, color) {\r\n    return new THREE.MeshPhongMaterial({\r\n        specular: 0x333333,\r\n        shininess: 25,\r\n        map: createTexture(text, color),\r\n        specularMap: null,\r\n        bumpMap: createBump(text)\r\n    });\r\n}\r\n }\r\n"],"names":["window","exports","module","createCanvas","text","color","canvas","document","createElement","width","height","ctx","getContext","fillStyle","fillRect","font","textAlign","textBaseline","fillText","createTexture","texture","THREE","Texture","needsUpdate","createBump","shift","Math","random","x","min","floor","max","strokeStyle","beginPath","moveTo","lineTo","stroke","y","createMaterial","MeshPhongMaterial","specular","shininess","map","specularMap","bumpMap","z","materials","charAt","mesh","Mesh","BoxGeometry","MeshFaceMaterial","position","set"],"mappings":"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"},"dependencies":[]}