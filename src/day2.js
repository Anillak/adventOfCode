function readInputDay2(input) {
    return input.split("\n");
}

function NumPadVector(x, y) {
    this.x = x;
    this.y = y;
}

NumPadVector.prototype.plus = function (other) {
    var newX = this.x + other.x;
    if (newX < 0) newX = 0;
    else if (newX > 2) newX = 2;
    var newY = this.y + other.y;
    if (newY < 0) newY = 0;
    else if (newY > 2) newY = 2;
    return new NumPadVector(newX, newY);
};

function NumPad(x, y) {
    this.position = new NumPadVector(x, y);
    this.numpad = new Array(3);
    this.numpad[0] = [1, 2, 3];
    this.numpad[1] = [4, 5, 6];
    this.numpad[2] = [7, 8, 9];
}

var numDirections = {
    "D": new NumPadVector(0, 1),
    "L": new NumPadVector(-1, 0),
    "U": new NumPadVector(0, -1),
    "R": new NumPadVector(1, 0)
};

NumPad.prototype.move = function (direction) {
    this.position = this.position.plus(numDirections[direction]);
};

NumPad.prototype.getSingleCodeFromLine = function (line) {
    for (var i = 0, len = line.length; i < len; i++) {
        this.move(line[i]);
    }
    return this.numpad[this.position.y][this.position.x];
};

function getCode(input) {
    var code = readInputDay2(input);
    var np = new NumPad(1, 1);
    var result = "";
    code.forEach(function (line) {
        result = result.concat(np.getSingleCodeFromLine(line));
    });
    return result;
}