function readInput(input, separator) {
    return input.split(separator);
}

function trimInput(input, replace) {
    return input.replace(/\s+/g, replace);
}

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.minus = function (other) {
    return new Vector(this.x - other.x, this.y - other.y);
};

Vector.prototype.multiply = function (scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
};

Vector.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.blocks = function (start) {
    return Math.abs(this.x - start.x) + Math.abs(this.y - start.y);
};