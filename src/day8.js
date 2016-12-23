function Screen(width, height) {
    this.width = width;
    this.height = height;
    this.screen = [];
    for (var x = 0; x < width; x++) {
        var line = [];
        for (var y = 0; y < height; y++) {
            line.push(".");
        }
        this.screen.push(line);
    }
}

Screen.prototype.print = function () {
    var result = "";
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            result = result.concat(this.screen[x][y] + " ");
        }
        result = result.concat("\n");
    }
    console.log(result);
};

Screen.prototype.createRect = function (width, height) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            this.screen[x][y] = "#";
        }
    }
};

Screen.prototype.rotateRow = function (row, count) {
    var oldRow = [];
    for (var x = 0; x < this.width; x++) {
        oldRow.push(this.screen[x][row]);
    }

    for (x = 0; x < this.width; x++) {
        var next = (x + count) % this.width;
        this.screen[next][row] = oldRow[x];
    }
};

Screen.prototype.rotateColumn = function (column, count) {
    for (var i = 0; i < count; i++) {
        var popped = this.screen[column].pop();
        this.screen[column].unshift(popped);
    }
};

Screen.prototype.translateInput = function (line) {
    if (line.indexOf("rect") != -1) {
        var rectEx = /rect ([0-9]+)x([0-9]+)/;
        var rectInputs;
        rectInputs = rectEx.exec(line);
        this.createRect(parseInt(rectInputs[1]), parseInt(rectInputs[2]));
    }
    else if (line.indexOf("rotate row") != -1) {
        var rowEx = /rotate row y=([0-9]+) by ([0-9]+)/;
        var columnInputs;
        columnInputs = rowEx.exec(line);
        this.rotateRow(parseInt(columnInputs[1]), parseInt(columnInputs[2]));
    }
    else if (line.indexOf("rotate column") != -1) {
        var columnEx = /rotate column x=([0-9]+) by ([0-9]+)/;
        var rowInputs;
        rowInputs = columnEx.exec(line);
        this.rotateColumn(parseInt(rowInputs[1]), parseInt(rowInputs[2]));
    }
};

function countLitPixels(screen) {
    var count = 0;
    for (var x = 0; x < screen.width; x++) {
        for (var y = 0; y < screen.height; y++) {
            if (screen.screen[x][y] == "#") {
                count++;
            }
        }
    }
    return count;
}

function showOutput(lines) {
    var screen = new Screen(50, 6);
    lines.forEach(function (line) {
        console.log(line);
        screen.translateInput(line);
        screen.print();
    });
    console.log(countLitPixels(screen));
}