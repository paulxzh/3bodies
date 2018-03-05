var Universe = require('./math/universe');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.00001, 100000);
camera.position.z = 20000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var universe = new Universe();

var geometry1 = new THREE.SphereGeometry(universe.sun1.radius * 100, 100, 100, 0, 6.3, 0, 3.15);
var material1 = new THREE.MeshBasicMaterial({color: 0x00ff00});
var sun1 = new THREE.Mesh(geometry1, material1);
universe.sun1.export(sun1.position);
scene.add(sun1);
console.log(sun1.position);

var geometry2 = new THREE.SphereGeometry(universe.sun2.radius * 100, 100, 100, 0, 6.3, 0, 3.15);
var material2 = new THREE.MeshBasicMaterial({color: 0xff0000});
var sun2 = new THREE.Mesh(geometry2, material2);
universe.sun2.export(sun2.position);
scene.add(sun2);
console.log(sun2.position);

var geometry3 = new THREE.SphereGeometry(universe.sun3.radius * 100, 100, 100, 0, 6.3, 0, 3.15);
var material3 = new THREE.MeshBasicMaterial({color: 0x0000ff});
var sun3 = new THREE.Mesh(geometry3, material3);
universe.sun3.export(sun3.position);
scene.add(sun3);
console.log(sun3.position);

var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    for (var i = 0; i < 100; i++) {
        universe.move();
    }
    universe.sun1.export(sun1.position);
    universe.sun2.export(sun2.position);
    universe.sun3.export(sun3.position);
};

animate();
