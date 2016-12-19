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

    it("has a helper functions for abba", function () {
        expect(isAbba("abba")).toBeTruthy();
        expect(isAbba("aaaa")).toBeFalsy();
        expect(isAbba("baba")).toBeFalsy();
        expect(isAbba("axyyxb")).toBeTruthy();
        expect(isAbba("sdfdgfaxzzxb")).toBeTruthy();
    });

    it("has a helper functions for aba", function () {
        expect(getAbas("aba")).toEqual(["aba"]);
        expect(getAbas("aaaa")).toEqual([]);
        expect(getAbas("baba")).toEqual(["bab","aba"]);
        expect(getAbas("axyyxb")).toEqual([]);
        expect(getAbas("sdfdgfaxzzxb")).toEqual(["dfd"]);
    });

    it("has a helper function for bab", function () {
        expect(hasBab("aba", "bab")).toBeTruthy();
        expect(hasBab("xyzaz", "aza")).toBeTruthy();
        expect(hasBab("abcde", "lol")).toBeFalsy();
        expect(hasBab("hohoho", "jaj")).toBeFalsy();
        expect(hasBab("ohwell", "bab")).toBeFalsy();
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

    it("first v2", function () {
        var ip = new IP("aba[bab]xyz");
        expect(ip.supportsSSL()).toBeTruthy();
    });

    it("second v2", function () {
        var ip = new IP("xyx[xyx]xyx");
        expect(ip.supportsSSL()).toBeFalsy();
    });

    it("third v2", function () {
        var ip = new IP("aaa[kek]eke");
        expect(ip.supportsSSL()).toBeTruthy();
    });

    it("fourth v2", function () {
        var ip = new IP("zazbz[bzb]cdb");
        expect(ip.supportsSSL()).toBeTruthy();
    });

    it("fifth v2", function () {
        var ip = new IP("itgslvpxoqqakli[arktzcssgkxktejbno]wsgkbwwtbmfmddt[zblrboqsvezcgfmfvcz]iwyhyatqetsreeyhh");
        expect(ip.supportsSSL()).toBeTruthy();
    });

});