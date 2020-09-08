import React, { useCallback, useEffect, useState } from 'react';
import '../styles/ColorPicker.css';
import PropTypes from 'prop-types';
import ColorWheel from './ColorWheel';
import {
  hexToRGB, hslToRgb, rgbToHex, rgbToHsl,
} from '../helpers/utils';

const ColorPicker = ({
  size,
  color,
  onChange,
}) => {
  const [pickedColor, setPickedColor] = useState({
    hex: '#FF0000',
    rgb: { r: 255, g: 0, b: 0 },
    hsl: { h: 0, s: 100, l: 50 },
  });

  useEffect(() => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      const hex = color.toUpperCase();
      const rgb = hexToRGB(color);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setPickedColor({ hex, rgb, hsl });
    } else if (Number.isInteger(color.r)
      && Number.isInteger(color.g)
      && Number.isInteger(color.b)) {
      const hex = rgbToHex(color.r, color.g, color.b);
      const rgb = color;
      const hsl = rgbToHsl(color.r, color.g, color.b);
      setPickedColor({ hex, rgb, hsl });
    } else {
      setPickedColor({ hex: '#FF0000', rgb: { r: 255, g: 0, b: 0 }, hsl: { h: 0, s: 100, l: 50 } });
    }
  }, [color]);

  const setColorFromWheel = useCallback(hsl => {
    const h = Math.round(hsl.h || pickedColor.hsl.h);
    const s = Math.round(hsl.s || pickedColor.hsl.s);
    const l = Math.round(hsl.l || pickedColor.hsl.l);
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setPickedColor({ hex, rgb, hsl: { h, s, l } });
    onChange({ hex, rgb, hsl: { h, s, l } });
  }, [onChange, pickedColor.hsl]);

  return (
    <div>
      <div
        className="outerContainer"
        style={{
          height: Math.max(size, 200),
          width: Math.max(size, 200),
        }}
      >
        <ColorWheel
          color={pickedColor.hsl}
          size={size * (5 / 6)}
          setColor={setColorFromWheel}
        />
        <div className="pickedColorContainer">
          <div
            className="pickedColor"
            style={{
              backgroundColor: pickedColor.hex,
            }}
          >
            <div
              className="hexValue"
              style={{
                fontSize: Math.max(size, 200) / 12,
                color: pickedColor.hsl.l > 70 ? 'black' : 'white',
              }}
            >
              {pickedColor.hex}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  /** Size of the container in pixels (Container is a square). */
  size: PropTypes.number,
  /** Color to render onto color wheel. It can be hex(#ffffff) or rgb object({r:0, g:0, b:0}). */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ h: PropTypes.number, s: PropTypes.number, l: PropTypes.number }),
    PropTypes.shape({ r: PropTypes.number, g: PropTypes.number, b: PropTypes.number }),
  ]),
  /** Function which will be called when color change occurs. Parameter is a hsl object */
  onChange: PropTypes.func,
};

ColorPicker.defaultProps = {
  size: 200,
  color: '#FF0000',
  onChange: (() => {}),
};
export default ColorPicker;
