describe("the input reader", function () {
    it("handles new lines", function () {
        var input = "AAAA" + "\n" + "BBB" + "\n" + "CC";
        var array = readInputDay2(input);
        expect(array.length).toBe(3);
        expect(array[0]).toEqual("AAAA");
        expect(array[1]).toEqual("BBB");
        expect(array[2]).toEqual("CC");
    });
});

describe("the numpad class", function () {
    var pad;
    beforeEach(function () {
        pad = new NumPad(1, 1);
    });

    it("gets constructed", function () {
        expect(pad.position).toEqual(new NumPadVector(1, 1));
        expect(pad.numpad[0]).toEqual([1, 2, 3]);
        expect(pad.numpad[1][2]).toEqual(6);
        expect(pad.numpad[2][0]).toEqual(7);
    });

    it("changed its position", function () {
        pad.move("U");
        expect(pad.position).toEqual(new NumPadVector(1, 0));
    });

    it("never gets out of boundaries", function () {
        pad.move("U");
        expect(pad.position).toEqual(new NumPadVector(1, 0));
        pad.move("U");
        expect(pad.position).toEqual(new NumPadVector(1, 0));
        pad.move("D");
        expect(pad.position).toEqual(new NumPadVector(1, 1));
        pad.move("D");
        expect(pad.position).toEqual(new NumPadVector(1, 2));
        pad.move("D");
        expect(pad.position).toEqual(new NumPadVector(1, 2));
        pad.move("L");
        expect(pad.position).toEqual(new NumPadVector(0, 2));
        pad.move("L");
        expect(pad.position).toEqual(new NumPadVector(0, 2));
        pad.move("R");
        expect(pad.position).toEqual(new NumPadVector(1, 2));
        pad.move("R");
        expect(pad.position).toEqual(new NumPadVector(2, 2));
        pad.move("R");
        expect(pad.position).toEqual(new NumPadVector(2, 2));
    });

    it("follows a line of instructions", function () {
        pad.getSingleCodeFromLine("UURRDLD");
        expect(pad.position).toEqual(new NumPadVector(1, 2));
    });
});

describe("day 2 examples", function () {
    it("example", function () {
        var result = getCode("ULL" + "\n" +
            "RRDDD" + "\n" +
            "LURDL" + "\n" +
            "UUUUD");
        expect(result).toEqual("1985");
    });
});