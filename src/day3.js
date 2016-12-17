function readInputDay3(input) {
    return input.split("\n");
}

function Triangle(sides) {
    var trimmed = sides.replace(/\s+/g, ',');
    var array = trimmed.split(",");
    this.a = parseInt(array[0], 10);
    this.b = parseInt(array[1], 10);
    this.c = parseInt(array[2], 10);
}

Triangle.prototype.isProper = function () {
    if (this.a + this.b <= this.c) return false;
    if (this.a + this.c <= this.b) return false;
    if (this.c + this.b <= this.a) return false;
    return true;
};

function getNumberOfTriangles(input) {
    var triangles = readInputDay3(input);
    var count = 0;
    triangles.forEach(function (sides) {
        var triangle = new Triangle(sides);
        if (triangle.isProper()) {
            count++;
        }
    });
    return count;
}