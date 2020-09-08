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
        initialColor="#BBBB00"
        size={500}
        onChange={setColor}
      />
    </div>
  );
};

export default App;
