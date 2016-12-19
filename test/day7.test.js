describe("the IP class", function () {
    var ip;
    beforeEach(function () {
        ip = new IP("abba[mnop]qrst");
    });

    it("constructs correctly", function () {
        expect(ip.inside).toEqual(["mnop"]);
        expect(ip.outside).toEqual(["abba", "qrst"]);

        var complicatedIP = new IP("itgslvpxoqqakli[arktzcssgkxktejbno]wsgkbwwtbmfnddt[zblrboqsvezcgfmfvcz]iwyhyatqetsreeyhh");
        expect(complicatedIP.inside).toEqual(["arktzcssgkxktejbno", "zblrboqsvezcgfmfvcz"]);
        expect(complicatedIP.outside).toEqual(["itgslvpxoqqakli", "wsgkbwwtbmfnddt", "iwyhyatqetsreeyhh"]);
    });

    it("has helper functions for abba", function () {
        expect(isAbba("abba")).toBeTruthy();
        expect(isAbba("aaaa")).toBeFalsy();
        expect(isAbba("baba")).toBeFalsy();
        expect(isAbba("axyyxb")).toBeTruthy();
        expect(isAbba("sdfdgfaxzzxb")).toBeTruthy();
    });

    it("checks if the ip supports TLS", function () {
        expect(ip.supportsTLS()).toBeTruthy();
    });

});

describe("day 7 examples", function () {
    it("first", function () {
        var ip = new IP("abba[mnop]qrst");
        expect(ip.supportsTLS()).toBeTruthy();
    });

    it("second", function () {
        var ip = new IP("abcd[bddb]xyyx");
        expect(ip.supportsTLS()).toBeFalsy();
    });

    it("third", function () {
        var ip = new IP("aaaa[qwer]tyui");
        expect(ip.supportsTLS()).toBeFalsy();
    });

    it("fourth", function () {
        var ip = new IP("ioxxoj[asdfgh]zxcvbn");
        expect(ip.supportsTLS()).toBeTruthy();
    });

    it("fifth", function () {
        var ip = new IP("itgslvpxoqqakli[arktzcssgkxktejbno]wsgkbwwtbmfnddt[zblrboqsvezcgfmfvcz]iwyhyatqetsreeyhh");
        expect(ip.supportsTLS()).toBeFalsy();
    });

});