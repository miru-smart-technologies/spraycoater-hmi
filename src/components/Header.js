import React, { useState, useEffect } from 'react';
import './Header.css';
import client from '../mqtt-lib';

function Header() {
    const [runIndicator, setRunIndicator] = useState('indicator');
    const [readyIndicator, setReadyIndicator] = useState('indicator');
    const [finishedIndicator, setFinishedIndicator] = useState('indicator');

    useEffect(() => {
        // client.on('message', function (topic, message) {
        //     const msg = message.toString();
        //     if (topic.includes('Run')) {
        //         if (msg === true) {
        //             setRunIndicator('indicator green');
        //         } else {
        //             setRunIndicator('indicator red');
        //         }
        //     }
        //     else if (topic.includes('Ready')) {
        //         if (msg === 'true') {
        //             setReadyIndicator('indicator green');
        //         } else {
        //             setReadyIndicator('indicator red');
        //         }
        //     }
        //     else if (topic.includes('Finished')) {
        //         if (msg === 'True') {
        //             setFinishedIndicator('indicator green');
        //         } else {
        //             setFinishedIndicator('indicator red');
        //         }
        //     }
        // });

        return () => {
            // client.end();
        };
    }, []);

  return (
    <div className="header">
      <div className="status">
        <h3>BIT STATUS PLC</h3>
          <div className="indicators">
              <div className={runIndicator}>RUN</div>
              <div className={readyIndicator}>READY</div>
              <div className={finishedIndicator}>FINISHED</div>
          </div>
      </div>
        <div className="status">
            <h3>BIT STATUS VENTION</h3>
            <div className="indicators">
                <div className="indicator">RUN</div>
          <div className="indicator">READY</div>
          <div className="indicator">FINISHED</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
