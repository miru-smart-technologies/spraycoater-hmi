import React from "react";
import "./Controls.css";
import client from "../mqtt-lib.js";
import { useState, useEffect } from "react";

const READY_ICON_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-monitor-check"
  >
    <path d="m9 10 2 2 4-4" />
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <path d="M12 17v4" />
    <path d="M8 21h8" />
  </svg>
);

const ABORT_ICON_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-octagon-x"
  >
    <path d="m15 9-6 6" />
    <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
    <path d="m9 9 6 6" />
  </svg>
);

function Controls() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleReadyMessage = (_topic, message) => {
      if (message === "False") {
        console.log("Button set to abort");
        setReady(false);
      } else {
        console.log("Button set to ready");
        setReady(true);
      }
    };

    client.subscribe(
      "HMI/Vention/Ready",
      /^HMI\/Vention\/Ready$/,
      handleReadyMessage
    );

    return () => {
      client.unsubscribe("Ready", handleReadyMessage);
    };
  }, []);

  const handleButtonClick = (event) => {
    console.log(`${event.target.textContent} pressed`);
    client.publish("HMI/Control", event.target.textContent);
  };

  return (
    <div className="controls">
      <div
        className={`button ${ready ? "red" : "green"}`}
        onClick={handleButtonClick}
      >
        {ready ? ABORT_ICON_SVG : READY_ICON_SVG}
        <span>{ready ? "Abort" : "Ready"}</span>
      </div>
      {/* <button className="button red" onClick={handleButtonClick}>ABORT</button> */}
      {/* <div className="control-buttons">
                <button className="button" onClick={handleButtonClick}>GO TO HOME</button>
                <button className="button" onClick={handleButtonClick}>GO TO WASTE</button>
                <button className="button" onClick={handleButtonClick}>GO TO PRESET</button>
            </div> */}
    </div>
  );
}

export default Controls;
