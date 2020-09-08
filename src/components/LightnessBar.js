import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import background from '../assets/lightnessBarBackground.png';
import '../styles/LightnessBar.css';

const LightnessBar = ({
  size,
  middleLightness,
  onChange,
  lightness,
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
        const l = (1 - Math.min(size, Math.max(0, yDifference)) / size) * 100;
        onChange(parseFloat(l.toFixed(2)));
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
      className="lightnessBar"
      style={{
        backgroundImage: `url(${background}), linear-gradient(white, white 5%,${middleLightness},black 95%, black)`,
        height: size,
        width: size * 0.28,
      }}
    >
      <div
        className="lightnessLevel"
        style={{ top: (100 - lightness) * (size / 100) * 0.9 + (size * 0.05) }}
      />
    </div>
  );
};

LightnessBar.propTypes = {
  /** height of the bar */
  size: PropTypes.number.isRequired,
  /** middle lightness color string in css hsl format (hsl(0, 5%, 10%)) */
  middleLightness: PropTypes.string,
  /** zero lightness color string in css hsl format (hsl(0, 5%, 10%)) */
  onChange: PropTypes.func,
  /** current lightness level ([0,100]) */
  lightness: PropTypes.number,
};

LightnessBar.defaultProps = {
  middleLightness: 'hsl(0, 100%, 50%)',
  onChange: (() => {}),
  lightness: 50,
};

export default LightnessBar;
