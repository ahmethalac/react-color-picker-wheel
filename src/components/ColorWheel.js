import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import '../styles/ColorWheel.css';
import { coordinatesToHS, hsToCoordinates } from '../helpers/utils';

const ColorWheel = ({
  color,
  size,
  setColor,
}) => {
  const wheel = useRef(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const mouseDown = event => {
      if (wheel.current.contains(event.target)) {
        setEditing(true);
      }
    };
    const mouseUp = () => {
      setEditing(false);
    };
    const mouseMove = event => {
      if (editing) {
        setColor(
          coordinatesToHS(
            (event.clientX - wheel.current.getBoundingClientRect().x) / size,
            (event.clientY - wheel.current.getBoundingClientRect().y) / size,
          ),
        );
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [editing, setColor, size]);

  const zeroSaturation = `hsl(${color.h},0%,${color.l}%)`;
  const fullSaturation = `hsl(${color.h},100%,${color.l}%)`;
  const zeroLightness = `hsl(${color.h},${color.s}%,0%)`;
  const middleLightness = `hsl(${color.h},${color.s}%,60%)`;
  const fullLightness = `hsl(${color.h},${color.s}%,100%)`;

  const { x, y } = hsToCoordinates(color.h, color.s);

  const onMouseDown = useCallback(event => {
    setColor(
      coordinatesToHS(
        (event.clientX - event.currentTarget.getBoundingClientRect().x) / size,
        (event.clientY - event.currentTarget.getBoundingClientRect().y) / size,
      ),
    );
  }, [setColor, size]);

  return (
    <div className="colorWheel">
      <div
        className="saturationBar"
        style={{
          background: `linear-gradient(${fullSaturation},${zeroSaturation})`,
        }}
      />
      <div
        ref={wheel}
        className="wheel"
        onMouseDown={onMouseDown}
        role="button"
        tabIndex={-5}
      >
        <div
          className="handle"
          style={{ top: y * size, left: x * size }}
        />
      </div>
      <div
        className="lightnessBar"
        style={{
          background: `linear-gradient(${fullLightness},${middleLightness},${zeroLightness})`,
        }}
      />
    </div>
  );
};

ColorWheel.propTypes = {
  /** Current picked color */
  color: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
  }),
  /** Size of color wheel */
  size: PropTypes.number.isRequired,
  /** Callback function to set color */
  setColor: PropTypes.func.isRequired,
};

ColorWheel.defaultProps = {
  color: {
    h: 0,
    s: 100,
    l: 50,
  },
};
export default ColorWheel;
