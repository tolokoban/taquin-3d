{"intl":"","src":"window['#taquin.grid']=function(exports,module){  /***************************************\r\n\r\n ***************************************/\r\n\r\nvar ANIM_SCALE = 1;\r\nvar ANIM_MOVE = 2;\r\n\r\n\r\nvar Grid = function(dx, dy, dz) {\r\n    this._cubes = [];\r\n    for (var loop = 0 ; loop < dx*dy*dz ; loop++) {\r\n        this._cubes.push(null);\r\n    }\r\n    this._dx = dx;\r\n    this._dy = dy;\r\n    this._dz = dz;\r\n    this._anim = {\r\n        start: 0,\r\n        end: 0,\r\n        cube: null,\r\n        type: 0,\r\n        x0: 0, x1: 0,\r\n        y0: 0, y1: 0,\r\n        z0: 0, z1: 0\r\n    };\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nGrid.prototype.anim = function(time) {\r\n    var anim = this._anim;\r\n    if (!anim.cube) return false;\r\n    var dur = anim.end - anim.start;\r\n    if (anim.type == ANIM_SCALE) {\r\n        if (time >= anim.end) {\r\n            // End of animation. Set the scale to 1.\r\n            anim.cube.scale.x = 1;\r\n            anim.cube.scale.y = 1;\r\n            anim.cube.scale.z = 1;\r\n            anim.cube = null;\r\n        } else {\r\n            var scale = 1 - .5 * Math.sin(Math.PI * (time - anim.start) / dur);\r\n            anim.cube.scale.x = anim.cube.scale.y = anim.cube.scale.z = scale;\r\n        }\r\n    } else {\r\n        if (time >= anim.end) {\r\n            // End of animation. Set the to target position.\r\n            anim.cube.position.x = anim.x1;\r\n            anim.cube.position.y = anim.y1;\r\n            anim.cube.position.z = anim.z1;\r\n            anim.cube = null;\r\n        } else {\r\n            anim.cube.position.x = anim.x0 + (anim.x1 - anim.x0) * (time - anim.start) / dur;\r\n            anim.cube.position.y = anim.y0 + (anim.y1 - anim.y0) * (time - anim.start) / dur;\r\n            anim.cube.position.z = anim.z0 + (anim.z1 - anim.z0) * (time - anim.start) / dur;\r\n        }\r\n    }\r\n    return true;\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nGrid.prototype.tap = function(cube, time) {\r\n    var coords = this.find(cube);\r\n    if (!coords) return;\r\n    var cx = coords.x;\r\n    var cy = coords.y;\r\n    var cz = coords.z;\r\n    var x = cube.position.x;\r\n    var y = cube.position.y;\r\n    var z = cube.position.z;\r\n    var vect = null;\r\nconsole.log(cx, cy, cz);\r\n    if (this.cube(cx + 1, cy + 0, cz + 0) === null) {\r\n        vect = [1,0,0];\r\n    }\r\n    else if (this.cube(cx - 1, cy + 0, cz + 0) === null) {\r\n        vect = [-1,0,0];\r\n    }\r\n    else if (this.cube(cx + 0, cy + 1, cz + 0) === null) {\r\n        vect = [0,1,0];\r\n    }\r\n    else if (this.cube(cx + 0, cy - 1, cz + 0) === null) {\r\n        vect = [0,-1,0];\r\n    }\r\n    else if (this.cube(cx + 0, cy + 0, cz + 1) === null) {\r\n        vect = [0,0,1];\r\n    }\r\n    else if (this.cube(cx + 0, cy + 0, cz - 1) === null) {\r\n        vect = [0,0,-1];\r\n    }\r\nconsole.info(\"[taquin.grid] vect=...\", vect);\r\n    if (!vect) {\r\n        this._anim = {\r\n            cube: cube,\r\n            type: ANIM_SCALE,\r\n            start: time,\r\n            end: time + 300\r\n        };\r\n    } else {\r\n        this._anim = {\r\n            cube: cube,\r\n            type: ANIM_MOVE,\r\n            start: time,\r\n            end: time + 300,\r\n            x0: x, y0: y, z0: z,\r\n            x1: x + vect[0], y1: y + vect[1], z1: z + vect[2]\r\n        };\r\n        this.cube(cx + vect[0], cy + vect[1], cz + vect[2], cube);\r\n        this.cube(cx, cy, cz, null);\r\nconsole.info(\"[taquin.grid] this._anim=...\", this._anim);\r\n    }\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nGrid.prototype.cube = function(x, y, z, cube) {\r\n    var index = Math.floor(x + y * this._dx + z * this._dx * this._dy);\r\n    if (index < 0 || index >= this._cubes.length) return undefined;\r\n    if (typeof cube === 'undefined') return this._cubes[index];\r\n    this._cubes[index] = cube;\r\n    return this;\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nGrid.prototype.find = function(cube) {\r\n    var x, y, z;\r\n    for (z=0 ; z<this._dz; z++) {\r\n        for (y=0 ; y<this._dy; y++) {\r\n            for (x=0 ; x<this._dx; x++) {\r\n                if (cube === this.cube(x, y, z)) return { x: x, y: y, z: z };\r\n            }\r\n        }\r\n    }\r\n    return null;\r\n};\r\n\r\n\r\nmodule.exports = Grid;\r\n }\r\n","zip":"window[\"#taquin.grid\"]=function(t,i){var e=1,n=2,s=function(t,i,e){this._cubes=[];for(var n=0;t*i*e>n;n++)this._cubes.push(null);this._dx=t,this._dy=i,this._dz=e,this._anim={start:0,end:0,cube:null,type:0,x0:0,x1:0,y0:0,y1:0,z0:0,z1:0}};s.prototype.anim=function(t){var i=this._anim;if(!i.cube)return!1;var n=i.end-i.start;if(i.type==e)if(t>=i.end)i.cube.scale.x=1,i.cube.scale.y=1,i.cube.scale.z=1,i.cube=null;else{var s=1-.5*Math.sin(Math.PI*(t-i.start)/n);i.cube.scale.x=i.cube.scale.y=i.cube.scale.z=s}else t>=i.end?(i.cube.position.x=i.x1,i.cube.position.y=i.y1,i.cube.position.z=i.z1,i.cube=null):(i.cube.position.x=i.x0+(i.x1-i.x0)*(t-i.start)/n,i.cube.position.y=i.y0+(i.y1-i.y0)*(t-i.start)/n,i.cube.position.z=i.z0+(i.z1-i.z0)*(t-i.start)/n);return!0},s.prototype.tap=function(t,i){var s=this.find(t);if(s){var u=s.x,o=s.y,c=s.z,l=t.position.x,r=t.position.y,a=t.position.z,h=null;console.log(u,o,c),null===this.cube(u+1,o+0,c+0)?h=[1,0,0]:null===this.cube(u-1,o+0,c+0)?h=[-1,0,0]:null===this.cube(u+0,o+1,c+0)?h=[0,1,0]:null===this.cube(u+0,o-1,c+0)?h=[0,-1,0]:null===this.cube(u+0,o+0,c+1)?h=[0,0,1]:null===this.cube(u+0,o+0,c-1)&&(h=[0,0,-1]),console.info(\"[taquin.grid] vect=...\",h),h?(this._anim={cube:t,type:n,start:i,end:i+300,x0:l,y0:r,z0:a,x1:l+h[0],y1:r+h[1],z1:a+h[2]},this.cube(u+h[0],o+h[1],c+h[2],t),this.cube(u,o,c,null),console.info(\"[taquin.grid] this._anim=...\",this._anim)):this._anim={cube:t,type:e,start:i,end:i+300}}},s.prototype.cube=function(t,i,e,n){var s=Math.floor(t+i*this._dx+e*this._dx*this._dy);return 0>s||s>=this._cubes.length?void 0:\"undefined\"==typeof n?this._cubes[s]:(this._cubes[s]=n,this)},s.prototype.find=function(t){var i,e,n;for(n=0;n<this._dz;n++)for(e=0;e<this._dy;e++)for(i=0;i<this._dx;i++)if(t===this.cube(i,e,n))return{x:i,y:e,z:n};return null},i.exports=s};\n//# sourceMappingURL=taquin.grid.js.map","map":{"version":3,"file":"taquin.grid.js.map","sources":["taquin.grid.js"],"sourcesContent":["window['#taquin.grid']=function(exports,module){  /***************************************\r\n\r\n ***************************************/\r\n\r\nvar ANIM_SCALE = 1;\r\nvar ANIM_MOVE = 2;\r\n\r\n\r\nvar Grid = function(dx, dy, dz) {\r\n    this._cubes = [];\r\n    for (var loop = 0 ; loop < dx*dy*dz ; loop++) {\r\n        this._cubes.push(null);\r\n    }\r\n    this._dx = dx;\r\n    this._dy = dy;\r\n    this._dz = dz;\r\n    this._anim = {\r\n        start: 0,\r\n        end: 0,\r\n        cube: null,\r\n        type: 0,\r\n        x0: 0, x1: 0,\r\n        y0: 0, y1: 0,\r\n        z0: 0, z1: 0\r\n    };\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nGrid.prototype.anim = function(time) {\r\n    var anim = this._anim;\r\n    if (!anim.cube) return false;\r\n    var dur = anim.end - anim.start;\r\n    if (anim.type == ANIM_SCALE) {\r\n        if (time >= anim.end) {\r\n            // End of animation. Set the scale to 1.\r\n            anim.cube.scale.x = 1;\r\n            anim.cube.scale.y = 1;\r\n            anim.cube.scale.z = 1;\r\n            anim.cube = null;\r\n        } else {\r\n            var scale = 1 - .5 * Math.sin(Math.PI * (time - anim.start) / dur);\r\n            anim.cube.scale.x = anim.cube.scale.y = anim.cube.scale.z = scale;\r\n        }\r\n    } else {\r\n        if (time >= anim.end) {\r\n            // End of animation. Set the to target position.\r\n            anim.cube.position.x = anim.x1;\r\n            anim.cube.position.y = anim.y1;\r\n            anim.cube.position.z = anim.z1;\r\n            anim.cube = null;\r\n        } else {\r\n            anim.cube.position.x = anim.x0 + (anim.x1 - anim.x0) * (time - anim.start) / dur;\r\n            anim.cube.position.y = anim.y0 + (anim.y1 - anim.y0) * (time - anim.start) / dur;\r\n            anim.cube.position.z = anim.z0 + (anim.z1 - anim.z0) * (time - anim.start) / dur;\r\n        }\r\n    }\r\n    return true;\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nGrid.prototype.tap = function(cube, time) {\r\n    var coords = this.find(cube);\r\n    if (!coords) return;\r\n    var cx = coords.x;\r\n    var cy = coords.y;\r\n    var cz = coords.z;\r\n    var x = cube.position.x;\r\n    var y = cube.position.y;\r\n    var z = cube.position.z;\r\n    var vect = null;\r\nconsole.log(cx, cy, cz);\r\n    if (this.cube(cx + 1, cy + 0, cz + 0) === null) {\r\n        vect = [1,0,0];\r\n    }\r\n    else if (this.cube(cx - 1, cy + 0, cz + 0) === null) {\r\n        vect = [-1,0,0];\r\n    }\r\n    else if (this.cube(cx + 0, cy + 1, cz + 0) === null) {\r\n        vect = [0,1,0];\r\n    }\r\n    else if (this.cube(cx + 0, cy - 1, cz + 0) === null) {\r\n        vect = [0,-1,0];\r\n    }\r\n    else if (this.cube(cx + 0, cy + 0, cz + 1) === null) {\r\n        vect = [0,0,1];\r\n    }\r\n    else if (this.cube(cx + 0, cy + 0, cz - 1) === null) {\r\n        vect = [0,0,-1];\r\n    }\r\nconsole.info(\"[taquin.grid] vect=...\", vect);\r\n    if (!vect) {\r\n        this._anim = {\r\n            cube: cube,\r\n            type: ANIM_SCALE,\r\n            start: time,\r\n            end: time + 300\r\n        };\r\n    } else {\r\n        this._anim = {\r\n            cube: cube,\r\n            type: ANIM_MOVE,\r\n            start: time,\r\n            end: time + 300,\r\n            x0: x, y0: y, z0: z,\r\n            x1: x + vect[0], y1: y + vect[1], z1: z + vect[2]\r\n        };\r\n        this.cube(cx + vect[0], cy + vect[1], cz + vect[2], cube);\r\n        this.cube(cx, cy, cz, null);\r\nconsole.info(\"[taquin.grid] this._anim=...\", this._anim);\r\n    }\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nGrid.prototype.cube = function(x, y, z, cube) {\r\n    var index = Math.floor(x + y * this._dx + z * this._dx * this._dy);\r\n    if (index < 0 || index >= this._cubes.length) return undefined;\r\n    if (typeof cube === 'undefined') return this._cubes[index];\r\n    this._cubes[index] = cube;\r\n    return this;\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nGrid.prototype.find = function(cube) {\r\n    var x, y, z;\r\n    for (z=0 ; z<this._dz; z++) {\r\n        for (y=0 ; y<this._dy; y++) {\r\n            for (x=0 ; x<this._dx; x++) {\r\n                if (cube === this.cube(x, y, z)) return { x: x, y: y, z: z };\r\n            }\r\n        }\r\n    }\r\n    return null;\r\n};\r\n\r\n\r\nmodule.exports = Grid;\r\n }\r\n"],"names":["window","exports","module","ANIM_SCALE","ANIM_MOVE","Grid","dx","dy","dz","this","_cubes","loop","push","_dx","_dy","_dz","_anim","start","end","cube","type","x0","x1","y0","y1","z0","z1","prototype","anim","time","dur","scale","x","y","z","Math","sin","PI","position","tap","coords","find","cx","cy","cz","vect","console","log","info","index","floor","length","undefined"],"mappings":"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"},"dependencies":[]}