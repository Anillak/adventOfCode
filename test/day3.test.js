describe("triangle class", function () {
    it("constructs properly", function () {
        var triangle = new Triangle("810", "679","10");
        expect(triangle.a).toEqual(810);
        expect(triangle.b).toEqual(679);
        expect(triangle.c).toEqual(10);
    });

    it("checks correctness", function () {
        var triangle = new Triangle("5", "10", "25");
        expect(triangle.isProper()).toBeFalsy();

        triangle = new Triangle("16", "10", "25");
        expect(triangle.isProper()).toBeTruthy();
    });
});

describe("triangle construction", function () {
    it("constructs triangles using vertical sides", function () {
        var sides = ["101", "301", "501", "102", "302", "502", "103", "303", "503", "201", "401", "601", "202", "402", "602", "203", "403", "603"];
        var triangles = getTriangles(sides);
        expect(triangles[0].a).toEqual(101);
        expect(triangles[0].b).toEqual(102);
        expect(triangles[0].c).toEqual(103);
        expect(triangles[1].a).toEqual(301);
        expect(triangles[1].b).toEqual(302);
        expect(triangles[1].c).toEqual(303);
    });
});

describe("day 3 examples", function () {
    it("input", function () {
        var sides = readInputDay3("810  679   10 783  255  616 545  626  626 84  910  149 607  425  901 2 6 99");
        var triangles = getTriangles(sides);
        expect(triangles.length).toEqual(6);
        var triangle = triangles[2];
        expect(triangle.a).toEqual(10);
        expect(triangle.b).toEqual(616);
        expect(triangle.c).toEqual(626);
    });

    it("test", function () {
        var result = getNumberOfTriangles("810  679   10 783  255  616 545  626  626 84  910  149 607  425  901  2 6 99");
        expect(result).toEqual(2);
    });
});
