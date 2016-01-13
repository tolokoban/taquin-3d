function addListener(e,n){window.addEventListener?window.addEventListener(e,n,!1):window.attachEvent("on"+e,n)}var require=function(){var e={};return function(n,t){var r;if(t=window["#"+n],"undefined"==typeof t){var o=new Error("Required module is missing: "+n);throw console.error(o.stack),o}if(r=e[n],"undefined"==typeof r){r={exports:{}};var i=r.exports;t(i,r),e[n]=r.exports,r=r.exports}return r}}();addListener("DOMContentLoaded",function(){document.body.parentNode.$data={},APP=require("main"),setTimeout(function(){"function"==typeof APP.start&&APP.start()})});
window["#$"]=function(n,r){n.config={name:"webgl-experiments",description:"WebGL experiments",author:"Tolokoban",version:"0.0.152",major:0,minor:0,revision:152,date:new Date(2016,0,13,23,3,25)};var e=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem("Language"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),e=n,window.localStorage.setItem("Language",n),n},n.intl=function(r,e){var a,o,t,i,g,l,s=r[n.lang()],u=e[0];if(!s)return console.error('Missing internationalization for language : "'+n.lang()+'"!'),u;if(a=s[u],!a)return console.error("Missing internationalization ["+n.lang()+']: "'+u+'"!'),u;if(e.length>1){for(o="",g=0,t=0;t<a.length;t++)i=a.charAt(t),"$"===i?(o+=a.substring(g,t),t++,l=a.charCodeAt(t)-48,o+=0>l||l>=e.length?"$"+a.charAt(t):e[l],g=t+1):"\\"===i&&(o+=a.substring(g,t),t++,o+=a.charAt(t),g=t+1);o+=a.substr(g),a=o}return a}};
window["#main"]=function(e,n){function t(e){var n=e-T;if(y.applyRotation(h,n),T=e,y.rotation.speedX*=.95,y.rotation.speedY*=.95,!q.anim(e)&&y.tap()){var i=new THREE.Raycaster,o=new THREE.Vector3(y.x,y.y,1).unproject(u);i.set(u.position,o.sub(u.position).normalize());var r=i.intersectObjects(h.children),a=r.length>0?r[0].object:null;a&&q.tap(a,e)}requestAnimationFrame(t),l.render(s,u)}var i=(require("$").intl,require("taquin.cube")),o=require("taquin.grid"),r=require("taquin.rotate-touch"),a=Math.min(window.innerWidth,window.innerHeight),d=a,s=new THREE.Scene,u=new THREE.PerspectiveCamera(75,a/d,.1,1e3),l=new THREE.WebGLRenderer;l.setSize(a,d),document.body.appendChild(l.domElement);var c=[],E={x:0,y:0};l.domElement.addEventListener("mousemove",function(e){E.x=e.clientX/a*2-1,E.y=2*-(e.clientY/d)+1}),l.domElement.addEventListener("mousedown",function(e){c.push("MOUSEDOWN")}),l.domElement.addEventListener("touchstart",function(e){E.x=e.clientX/a*2-1,E.y=2*-(e.clientY/d)+1,c.push("MOUSEDOWN")});var m,p=(new THREE.MeshPhongMaterial({color:16711680,specular:3355443,shininess:15,map:null,specularMap:null,normalMap:null}),new THREE.DirectionalLight(14540253,.8)),w=new THREE.DirectionalLight(10066431,.5),h=new THREE.Group;s.add(h),s.add(p),s.add(w);var v,R,H,f,q=new o(3,3,3);for(v=0;3>v;v++)for(R=0;3>R;R++)for(H=0;3>H;H++)(1!=v||1!=R||1!=H)&&(f=i(v,R,H),q.cube(v,R,H,f),h.add(f));m=f.material,u.position.z=4.3,p.position.set(3,0,5),w.position.set(-1,2,4);var T=Date.now();h.rotation.x=0,h.rotation.y=0,h.rotation.z=0;var y=new r(l.domElement);requestAnimationFrame(t)};
window["#taquin.rotate-touch"]=function(t,e){var a=2,n=(new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),function(t){var e=this;this.x=0,this.y=0,this._tap=!1,this.rotation={speedX:.01*Math.random(),speedY:.01*Math.random()};var n=0,i=0,o=0;t.addEventListener("touchstart",function(h){h.preventDefault(),h.stopPropagation(),n=a,i=o=Date.now();var r=h.changedTouches;r.length>0&&(e.x=r[0].clientX/t.width*2-1,e.x0=e.x,e.y=2*-(r[0].clientY/t.height)+1,e.y0=e.y),e.rotation.speedX=e.rotation.speedY=0}),t.addEventListener("touchend",function(o){if(n==a){o.preventDefault(),o.stopPropagation();var h=Date.now()-i;if(!(h>400)){var r,s,p=o.changedTouches;p.length>0&&(r=p[0].clientX/t.width*2-1,s=2*-(p[0].clientY/t.height)+1);var c=Math.max(Math.abs(e.x0-r),Math.abs(e.y0-s));c>.05||(e._tap=!0)}}}),t.addEventListener("touchmove",function(i){if(n==a){i.preventDefault();var h,r,s=i.changedTouches;if(s.length>0){h=s[0].clientX/t.width*2-1,r=2*-(s[0].clientY/t.height)+1;var p=Date.now(),c=Math.max(.001,p-o);e.rotation.speedY=(h-e.x)/c,e.rotation.speedX=(r-e.y)/c,e.x=h,e.y=r,o=p}}})});n.prototype.applyRotation=function(t,e){var a=this.rotation.speedX*e,n=-this.rotation.speedY*e,i=Math.cos(a),o=Math.sin(a),h=Math.cos(n),r=Math.sin(n);t.matrixAutoUpdate=!1;var s=new THREE.Matrix4,p=s.elements;p[0]=h,p[1]=0,p[2]=r,p[3]=0,p[4]=o*r,p[5]=i,p[6]=-h*o,p[7]=0,p[8]=-i*r,p[9]=o,p[10]=i*h,p[11]=0,p[12]=0,p[13]=0,p[14]=0,p[15]=1,t.matrix=s.multiply(t.matrix)},n.prototype.tap=function(){return this._tap?(this._tap=!1,!0):!1},e.exports=n};
window["#taquin.grid"]=function(t,i){var e=1,n=2,s=function(t,i,e){this._cubes=[];for(var n=0;t*i*e>n;n++)this._cubes.push(null);this._dx=t,this._dy=i,this._dz=e,this._anim={start:0,end:0,cube:null,type:0,x0:0,x1:0,y0:0,y1:0,z0:0,z1:0}};s.prototype.anim=function(t){var i=this._anim;if(!i.cube)return!1;var n=i.end-i.start;if(i.type==e)if(t>=i.end)i.cube.scale.x=1,i.cube.scale.y=1,i.cube.scale.z=1,i.cube=null;else{var s=1-.5*Math.sin(Math.PI*(t-i.start)/n);i.cube.scale.x=i.cube.scale.y=i.cube.scale.z=s}else t>=i.end?(i.cube.position.x=i.x1,i.cube.position.y=i.y1,i.cube.position.z=i.z1,i.cube=null):(i.cube.position.x=i.x0+(i.x1-i.x0)*(t-i.start)/n,i.cube.position.y=i.y0+(i.y1-i.y0)*(t-i.start)/n,i.cube.position.z=i.z0+(i.z1-i.z0)*(t-i.start)/n);return!0},s.prototype.tap=function(t,i){var s=this.find(t);if(s){var u=s.x,o=s.y,c=s.z,l=t.position.x,r=t.position.y,a=t.position.z,h=null;console.log(u,o,c),null===this.cube(u+1,o+0,c+0)?h=[1,0,0]:null===this.cube(u-1,o+0,c+0)?h=[-1,0,0]:null===this.cube(u+0,o+1,c+0)?h=[0,1,0]:null===this.cube(u+0,o-1,c+0)?h=[0,-1,0]:null===this.cube(u+0,o+0,c+1)?h=[0,0,1]:null===this.cube(u+0,o+0,c-1)&&(h=[0,0,-1]),console.info("[taquin.grid] vect=...",h),h?(this._anim={cube:t,type:n,start:i,end:i+300,x0:l,y0:r,z0:a,x1:l+h[0],y1:r+h[1],z1:a+h[2]},this.cube(u+h[0],o+h[1],c+h[2],t),this.cube(u,o,c,null),console.info("[taquin.grid] this._anim=...",this._anim)):this._anim={cube:t,type:e,start:i,end:i+300}}},s.prototype.cube=function(t,i,e,n){var s=Math.floor(t+i*this._dx+e*this._dx*this._dy);if(!(0>s||s>=this._cubes.length))return"undefined"==typeof n?this._cubes[s]:(this._cubes[s]=n,this)},s.prototype.find=function(t){var i,e,n;for(n=0;n<this._dz;n++)for(e=0;e<this._dy;e++)for(i=0;i<this._dx;i++)if(t===this.cube(i,e,n))return{x:i,y:e,z:n};return null},i.exports=s};
window["#taquin.cube"]=function(e,t){function n(e,t){var n=document.createElement("canvas");n.width=128,n.height=128;var l=n.getContext("2d");return l.fillStyle=t,l.fillRect(0,0,128,128),l.font="Bold 96px Arial",l.textAlign="center",l.textBaseline="middle",l.fillStyle="#000",l.fillText(e,64,64),n}function l(e,t){var l=new THREE.Texture(n(e,t));return l.needsUpdate=!0,l}function i(e){var t=document.createElement("canvas");t.width=128,t.height=128;var n=t.getContext("2d");n.fillStyle="#000",n.fillRect(0,0,128,128),n.fillStyle="#777",n.fillRect(1,1,126,126),n.font="Bold 96px Arial",n.textAlign="center",n.textBaseline="middle",n.fillStyle="rgba(255, 255, 255, .3)";var l,i;for(i=-2;3>i;i++)for(l=-2;3>l;l++)n.fillText(e,64+l,64+i);var r=new THREE.Texture(t);return r.needsUpdate=!0,r}function r(e,t){return new THREE.MeshPhongMaterial({specular:3355443,shininess:25,map:l(e,t),specularMap:null,bumpMap:i(e)})}t.exports=function(e,t,n){var l="#"+(e>0?"77":"ff")+(t>0?"77":"ff")+(n>0?"77":"ff"),i=[r("L",l),r("R",l),r("U",l),r("D",l),r("B",l),r("F",["#f80","#777","#840"][n])],a=new THREE.Mesh(new THREE.BoxGeometry(1,1,1,1,1,1),new THREE.MeshFaceMaterial(i));return a.position.set(e-1,t-1,n-1),a}};
//# sourceMappingURL=map/@index.js.map