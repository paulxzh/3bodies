(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

},{"./math/universe":7}],2:[function(require,module,exports){
function random(number) {
    var rand = (Math.random() - 0.5) / 50 * 3;
    return rand * number;
}

function rp() {
    return random(10000);
}

function rs() {
    return random(1.0);
}

const Config = {
    camera_position: {
        x: 0,
        y: 0,
        z: 25000
    },
    sun_radius_factor: 100,
    sun1: {
        position: [10000 + rp(), -4000 + rp(), 0 + rp()],
        speed: [1.3 + rs(), -0.3 + rs(), -1 + rs()],
        radius: 5
    },
    sun2: {
        position: [-10000 + rp(), -4000 + rp(), 0 + rp()],
        speed: [-1 + rs(), 1.3 + rs(), -0.3 + rs()],
        radius: 5
    },
    sun3: {
        position: [0 + rp(), 6000 + rp(), 0 + rp()],
        speed: [-0.3 + rs(), -1 + rs(), 1.3 + rs()],
        radius: 5
    }
};

module.exports = Config;

},{}],3:[function(require,module,exports){
const Constants = {
    dimension: 3
};

module.exports = Constants;

},{}],4:[function(require,module,exports){
var Constants = require('./constants');

function Direction() {
    var args = arguments;
    if (args.length === 1) {
        args = args[0];
    }
    this.directions = [];
    for (var i = 0; i < Constants.dimension; i++) {
        this.directions.push(args[i]);
    }

    var sum = 0;
    for (i = 0; i < Constants.dimension; i++) {
        sum += this.directions[i] * this.directions[i];
    }
    sum = Math.sqrt(sum);
    for (i = 0; i < Constants.dimension; i++) {
        this.directions[i] = this.directions[i] / sum;
    }
}

Direction.prototype.toString = function () {
    return this.directions.toString();
};

module.exports = Direction;

},{"./constants":3}],5:[function(require,module,exports){
function Gravity() {
    this.g = 320;
}

Gravity.prototype.calc = function (m1, m2, d) {
    return this.g * m1 * m2 / d / d;
};

module.exports = Gravity;

/*
var test = new Gravity().calc(10.0, 10.0, 5.0);
console.log(test);
*/

},{}],6:[function(require,module,exports){
const Constants = require('./constants');
const Vector = require('./vector');
const Gravity = require('./gravity');

/**
 * @param {Vector} position
 * @param {Vector} speed
 * @param {number} radius
 * @param {string} name
 * @constructor
 */
function Sun(position, speed, radius, name) {
    this.position = new Vector(position.values);
    this.speed = new Vector(speed.values);
    this.radius = radius;
    this.name = name;
    this.mass = 1;
    for (var i = 0; i < Constants.dimension; i++) {
        this.mass *= radius;
    }
}

/**
 * @param {Sun} sun1
 * @param {Sun} sun2
 * @return {Vector}
 */
Sun.prototype.gravity = function(sun1, sun2) {
    var dist = sun1.position.minus(this.position);
    var distance_value = dist.value;
    var gravity_value = new Gravity().calc(this.mass, sun1.mass, distance_value);
    var gravity = [];
    for (var i = 0; i < Constants.dimension; i++) {
        gravity.push(dist.direction.directions[i] * gravity_value);
    }
    if (sun2 === null) {
        return new Vector(gravity);
    }
    return new Vector(gravity).add(this.gravity(sun2, null));
};

/**
 * @param {Sun} sun1
 * @param {Sun} sun2
 */
Sun.prototype.move = function(sun1, sun2) {
    var gravity = this.gravity(sun1, sun2);
    var acceleration = new Vector(gravity);
    for (var i = 0; i < Constants.dimension; i++) {
        acceleration.values[i] = gravity.values[i] / this.mass;
    }
    this.position = this.position.add(this.speed);
    this.speed = this.speed.add(acceleration);
};

/**
 * @returns {Sun}
 */
Sun.prototype.clone = function() {
    return new Sun(this.position, this.speed, this.radius, this.name);
};

/**
 * @param {number} time
 */
Sun.prototype.print = function(time) {
    console.log(this.name + " @ " + time + ": p(" + this.position.toString() + "), s(" + this.speed.toString() + ")");
};

/**
 * @param {object} position
 */
Sun.prototype.export = function (position) {
    position.x = this.position.values[0];
    position.y = this.position.values[1];
    if (Constants.dimension > 2) {
        position.z = this.position.values[2];
    }
};

module.exports = Sun;

},{"./constants":3,"./gravity":5,"./vector":8}],7:[function(require,module,exports){
var Sun = require('./sun');
var Vector = require('./vector');
var Config = require('../config');

function Universe() {
    this.sun1 = new Sun(new Vector(Config.sun1.position), new Vector(Config.sun1.speed), Config.sun1.radius, "sun1");
    this.sun2 = new Sun(new Vector(Config.sun2.position), new Vector(Config.sun2.speed), Config.sun2.radius, "sun2");
    this.sun3 = new Sun(new Vector(Config.sun3.position), new Vector(Config.sun3.speed), Config.sun3.radius, "sun3");
}

Universe.prototype.move = function() {
    const new_sun1 = this.sun1.clone();
    const new_sun2 = this.sun2.clone();
    const new_sun3 = this.sun3.clone();

    new_sun1.move(this.sun2, this.sun3);
    new_sun2.move(this.sun1, this.sun3);
    new_sun3.move(this.sun1, this.sun2);

    this.sun1 = new_sun1;
    this.sun2 = new_sun2;
    this.sun3 = new_sun3;
};

module.exports = Universe;

},{"../config":2,"./sun":6,"./vector":8}],8:[function(require,module,exports){
const Constants = require('./constants');
const Direction = require('./direction');

/**
 * @param {array} arguments
 * @constructor
 */
function Vector () {
    var args = [];
    var i;
    if (arguments.length === 1) {
        for (i = 0; i < arguments[0].length; i++) {
            args.push(arguments[0][i]);
        }
    } else {
        for (i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
    }
    this.values = [];
    for (i = 0; i < Constants.dimension; i++) {
        this.values.push(args[i]);
    }
    this.direction = new Direction(args);
    this.value = 0;
    for (i = 0; i < Constants.dimension; i++) {
        this.value += args[i] * args[i];
    }
    this.value = Math.sqrt(this.value);
}

/**
 * @param {Vector} vector
 * @return {Vector}
 */
Vector.prototype.add = function (vector) {
    var values = [];
    for (var i = 0; i < Constants.dimension; i++) {
        values.push(this.values[i] + vector.values[i]);
    }
    return new Vector(values);
};

/**
 * @return {Vector}
 */
Vector.prototype.revert = function () {
    var values = [];
    for (var i = 0; i < Constants.dimension; i++) {
        values.push(0 - this.values[i]);
    }
    return new Vector(values);
};

/**
 * @param {Vector} vector
 * @return {Vector}
 */
Vector.prototype.minus = function (vector) {
    return this.add(vector.revert());
};

/**
 * @returns {string}
 */
Vector.prototype.toString = function () {
    var s = '';
    for (var i = 0; i < Constants.dimension; i++) {
        if (i !== 0) {
            s += ", ";
        }
        s += this.values[i].toFixed(2);
    }
    s += " (" + this.value.toFixed(2) + ")";
    return s;
};

module.exports = Vector;

},{"./constants":3,"./direction":4}]},{},[1]);
