describe("the Marker class", function () {
    it("constructs properly", function () {
        var input = "(5x3)ABCDEB";
        var marker = new Marker(input);
        expect(marker.times).toEqual(3);
        expect(marker.jump).toEqual(10);
        expect(marker.repeat).toEqual("ABCDE");
    });

    it("constructs properly with bigger number", function () {
        var input = "(16x10)VALWVLALGUCXHAJT";
        var marker = new Marker(input);
        expect(marker.times).toEqual(10);
        expect(marker.repeat).toEqual("VALWVLALGUCXHAJT");
    });

    it("applies correctly the repeat", function () {
        var input = "(1x2)AB";
        var marker = new Marker(input);
        expect(marker.apply()).toEqual("AA");
    });

    it("handles brackets", function () {
        var input = "(4x2)A(23x12)B";
        var marker = new Marker(input);
        expect(marker.jump).toEqual(9);
        expect(marker.apply()).toEqual("A(23A(23");
    });
});

describe("day 9 examples", function () {
    var output;

    it("first", function () {
        output = decompress("ADVENT");
        expect(output).toEqual("ADVENT");
        expect(output.length).toEqual(6);
    });

    it("second", function () {
        output = decompress("A(1x5)BC");
        expect(output).toEqual("ABBBBBC");
        expect(output.length).toEqual(7);
    });

    it("third", function () {
        output = decompress("(3x3)XYZ");
        expect(output).toEqual("XYZXYZXYZ");
        expect(output.length).toEqual(9);
    });

    it("fourth", function () {
        output = decompress("A(2x2)BCD(2x2)EFG");
        expect(output).toEqual("ABCBCDEFEFG");
        expect(output.length).toEqual(11);
    });

    it("fifth", function () {
        output = decompress("(6x1)(1x3)A");
        expect(output).toEqual("(1x3)A");
        expect(output.length).toEqual(6);
    });

    it("sixth", function () {
        output = decompress("X(8x2)(3x3)ABCY");
        expect(output).toEqual("X(3x3)ABC(3x3)ABCY");
        expect(output.length).toEqual(18);
    });

    it("extra", function () {
        output = decompress("XLMMKD(19x1)CLTHZNGCSMZITKBOZBZ(16x10)VALWVLALGUCXHAJT");
        expect(output).toEqual("XLMMKDCLTHZNGCSMZITKBOZBZVALWVLALGUCXHAJTVALWVLALGUCXHAJTVALWVLALGUCXHAJTVALWVLALGUCXHAJTVALWVLALGUCXHAJTVALWVLALGUCXHAJTVALWVLALGUCXHAJTVALWVLALGUCXHAJTVALWVLALGUCXHAJTVALWVLALGUCXHAJT");
    });
});

describe("day 9 part 2 examples", function () {
    var output;

    it("first", function () {
        output = getDecompressLength("(3x3)XYZ");
        expect(output).toEqual(9);
    });

    it("second", function () {
        output = getDecompressLength("X(8x2)(3x3)ABCY");
        expect(output).toEqual(20);
    });

    it("third", function () {
        output = getDecompressLength("(27x12)(20x12)(13x14)(7x10)(1x12)A");
        expect(output).toEqual(241920);
    });

    it("fourth", function () {
        output = getDecompressLength("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN");
        expect(output).toEqual(445);
    });
});