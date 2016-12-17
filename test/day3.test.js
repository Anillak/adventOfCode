describe("triangle class", function () {
    it("constructs properly", function () {
        var triangle = new Triangle("810  679   10");
        expect(triangle.a).toEqual(810);
        expect(triangle.b).toEqual(679);
        expect(triangle.c).toEqual(10);
    });

    it("checks correctness", function () {
        var triangle = new Triangle("5 10 25");
        expect(triangle.isProper()).toBeFalsy();

        triangle = new Triangle("16 10 25");
        expect(triangle.isProper()).toBeTruthy();
    });
});

describe("examples", function () {
    it("input", function () {
        var triangles = readInputDay3("810  679   10" + "\n" + "783  255  616" + "\n" + "545  626  626" + "\n" + "84  910  149" + "\n" + "607  425  901");
        expect(triangles.length).toEqual(5);
        var triangle = new Triangle(triangles[2]);
        expect(triangle.a).toEqual(545);
        expect(triangle.b).toEqual(626);
        expect(triangle.c).toEqual(626);
    });

    it("test", function () {
        var result = getNumberOfTriangles("810  679   10" + "\n" + "783  255  616" + "\n" + "545  626  626" + "\n" + "84  910  149" + "\n" + "607  425  901");
        expect(result).toEqual(3);
    });
});
