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
