import React from 'react';
import './MovementControls.css';

function MovementControls() {
  return (
    <div className="movement-controls">
      <div className="directions">
        <button>X+</button>
        <button>X-</button>
        <button>Y+</button>
        <button>Y-</button>
        <button>Z+</button>
        <button>Z-</button>
      </div>
      <div className="settings">
        <div className="input-group">
          <label>Speed</label>
          <input type="number" defaultValue="123" />
        </div>
        <div className="input-group">
          <label>Acceleration</label>
          <input type="number" defaultValue="123" />
        </div>
      </div>
    </div>
  );
}

export default MovementControls;
