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
    return !hasAbba(this.inside) && hasAbba(this.outside);
};

function getCountOfSupportingIPs(input) {
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