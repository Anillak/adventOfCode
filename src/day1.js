function readInputDay1(input) {
    var trimmed = input.replace(/ /g, '');
    return trimmed.split(",");
}

function RoadVector(x, y) {
    this.x = x;
    this.y = y;
}

RoadVector.prototype.plus = function (other) {
    return new RoadVector(this.x + other.x, this.y + other.y);
};

RoadVector.prototype.minus = function (other) {
    return new RoadVector(this.x - other.x, this.y - other.y);
};

RoadVector.prototype.multiply = function (scalar) {
    return new RoadVector(this.x * scalar, this.y * scalar);
};

RoadVector.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

RoadVector.prototype.blocks = function (start) {
    return Math.abs(this.x - start.x) + Math.abs(this.y - start.y);
};

var directions = {
    "n": new RoadVector(0, -1),
    "e": new RoadVector(-1, 0),
    "s": new RoadVector(0, 1),
    "w": new RoadVector(1, 0)
};

var directionNames = "n e s w".split(" ");

function Taxicab() {
    this.index = 0;
    this.position = new RoadVector(0, 0);
    this.visitedPositions = [this.position];
    this.visitedTwice = [];
}

Taxicab.prototype.turnRight = function () {
    this.index = (this.index + 1) % 4;
};

Taxicab.prototype.turnLeft = function () {
    if (this.index === 0)
        this.index = 3;
    else
        this.index = this.index - 1;
};

Taxicab.prototype.wasAlreadyHere = function () {
    var currentPosition = this.position;
    return this.visitedPositions.find(function (position) {
        return position.x === currentPosition.x && position.y === currentPosition.y;
    })
};

Taxicab.prototype.move = function (steps) {
    for (var i = 0; i < steps; i++) {
        this.position = this.position.plus(directions[directionNames[this.index]]);
        if (this.wasAlreadyHere()) {
            this.visitedTwice.push(this.position);
        }
        this.visitedPositions.push(this.position);
    }
};

Taxicab.prototype.applyInstruction = function (instruction) {
    var turn = instruction[0];
    if (turn === "R") {
        this.turnRight();
    }
    else if (turn === "L") {
        this.turnLeft()
    }

    var steps = instruction.replace(turn, "");
    return this.move(steps);
};

Taxicab.prototype.getBlocksToPay = function () {
    return this.position.blocks(new RoadVector(0, 0));
};

function getBlocksToLastPosition(input) {
    var instructions = readInputDay1(input);
    var taxi = new Taxicab();
    instructions.forEach(function (instruction) {
        taxi.applyInstruction(instruction);
    });
    return taxi.getBlocksToPay();
}

function getBlocksToFirstSecondedPosition(input) {
    var instructions = readInputDay1(input);
    var taxi = new Taxicab();
    instructions.forEach(function (instruction) {
        taxi.applyInstruction(instruction);
    });
    taxi.position = taxi.visitedTwice[0];
    return taxi.getBlocksToPay();
}