/* eslint-env jasmine */
const ColorParse = require('./ColorParse.js');

const COLORS = {
    white: {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
        hex3: '#FFF',
        hex6: '#FFFFFF',
        hex8: '#FFFFFFFF',
        h: 0,
        s: 0,
        l: 0,
    },
    black: {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
        hex3: '#000',
        hex6: '#000000',
        hex8: '#000000FF',
        h: 0,
        s: 0,
        l: 0,
    },
    red: {
        r: 255,
        g: 0,
        b: 0,
        a: 1,
        hex3: '#F00',
        hex6: '#FF0000',
        hex8: '#FF0000FF',
        h: 0,
        s: 100,
        l: 50,
    },
    green: {
        r: 0,
        g: 255,
        b: 0,
        a: 1,
        hex3: '#0F0',
        hex6: '#00FF00',
        hex8: '#00FF00FF',
        h: 120,
        s: 100,
        l: 50,
    },
    blue: {
        r: 0,
        g: 0,
        b: 255,
        a: 1,
        hex3: '#00F',
        hex6: '#0000FF',
        hex8: '#0000FFFF',
        h: 240,
        s: 100,
        l: 50,
    },
    darkorchid: {
        r: 153,
        g: 51,
        b: 204,
        a: 1,
        hex3: '#93C',
        hex6: '#9933CC',
        hex8: '#9933CCFF',
        h: 280,
        s: 60,
        l: 50,
    },
    transred: {
        r: 255,
        g: 0,
        b: 0,
        a: 0.502,
        hex8: '#FF000080',
    },
};

const expectCloseRGB = (a, b) => {
    expect(a.r).toBeCloseTo(b.r, 3);
    expect(a.g).toBeCloseTo(b.g, 3);
    expect(a.b).toBeCloseTo(b.b, 3);
    expect(a.a).toBeCloseTo(b.a, 3);
};

describe('parse hex', () => {
    it('usual 6 hex', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            if (!c.hex6) { return; }
            let parsed = new ColorParse(c.hex6).color;
            expectCloseRGB(parsed, c);
        });
    });

    it('3 hex', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            if (!c.hex3) { return; }
            let parsed = new ColorParse(c.hex3).color;
            expectCloseRGB(parsed, c);
        });
    });

    it('8 hex', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            if (!c.hex8) { return; }
            let parsed = new ColorParse(c.hex8).color;
            expectCloseRGB(parsed, c);
        });
    });
});

describe('parse rgb strings', () => {
    it('rgb', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            if (c.a !== 1) { return; }
            let str = `rgb(${c.r},${c.g},${c.b})`;
            let parsed = new ColorParse(str).color;
            expectCloseRGB(parsed, c);
        });
    });

    it('rgb with spaces', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            if (c.a !== 1) { return; }
            let str = `rgb(${c.r}, ${c.g}, ${c.b}   )`;
            let parsed = new ColorParse(str).color;
            expectCloseRGB(parsed, c);
        });
    });

    it('rgba', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            let str = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
            let parsed = new ColorParse(str).color;
            expectCloseRGB(parsed, c);
        });
    });
});

describe('to strings methods', () => {
    it('from object to rgb', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            let parsed = new ColorParse(c);
            let str = `rgb(${c.r},${c.g},${c.b})`;
            expect(parsed.toRGB()).toEqual(str);
        });
    });

    it('to rgba', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            let parsed = new ColorParse(c);
            let str = `rgba(${c.r},${c.g},${c.b},${c.a})`;
            expect(parsed.toRGBA()).toEqual(str);
        });
    });

    it('from and to hex', () => {
        Object.keys(COLORS).forEach((color) => {
            let c = COLORS[color];
            if (!c.hex6) { return; }
            let parsed = new ColorParse(c);
            expect(parsed.toHex()).toEqual(c.hex6);
        });
    });
});
