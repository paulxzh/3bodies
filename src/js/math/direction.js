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
