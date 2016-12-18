function getErrorCorrected(input) {
    var letters = new Array(8);
    var messages = input.split(",");

    for (var i = 0; i < messages.length; i++) {
        for (var j = 0; j < 8; j++) {
            if (!letters[j]) {
                letters[j] = [];
            }
            var current = messages[i][j];
            var item = letters[j].find(function (element) {
                return element.letter === current;
            });
            if (item) {
                item.value++;
            }
            else {
                letters[j].push({letter: messages[i][j], value: 1});
            }
        }
    }

    letters.map(function (array) {
        array.sort(function (a, b) {
            if (a.value > b.value) {
                return 1;
            }
            if (a.value < b.value) {
                return -1;
            }
            return 0;
        });
    });

    return letters.map(function (obj) {
        return obj[0].letter;
    }).reduce(function(a, b) {
        return a.concat(b);
    }, "");
}