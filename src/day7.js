function isAbba(string) {
    var isAbba = false;
    for (var i = 0; i < string.length-3; i++) {
        if (string[i] === string[i+3] && string[i+1] === string[i+2] && string[i] !== string[i+1]) {
            isAbba = true;
        }
    }
    return isAbba;
}

function hasAbba(array) {
    var result = false;
    array.forEach(function (item) {
        if (isAbba(item)) {
            result = true;
        }
    });
    return result;
}

function getAbas(string) {
    var abas = [];
    for (var i = 0; i < string.length-2; i++) {
        if (string[i] === string[i+2] && string[i] !== string[i+1]) {
            abas.push(string[i]+string[i+1]+string[i+2]);
        }
    }
    return abas;
}

function hasBab(string, aba) {
    var hasBab = false;
    for (var i = 0; i < string.length-2; i++) {
        if (string[i] === aba[1] && string[i+1] === aba[0] && string[i+2] === aba[1]) {
            hasBab = true;
        }
    }
    return hasBab;
}

function IP(string) {
    this.inside = [];
    this.outside = [];

    var brackets = /\[([a-z]+)\]/g;
    var bracketsMatches;
    while(bracketsMatches = brackets.exec(string)) {
        this.inside.push(bracketsMatches[1]);
    }

    var letters = /\]([a-z]+)|([a-z]+)\[/g;
    var lettersMatches;
    while(lettersMatches = letters.exec(string)) {
        if(lettersMatches[1]) {
            this.outside.push(lettersMatches[1]);
        }
        if(lettersMatches[2]) {
            this.outside.push(lettersMatches[2]);
        }
    }
}

IP.prototype.supportsTLS = function () {
    return !hasAbba(this.inside, isAbba) && hasAbba(this.outside, isAbba);
};

IP.prototype.supportsSSL = function () {
    var abas = [];
    for (var i = 0; i < this.outside.length; i++)
    {
        abas.push(getAbas(this.outside[i]));
    }
    abas = abas.reduce(function(a, b) {
        return a.concat(b);
    }, []);
    var result = false;
    for (var j = 0; j < abas.length; j++)
    {
        for (var k = 0; k < this.inside.length; k++) {
            if (hasBab(this.inside[k], abas[j])) {
                result = true;
            }
        }
    }
    return result;
};

function getCountOfTLSSupportingIPs(input) {
    var ips = readInput(input, ",");
    var count = 0;
    ips.forEach(function (string) {
        var ip = new IP(string);
        if (ip.supportsTLS()) {
            count++;
        }
    });
    return count;
}

function getCountOfSSLSupportingIPs(input) {
    var ips = readInput(input, ",");
    var count = 0;
    ips.forEach(function (string) {
        var ip = new IP(string);
        if (ip.supportsSSL()) {
            count++;
        }
    });
    return count;
}