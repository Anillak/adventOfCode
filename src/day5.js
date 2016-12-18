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

Hacker.prototype.getSixthPosition = function () {
    return this.getHash()[5];
};

function getPassword(input) {
    var hacker = new Hacker(input);
    var result = "";
    for (var i = 0; i < 8; i++) {
        while(!hacker.startsWithFiveZeros()) {
            hacker.iterate();
        }
        result = result.concat(hacker.getSixthPosition());
        hacker.iterate();
    }
    return result;
}