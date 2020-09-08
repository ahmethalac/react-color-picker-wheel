export const hsToCoordinates = (hue, saturation) => ({
  x: (Math.cos((hue - 90) * (Math.PI / 180)) * (saturation / 100) + 1) / 2,
  y: (1 - Math.sin((hue - 90) * (Math.PI / 180)) * (saturation / 100) * -1) / 2,
});

export const coordinatesToHS = (x, y) => {
  let h = Math.atan2(y * 2 - 1, x * 2 - 1) * (180 / Math.PI) + 90;
  if (h < 0) {
    h += 360;
  }
  const s = Math.min(100, Math.sqrt((1 - y * 2) ** 2 + (x * 2 - 1) ** 2) * 100);
  return { h, s };
};

export const hexToRGB = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

export const rgbToHex = (r, g, b) => {
  const componentToHex = c => {
    const hex = c.toString(16).toUpperCase();
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

export const rgbToHsl = (r, g, b) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case red: h = (green - blue) / d + (green < blue ? 6 : 0); break;
      case green: h = (blue - red) / d + 2; break;
      case blue: h = (red - green) / d + 4; break;
      default:
    }
  }
  h /= 6;

  h *= 360;
  s *= 100;
  l *= 100;

  return {
    h: parseFloat(h.toFixed(2)),
    s: parseFloat(s.toFixed(2)),
    l: parseFloat(l.toFixed(2)),
  };
};

export const hslToRgb = (h, s, l) => {
  const saturation = s / 100;
  const lightness = l / 100;

  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lightness - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.abs(Math.round((r + m) * 255));
  g = Math.abs(Math.round((g + m) * 255));
  b = Math.abs(Math.round((b + m) * 255));

  return { r, g, b };
};
