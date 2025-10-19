// Convert hex to HSL
function hexToHSL(H) {
    let r = 0, g = 0, b = 0;
    if (H.length === 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;

    let h = 0, s = 0, l = (cmax + cmin) / 2;

    if (delta !== 0) {
        h = cmax === r ? ((g - b) / delta) % 6 :
            cmax === g ? (b - r) / delta + 2 :
                (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        s = delta / (1 - Math.abs(2 * l - 1));
    }

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
}

// Generate palette using HSL
function hsl(h, s, l) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function generatePalette(h, s, l) {
    return {
        50: hsl(h, s, Math.min(l + 45, 95)),
        100: hsl(h, s, Math.min(l + 35, 90)),
        200: hsl(h, s, Math.min(l + 25, 80)),
        300: hsl(h, s, Math.min(l + 15, 70)),
        400: hsl(h, s, Math.min(l + 7, 60)),
        500: hsl(h, s, l),
        600: hsl(h, s, Math.max(l - 7, 5)),
        700: hsl(h, s, Math.max(l - 15, 5)),
        800: hsl(h, s, Math.max(l - 25, 3)),
        900: hsl(h, s, Math.max(l - 35, 2)),
    };
}

// Accept hex and generate palette
function generatePaletteFromHex(hex) {
    const [h, s, l] = hexToHSL(hex);
    return generatePalette(h, s, l);
}

// Export the functions
module.exports = { generatePalette, generatePaletteFromHex, hsl, hexToHSL };
