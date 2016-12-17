describe("the input reader", function () {
    it("handles empty input", function () {
        var input = "";
        var array = readInputDay1(input);
        expect(array.length).toBe(1);
        expect(array[0]).toEqual("");
    });

    it("puts element in an array", function () {
        var input = "R1";
        var array = readInputDay1(input);
        expect(array.length).toBe(1);
        expect(array[0]).toEqual("R1");
    });

    it("separated with comma", function () {
        var input = "R1,L2";
        var array = readInputDay1(input);
        expect(array.length).toBe(2);
        expect(array[0]).toEqual("R1");
        expect(array[1]).toEqual("L2");
    });

    it("cleans white spaces", function () {
        var input = "R1, L2";
        var array = readInputDay1(input);
        expect(array.length).toBe(2);
        expect(array[0]).toEqual("R1");
        expect(array[1]).toEqual("L2");
    });
});

describe("the vector block function", function () {
    var start = new RoadVector(0, 0);

    it("handles x movement", function () {
        var end = new RoadVector(3, 0);
        expect(end.blocks(start)).toEqual(3);
    });

    it("handles negative x movement", function () {
        var end = new RoadVector(-3, 0);
        expect(end.blocks(start)).toEqual(3);
    });

    it("handles more complex places", function () {
        var end = new RoadVector(2, 3);
        expect(end.blocks(start)).toEqual(5);
    });

    it("handles different start vector", function () {
        var anyplace = new RoadVector(2, 3);
        var end = new RoadVector(5, 2);
        expect(end.blocks(anyplace)).toEqual(4);
    });

    it("handles two negatives", function () {
        var end = new RoadVector(-5, -2);
        expect(end.blocks(start)).toEqual(7);
    });

});

describe("taxicab class", function () {
    var taxi;

    beforeEach(function () {
        taxi = new Taxicab();
    });

    it("has a direction and a position", function () {
        expect(directionNames[taxi.index]).toEqual("n");
        expect(taxi.position).toEqual(new RoadVector(0, 0));
    });

    it("moves without changing direction", function () {
        taxi.move(1);
        expect(directionNames[taxi.index]).toEqual("n");
        expect(taxi.position).toEqual(new RoadVector(0, -1));
    });

    it("moves multiple steps", function () {
        taxi.move(5);
        expect(taxi.position).toEqual(new RoadVector(0, -5));
    });

    it("can turn right", function () {
        taxi.turnRight();
        expect(directionNames[taxi.index]).toEqual("e");
        taxi.turnRight();
        expect(directionNames[taxi.index]).toEqual("s");
        taxi.turnRight();
        expect(directionNames[taxi.index]).toEqual("w");
        taxi.turnRight();
        expect(directionNames[taxi.index]).toEqual("n");
    });

    it("can turn left", function () {
        taxi.turnLeft();
        expect(directionNames[taxi.index]).toEqual("w");
        taxi.turnLeft();
        expect(directionNames[taxi.index]).toEqual("s");
        taxi.turnLeft();
        expect(directionNames[taxi.index]).toEqual("e");
        taxi.turnLeft();
        expect(directionNames[taxi.index]).toEqual("n");
    });

    it("can apply simple instructions", function () {
        var instruction = "R1";
        taxi.applyInstruction(instruction);
        expect(directionNames[taxi.index]).toEqual("e");
        expect(taxi.position).toEqual(new RoadVector(-1, 0));
    });

    it("can apply complex instructions", function () {
        var instruction = "L22";
        taxi.applyInstruction(instruction);
        expect(directionNames[taxi.index]).toEqual("w");
        expect(taxi.position).toEqual(new RoadVector(22, 0));

        instruction = "L34";
        taxi.applyInstruction(instruction);
        expect(directionNames[taxi.index]).toEqual("s");
        expect(taxi.position).toEqual(new RoadVector(22, 34));

        instruction = "R60";
        taxi.applyInstruction(instruction);
        expect(directionNames[taxi.index]).toEqual("w");
        expect(taxi.position).toEqual(new RoadVector(82, 34));
    });
});

describe("text examples", function () {
    it("first", function () {
        var result = getLastPosition("R2, L3");
        expect(result).toEqual(5);
    });

    it("second", function () {
        var result = getLastPosition("R2, R2, R2");
        expect(result).toEqual(2);
    });

    it("third", function () {
        var result = getLastPosition("R5, L5, R5, R3");
        expect(result).toEqual(12);
    });
});