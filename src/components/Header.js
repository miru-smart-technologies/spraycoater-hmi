import React, { useState, useEffect } from 'react';
import './Header.css';
import client from '../mqtt-lib';

function Header() {
    const [runIndicator, setRunIndicator] = useState('indicator');
    const [processIndicator, setProcessIndicator] = useState('indicator');
    const [readyIndicator, setReadyIndicator] = useState('indicator');
    const [finishedIndicator, setFinishedIndicator] = useState('indicator');

    useEffect(() => {
        const handleRunMessage = (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message}`);
            setRunIndicator(`indicator ${message === 'True' ? 'green' : message === 'False' ? 'red' : ''}`);
        };

        const handleProcessMessage = (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message}`);
            setProcessIndicator(`indicator ${message === 'True' ? 'green' : message === 'False' ? 'red' : ''}`);
        };

        const handleReadyMessage = (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message}`);
            setReadyIndicator(`indicator ${message === 'True' ? 'green' : message === 'False' ? 'red' : ''}`);
        };

        const handleFinishedMessage = (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message}`);
            setFinishedIndicator(`indicator ${message === 'True' ? 'green' : message === 'False' ? 'red' : ''}`);
        };

        client.subscribe("HMI/PLC/Run", /^HMI\/PLC\/Run$/, handleRunMessage);
        client.subscribe("HMI/Vention/Process", /^HMI\/Vention\/Process$/, handleProcessMessage);
        client.subscribe("HMI/Vention/Ready", /^HMI\/Vention\/Ready$/, handleReadyMessage);
        client.subscribe("HMI/Vention/Finished", /^HMI\/Vention\/Finished$/, handleFinishedMessage);


        return () => {
            client.unsubscribe("Run", handleRunMessage);
            client.unsubscribe("Process", handleProcessMessage);
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
            </div>
        </div>
        <div className="status">
            <h3>BIT STATUS VENTION</h3>
            <div className="indicators">
                <div className={processIndicator}>PROCESS</div>
                <div className={readyIndicator}>READY</div>
                <div className={finishedIndicator}>FINISHED</div>
            </div>
        </div>
    </div>
  );
}

export default Header;
