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
