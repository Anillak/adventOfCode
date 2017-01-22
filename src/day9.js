function Marker(input) {
    var match = /(\d+)x(\d+)/.exec(input);
    var length = parseInt(match[1]);
    this.times = parseInt(match[2]);
    var markerLength = match[0].length + 2;
    this.jump =  markerLength + length;
    this.repeat = input.slice(markerLength, this.jump);
}

Marker.prototype.apply = function () {
    var output = "";
    for (var i = 0; i < this.times; i++) {
        output = output.concat(this.repeat);
    }
    return output;
};

function decompress(input) {
    var output = "";
    for (var i = 0; i < input.length; i++) {
        if (input[i] === "(") {
            var marker = new Marker(input.slice(i));
            output = output.concat(marker.apply());
            i = i + marker.jump - 1;
        }
        else {
            output = output.concat(input[i]);
        }
    }
    return output;
}

function VersionTwo(input) {
    var match = /(\d+)x(\d+)/.exec(input);
    this.length = parseInt(match[1]);
    this.times = parseInt(match[2]);
    this.jump = match[0].length + 2;
}

function getDecompressLength(input) {
    // Using the algorithm from https://github.com/rhardih/aoc/blob/master/2016/9p2.c

    var weights = [];
    for (var j = 0; j < input.length; j++) {
        weights.push(1);
    }

    var result = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] === "(") {
            var marker = new VersionTwo(input.slice(i));
            var start = i + marker.jump;
            var end = start + marker.length;
            for (var k = start; k < end; k++) {
                weights[k] *= marker.times;
            }
            i = start - 1;
        }
        else {
            result += weights[i];
        }
    }
    return result;
}