const fromString = (colorStr) => {
    let color = { r: 0, g: 0, b: 0, a: 1 };

    if (colorStr.startsWith('#')) {
        // short 3 hex #RGB
        if (colorStr.length === 4) {
            color.r = parseInt(colorStr.substr(1, 1), 16);
            color.g = parseInt(colorStr.substr(2, 1), 16);
            color.b = parseInt(colorStr.substr(3, 1), 16);
            color.r += 16 * color.r;
            color.g += 16 * color.g;
            color.b += 16 * color.b;
            return color;
        }

        // usual 6 hex #RRGGBB
        if (colorStr.length === 7) {
            color.r = parseInt(colorStr.substr(1, 2), 16);
            color.g = parseInt(colorStr.substr(3, 2), 16);
            color.b = parseInt(colorStr.substr(5, 2), 16);
            return color;
        }

        // hex with alpha #RRGGBBAA
        if (colorStr.length === 9) {
            color.r = parseInt(colorStr.substr(1, 2), 16);
            color.g = parseInt(colorStr.substr(3, 2), 16);
            color.b = parseInt(colorStr.substr(5, 2), 16);
            color.a = parseInt(colorStr.substr(7, 2), 16) / 255;
            return color;
        }
    }

    if (colorStr.startsWith('rgb(')) {
        let colorStrSplit = colorStr.substr(4)
                                .split(',')
                                .map(s => s.replace(')', ''))
                                .map(s => parseFloat(s, 10));

        color.r = colorStrSplit[0];
        color.g = colorStrSplit[1];
        color.b = colorStrSplit[2];
        return color;
    }

    if (colorStr.startsWith('rgba(')) {
        let colorStrSplit = colorStr.substr(5)
                                .split(',')
                                .map(s => s.replace(')', ''))
                                .map(s => parseFloat(s, 10));

        color.r = colorStrSplit[0];
        color.g = colorStrSplit[1];
        color.b = colorStrSplit[2];
        color.a = colorStrSplit[3];
        return color;
    }

    return color;
};

class ColorParse {
    constructor(color) {
        let type = typeof color;
        if (type === 'string') {
            this.color = fromString(color);
        } else if (type === 'number') {
            // todo uint 32
        } else if (type === 'object') {
            this.color = {
                r: color.r,
                g: color.g,
                b: color.b,
                a: 1,
            };
            if (color.a !== undefined) {
                this.color.a = color.a;
            }
        }
    }

    toRGB() {
        let c = this.color;
        return `rgb(${c.r},${c.g},${c.b})`;
    }

    toRGBA() {
        let c = this.color;
        return `rgba(${c.r},${c.g},${c.b},${c.a})`;
    }

    toHex() {
        let c = this.color;
        // let r, g, b;
        let inHex = [c.r, c.g, c.b]
            .map(x => x.toString(16).toUpperCase())
            .map(s => (s.length === 1 ? '0' : '') + s)
            .join('');
        return `#${inHex}`;
    }
}

module.exports = ColorParse;
