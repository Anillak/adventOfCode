function readInputDay4(input) {
    return input.split(",");
}

function getChecksum(string) {
    var regExp = /\[([^\]]+)\]/;
    var matches = regExp.exec(string);
    return matches[1];
}

function getID(string) {
    return parseInt(string.split("[")[0]);
}

function getLetters(array) {
    var result = "";
    for (var i = 0; i < array.length - 1; i++) {
        result = result.concat(array[i]);
    }
    return result;
}

function Room(string) {
    var parts = string.split("-");
    this.checksum = getChecksum(parts[parts.length - 1]);
    this.id = getID(parts[parts.length - 1]);
    this.letters = getLetters(parts);
}

Room.prototype.constructAlphabet = function () {
    var alphabet = [];
    for (var i = 0; i < this.letters.length; i++) {
        var current = this.letters[i];
        var item = alphabet.find(function (element) {
            return element.letter === current;
        });
        if (item) {
            item.value++;
        }
        else {
            alphabet.push({letter: this.letters[i], value: 1});
        }
    }
    return alphabet;
};

Room.prototype.sortAlphabet = function (alphabet) {
    alphabet.sort(function (a, b) {
        if (a.value < b.value) {
            return 1;
        }
        if (a.value > b.value) {
            return -1;
        }
        if (a.value === b.value) {
            if (a.letter > b.letter) {
                return 1;
            }
            if (a.letter < b.letter) {
                return -1;
            }
        }
        return 0;
    });
};

Room.prototype.getRealChecksum = function () {
    var alphabet = this.constructAlphabet();
    this.sortAlphabet(alphabet);
    var result = "";
    for (var j = 0; j < 5; j++) {
        result = result.concat(alphabet[j].letter);
    }
    return result;
};

Room.prototype.isRealRoom = function () {
    return this.getRealChecksum() === this.checksum;
};

function getSumOfIDs(input) {
    var rooms = readInputDay4(input);
    var result = 0;
    for (var j = 0; j < rooms.length; j++) {
        var room = new Room(rooms[j]);
        if (room.isRealRoom()) {
            result = result + room.id;
        }
    }
    return result;
}