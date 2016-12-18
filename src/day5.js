function Hacker(input) {
    this.id = input;
    this.index = 0;
}

Hacker.prototype.getItemToHash = function () {
    return this.id + this.index;
};

Hacker.prototype.iterate = function () {
    return this.index++;
};

Hacker.prototype.getHash = function () {
    return md5(this.getItemToHash());
};

Hacker.prototype.startsWithFiveZeros = function () {
    return this.getHash().substring(0, 5) === "00000";
};

Hacker.prototype.getPosition = function () {
    return parseInt(this.getHash()[5]);
};

Hacker.prototype.getValue = function () {
    return this.getHash()[6];
};

Hacker.prototype.isValidPosition = function () {
    return this.getPosition() < 8 && this.getPosition() >= 0;
};

function getPassword(input) {
    var hacker = new Hacker(input);
    var result = "________".split("");
    for (var i = 0; i < 8; i++) {
        while(!(hacker.startsWithFiveZeros() && hacker.isValidPosition() && result[hacker.getPosition()] == "_")) {
            hacker.iterate();
        }
        result[hacker.getPosition()] = hacker.getValue();
        hacker.iterate();
    }
    return result.reduce(function(a, b) {
        return a.concat(b);
    }, "");
}