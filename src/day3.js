function Triangle(a, b, c) {
    this.a = parseInt(a, 10);
    this.b = parseInt(b, 10);
    this.c = parseInt(c, 10);
}

Triangle.prototype.isProper = function () {
    if (this.a + this.b <= this.c) return false;
    if (this.a + this.c <= this.b) return false;
    if (this.c + this.b <= this.a) return false;
    return true;
};

function getTriangles(sides) {
    var triangles = [];
    for (var i = 0; i < sides.length; i = i+9) {
        for (var j = 0; j < 3; j++) {
            var triangle = new Triangle(sides[i+j], sides[i+j + 3], sides[i+j + 6]);
            triangles.push(triangle);
        }
    }
    return triangles;
}

function getNumberOfTriangles(input) {
    var sides = readInput(trimInput(input, " "), " ");
    var count = 0;
    var triangles = getTriangles(sides);
    triangles.forEach(function (triangle) {
        if (triangle.isProper()) {
            count++;
        }
    });
    return count;
}