describe("translate input functions", function () {
    var screen;
    beforeEach(function () {
        screen = new Screen(7, 3);
    });

    it("calls the function to construct a rect", function () {
        var input = "rect 1x1";
        spyOn(screen, "createRect");
        screen.translateInput(input);
        expect(screen.createRect).toHaveBeenCalled();
        expect(screen.createRect).toHaveBeenCalledWith(1, 1);
    });

    it("calls the function to rotate a column", function () {
        var input = "rotate column x=7 by 1";
        spyOn(screen, "rotateColumn");
        screen.translateInput(input);
        expect(screen.rotateColumn).toHaveBeenCalled();
        expect(screen.rotateColumn).toHaveBeenCalledWith(7, 1);
    });

    it("calls the function to rotate a row", function () {
        var input = "rotate row y=1 by 12";
        spyOn(screen, "rotateRow");
        screen.translateInput(input);
        expect(screen.rotateRow).toHaveBeenCalled();
        expect(screen.rotateRow).toHaveBeenCalledWith(1, 12);
    });
});

describe("day 8 examples", function () {
    var screen;
    beforeEach(function () {
        screen = new Screen(7, 3);
    });

    it("create rect function", function () {
        var input = "rect 3x2";
        screen.translateInput(input);
        expect(screen.screen[0]).toEqual(["#", "#", "."]);
        expect(screen.screen[1]).toEqual(["#", "#", "."]);
        expect(screen.screen[2]).toEqual(["#", "#", "."]);
        expect(screen.screen[3]).toEqual([".", ".", "."]);
        expect(screen.screen[4]).toEqual([".", ".", "."]);
        expect(screen.screen[5]).toEqual([".", ".", "."]);
        expect(screen.screen[6]).toEqual([".", ".", "."]);
    });

    it("rotate column function", function () {
        screen.createRect(3, 2);
        var input = "rotate column x=1 by 1";
        screen.translateInput(input);
        expect(screen.screen[0]).toEqual(["#", "#", "."]);
        expect(screen.screen[1]).toEqual([".", "#", "#"]);
        expect(screen.screen[2]).toEqual(["#", "#", "."]);
        expect(screen.screen[3]).toEqual([".", ".", "."]);
        expect(screen.screen[4]).toEqual([".", ".", "."]);
        expect(screen.screen[5]).toEqual([".", ".", "."]);
        expect(screen.screen[6]).toEqual([".", ".", "."]);
    });

    it("rotate row function", function () {
        screen.createRect(3, 2);
        screen.rotateColumn(1, 1);
        var input = "rotate row y=0 by 4";
        screen.translateInput(input);
        expect(screen.screen[0]).toEqual([".", "#", "."]);
        expect(screen.screen[1]).toEqual([".", "#", "#"]);
        expect(screen.screen[2]).toEqual([".", "#", "."]);
        expect(screen.screen[3]).toEqual([".", ".", "."]);
        expect(screen.screen[4]).toEqual(["#", ".", "."]);
        expect(screen.screen[5]).toEqual([".", ".", "."]);
        expect(screen.screen[6]).toEqual(["#", ".", "."]);
    });

    it("rotate column function again", function () {
        screen.createRect(3, 2);
        screen.rotateColumn(1, 1);
        screen.rotateRow(0, 4);
        var input = "rotate column x=1 by 1";
        screen.translateInput(input);
        expect(screen.screen[0]).toEqual([".", "#", "."]);
        expect(screen.screen[1]).toEqual(["#", ".", "#"]);
        expect(screen.screen[2]).toEqual([".", "#", "."]);
        expect(screen.screen[3]).toEqual([".", ".", "."]);
        expect(screen.screen[4]).toEqual(["#", ".", "."]);
        expect(screen.screen[5]).toEqual([".", ".", "."]);
        expect(screen.screen[6]).toEqual(["#", ".", "."]);
    });
});