var Sun = require('./sun');
var Vector = require('./vector');

// init
var sun1 = new Sun(new Vector(10000, 0, 0), new Vector(0, 0, 1), 5, "sun1");
var sun2 = new Sun(new Vector(-10000, 0, 0), new Vector(0, 0, -1), 5, "sun2");
var sun3 = new Sun(new Vector(0, 1, 0), new Vector(0, 0.3, 0.3), 1, "sun3");

// move
for (var i = 0; i < 1000000; i++) {
    sun1.print(i);
    sun2.print(i);
    sun3.print(i);
    console.log("");

    const new_sun1 = sun1.clone();
    const new_sun2 = sun2.clone();
    const new_sun3 = sun3.clone();

    new_sun1.move(sun2, sun3);
    new_sun2.move(sun1, sun3);
    new_sun3.move(sun1, sun2);

    sun1 = new_sun1;
    sun2 = new_sun2;
    sun3 = new_sun3;
}
