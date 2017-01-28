var EMPTY = "empty";
var OUTPUT = "output";
var BOT = "bot";
var outputs = [];
var bots = [];

function Bot(number) {
    this.low = EMPTY;
    this.high = EMPTY;
    this.number = parseInt(number);
    this.actions = [];
}

Bot.prototype.isFull = function () {
    return this.low !== EMPTY && this.high !== EMPTY;
};

Bot.prototype.takes = function (value) {
    if (this.low === EMPTY && this.high === EMPTY) {
        this.low = parseInt(value);
    }
    else if (this.isFull()) {
        throw new Error("Bot " + this.number + " can't take more, both hands are taken!");
    }
    else if (this.low !== EMPTY && value < this.low) {
        this.high = this.low;
        this.low = parseInt(value);
    }
    else {
        this.high = parseInt(value);
    }

    if (this.isFull() && this.actions.length > 0) {
        this.acts(this.actions.shift());
    }
};

Bot.prototype.gives = function (botNumber, isHigh) {
    if (!bots[botNumber]) {
        bots[botNumber] = new Bot(botNumber);
    }
    if (!isHigh) {
        bots[botNumber].takes(this.low);
        this.low = EMPTY;
    }
    else {
        bots[botNumber].takes(this.high);
        this.high = EMPTY;
    }
};

Bot.prototype.outputs = function (outputNumber, isHigh) {
    if (!outputs[outputNumber]) {
        outputs[outputNumber] = [];
    }
    if (!isHigh) {
        outputs[outputNumber].push(this.low);
        this.low = EMPTY;
    }
    else {
        outputs[outputNumber].push(this.high);
        this.high = EMPTY;
    }
};

Bot.prototype.acts = function (line) {
    if (line === undefined) {
        throw new Error("Bot " + this.number + " don't have actions to act from!");
    }
    console.log("Bot " + this.number + " gives away " + this.low + " and " + this.high);
    var regex = /(output|bot) (\d+)/g;
    for (var i = 0; i < 2; i++) {
        var match = regex.exec(line);
        if (match[1] === OUTPUT) {
            if (!bots[match[1]]) {
                bots[match[1]] = new Bot(match[1]);
            }
            this.outputs(match[2], i);
        }
        else if (match[1] === BOT) {
            this.gives(match[2], i)
        }
    }
};

function distribute(line) {
    var regex = /value (\d+) goes to bot (\d+)/;
    var match = regex.exec(line);
    if (!bots[match[2]]) {
        bots[match[2]] = new Bot(match[2]);
    }
    bots[match[2]].takes(match[1]);
}

function store(line) {
    var regex = /bot (\d+) ([\d|\w|\s]*)/;
    var match = regex.exec(line);

    if (!bots[match[1]]) {
        bots[match[1]] = new Bot(match[1]);
    }
    if (bots[match[1]].isFull()) {
        bots[match[1]].acts(match[2]);
    }
    else {
        bots[match[1]].actions.push(match[2]);
    }
}

function runLine(line) {
    if (line[0] === "b") {
        store(line, bots);
    }
    else if (line[0] === "v") {
        distribute(line, bots);
    }
}

function run(input) {
    input.forEach(function (line) {
       runLine(line, bots);
    });

    console.log(outputs[0][0]*outputs[1][0]*outputs[2][0]);
}