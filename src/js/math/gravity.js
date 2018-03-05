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
