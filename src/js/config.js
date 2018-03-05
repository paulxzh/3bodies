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
