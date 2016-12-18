describe("the helper functions", function () {
    it("getChecksum extracts the checksum out of a string", function () {
        var input = "339[zmxdi]";
        expect(getChecksum(input)).toEqual("zmxdi");
    });

    it("getID extracts the id", function () {
        var input = "743[itbds]";
        expect(getID(input)).toEqual(743);
    });

    it("getLetters returns just a string of all letters", function () {
        var input = "drxevkzt-upv-crsfirkfip-893[rfikp]".split("-");
        expect(getLetters(input)).toEqual("drxevkztupvcrsfirkfip");
    });
});

describe("the Room class", function () {
    var room;
    beforeEach(function () {
        room = new Room("aaaaa-bbb-z-y-x-123[abxyz]");
    });

    it("has checksum", function () {
        expect(room.checksum).toEqual("abxyz");
    });

    it("has id", function () {
        expect(room.id).toEqual(123);
    });

    it("has letters", function () {
        expect(room.letters).toEqual("aaaaabbbzyx");
    });

    it("constructs an alphabet array with letters and how many times they occur", function () {
        var alphabet = room.constructAlphabet();
        expect(alphabet).toContain({letter: "a", value: 5});
        expect(alphabet).toContain({letter: "b", value: 3});
        expect(alphabet).toContain({letter: "x", value: 1});
        expect(alphabet).toContain({letter: "y", value: 1});
        expect(alphabet).toContain({letter: "z", value: 1});
        expect(alphabet.length).toEqual(5);
    });

    it("can sort letters by occurence", function () {
        var alphabet = [{letter: "b", value: 4}, {letter: "l", value: 2}, {letter: "a", value: 2}, {letter: "d", value: 7}];
        room.sortAlphabet(alphabet);
        expect(alphabet[0].letter).toEqual("d");
        expect(alphabet[1].letter).toEqual("b");
        expect(alphabet[2].letter).toEqual("a");
        expect(alphabet[3].letter).toEqual("l");
    });

    it("can compute its real checksum", function () {
        expect(room.getRealChecksum()).toEqual("abxyz");
    });

    it("can check if it is real room", function () {
        expect(room.isRealRoom()).toBeTruthy();
    });
});


describe("sum of ids", function () {
    it("sums the ids of the real rooms", function () {
        var result = getSumOfIDs("aaaaa-bbb-z-y-x-123[abxyz],a-b-c-d-e-f-g-h-987[abcde],not-a-real-room-404[oarel],totally-real-room-200[decoy]");
        expect(result).toEqual(1514);
    });
});

describe("day 4 examples", function () {
    it("first", function () {
        var room = new Room("aaaaa-bbb-z-y-x-123[abxyz]");
        expect(room.isRealRoom()).toBeTruthy();
    });

    it("second", function () {
        var room = new Room("a-b-c-d-e-f-g-h-987[abcde]");
        expect(room.isRealRoom()).toBeTruthy();
    });

    it("third", function () {
        var room = new Room("not-a-real-room-404[oarel]");
        expect(room.isRealRoom()).toBeTruthy();
    });

    it("fourth", function () {
        var room = new Room("totally-real-room-200[decoy]");
        expect(room.isRealRoom()).toBeFalsy();
    });
});