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
