describe("the Hacker class", function () {
    var hacker;
    beforeEach(function () {
        hacker = new Hacker("abcde");
    });

    it("has something to hash", function () {
        expect(hacker.getItemToHash()).toEqual("abcde0");
    });

    it("checks if the hash starts with 5 zeros", function () {
        hacker.id = "abc";
        hacker.index = 3231929;
        expect(hacker.startsWithFiveZeros()).toBeTruthy();
    });

    it("increases the index with 1 on every iteration", function () {
        hacker.iterate();
        expect(hacker.getItemToHash()).toEqual("abcde1");
    });

});

describe("md5 function", function () {
    it("test", function () {
        expect(md5('hello')).toEqual('5d41402abc4b2a76b9719d911017c592');
    });
});

xdescribe("day 5 examples", function () {
    it("first", function () {
        expect(getPassword("abc")).toEqual("05ace8e3");
    });
});