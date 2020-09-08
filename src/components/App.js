import React, { useState } from 'react';
import '../styles/App.css';
import ColorPicker from './ColorPicker';

const App = () => {
  const [color, setColor] = useState({});
  return (
    <div
      className="App"
      style={{ backgroundColor: color.hex }}
    >
      <ColorPicker
        size={500}
        color={color.hex}
        onChange={setColor}
      />
    </div>
  );
};

export default App;
