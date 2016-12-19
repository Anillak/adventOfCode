var directions = {
    "D": new Vector(0, 1),
    "L": new Vector(-1, 0),
    "U": new Vector(0, -1),
    "R": new Vector(1, 0)
};

var canGoTo = {
    "1": ["D"],
    "2": ["D", "R"],
    "3": ["D", "U", "L", "R"],
    "4": ["D", "L"],
    "5": ["R"],
    "6": ["D", "U", "L", "R"],
    "7": ["D", "U", "L", "R"],
    "8": ["D", "U", "L", "R"],
    "9": ["L"],
    "A": ["U", "R"],
    "B": ["D", "U", "L", "R"],
    "C": ["U", "L"],
    "D": ["U"]
};

function NumPad(x, y) {
    this.position = new Vector(x, y);
    this.numpad = new Array(3);
    this.numpad[0] = ["", "", "1", "", ""];
    this.numpad[1] = ["", "2", "3", "4", ""];
    this.numpad[2] = ["5", "6", "7", "8", "9"];
    this.numpad[3] = ["", "A", "B", "C", ""];
    this.numpad[4] = ["", "", "D", "", ""];
}

NumPad.prototype.move = function (direction) {
    if(canGoTo[this.numpad[this.position.y][this.position.x]].indexOf(direction) != -1)
    {
        this.position = this.position.plus(directions[direction]);
    }
};

NumPad.prototype.getSingleCodeFromLine = function (line) {
    for (var i = 0, len = line.length; i < len; i++) {
        this.move(line[i]);
    }
    return this.numpad[this.position.y][this.position.x];
};

function getCode(input) {
    var code = readInput(input, "\n");
    var np = new NumPad(0, 2);
    var result = "";
    code.forEach(function (line) {
        result = result.concat(np.getSingleCodeFromLine(line));
    });
    return result;
}