import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import background from '../assets/saturationBarBackground.png';
import '../styles/SaturationBar.css';

const SaturationBar = ({
  size,
  zeroSaturation,
  fullSaturation,
  onChange,
  saturation,
}) => {
  const bar = useRef(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const mouseDown = event => {
      if (bar.current.contains(event.target)) {
        setEditing(true);
      }
    };
    const mouseMove = event => {
      if (editing) {
        // Y coordinate difference as [0,1] (0 is full saturation)
        const yDifference = event.clientY - bar.current.getBoundingClientRect().y;
        const s = (1 - Math.min(size, Math.max(0, yDifference)) / size) * 100;
        onChange(parseFloat(s.toFixed(2)));
      }
    };
    const mouseUp = () => setEditing(false);

    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [editing, onChange, size]);
  return (
    <div
      ref={bar}
      className="saturationBar"
      style={{
        backgroundImage: `url(${background}), linear-gradient(white, ${fullSaturation} 5%,${zeroSaturation} 95%, black)`,
        height: size,
        width: size * 0.28,
      }}
    >
      <div
        className="saturationLevel"
        style={{ top: (100 - saturation) * (size / 100) * 0.9 + (size * 0.05) }}
      />
    </div>
  );
};

SaturationBar.propTypes = {
  /** height of the bar */
  size: PropTypes.number.isRequired,
  /** zero saturation color string in css hsl format (hsl(0, 5%, 10%)). */
  zeroSaturation: PropTypes.string,
  /** full saturation color string in css hsl format (hsl(0, 5%, 10%)) */
  fullSaturation: PropTypes.string,
  /** callback function to change saturation */
  onChange: PropTypes.func,
  /** current saturation level ([0,100]) */
  saturation: PropTypes.number,
};

SaturationBar.defaultProps = {
  zeroSaturation: 'hsl(0, 0%, 50%)',
  fullSaturation: 'hsl(0, 100%, 50%)',
  onChange: (() => {}),
  saturation: 100,
};
export default SaturationBar;
