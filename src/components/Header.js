import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="status">
        <h3>BIT STATUS PLC</h3>
        <div className="indicator">RUN</div>
        <div className="indicator">READY</div>
        <div className="indicator">FINISHED</div>
      </div>
      <div className="status">
        <h3>BIT STATUS VENTION</h3>
        <div className="indicator">RUN</div>
        <div className="indicator">READY</div>
        <div className="indicator">FINISHED</div>
      </div>
    </div>
  );
}

export default Header;
