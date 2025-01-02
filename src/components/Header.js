import React, { useState, useEffect } from 'react';
import './Header.css';
import client from '../mqtt-lib';

function Header() {
    const [runIndicator, setRunIndicator] = useState('indicator');
    const [readyIndicator, setReadyIndicator] = useState('indicator');
    const [finishedIndicator, setFinishedIndicator] = useState('indicator');

    useEffect(() => {
        const handleRunMessage = (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message}`);
            setRunIndicator(`indicator ${message === 'True' ? 'green' : 'red'}`);
        };

        const handleReadyMessage = (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message}`);
            setReadyIndicator(`indicator ${message === 'True' ? 'green' : 'red'}`);
        };

        const handleFinishedMessage = (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message}`);
            setFinishedIndicator(`indicator ${message === 'True' ? 'green' : 'red'}`);
        };

        client.subscribe("Run", /^Run$/, handleRunMessage);
        client.subscribe("Ready", /^Ready$/, handleReadyMessage);
        client.subscribe("Finished", /^Finished$/, handleFinishedMessage);


        return () => {
            client.unsubscribe("Run", handleRunMessage);
            client.unsubscribe("Ready", handleReadyMessage);
            client.unsubscribe("Finished", handleFinishedMessage);
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
