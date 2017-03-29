const ColorParse = require('./ColorParse.js');

class Color {
    constructor(color) {
        this.color = ColorParse(color);
        // console.log(this.color);
    }
}

module.exports = Color;
