import React from 'react';
import './Controls.css';

function Controls() {
  return (
    <div className="controls">
      <button className="button green">READY</button>
      <button className="button red">ABORT</button>
      <div className="control-buttons">
        <button className="button">GO TO HOME</button>
        <button className="button">GO TO WASTE</button>
        <button className="button">GO TO PRESET</button>
      </div>
    </div>
  );
}

export default Controls;
