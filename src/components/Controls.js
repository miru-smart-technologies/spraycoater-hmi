import React from 'react';
import './Controls.css';
import client from '../mqtt-lib.js';

function Controls() {
    const handleButtonClick = (event) => {
        console.log(`${event.target.textContent} pressed`);
        client.publish('HMI/Control', event.target.textContent);
    };

    return (
        <div className="controls">
            <button className="button green" onClick={handleButtonClick}>READY</button>
            <button className="button red" onClick={handleButtonClick}>ABORT</button>
            <div className="control-buttons">
                <button className="button" onClick={handleButtonClick}>GO TO HOME</button>
                <button className="button" onClick={handleButtonClick}>GO TO WASTE</button>
                <button className="button" onClick={handleButtonClick}>GO TO PRESET</button>
            </div>
        </div>
    );
}

export default Controls;