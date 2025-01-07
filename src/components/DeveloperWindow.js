import "./DeveloperWindow.css";
import { useEffect, useState } from "react";
import { useLogs } from "../context/LogContext";

function DeveloperWindow() {
  const [windowOpen, setWindowOpen] = useState(false);
  const [tab, setTab] = useState("HMI");
  const hmiLogs = useLogs();

  const onOpenWindowButtonClick = () => {
    if (!windowOpen) {
      console.log("Developer window opened");
    }
    setWindowOpen(true);
  };

  const onCloseWindowButtonClick = () => {
    console.log("Developer window closed");
    setWindowOpen(false);
  };

  const onTabButtonClick = (label) => {
    setTab(label);
  };

  const tabButtonLabels = ["HMI", "State Machine"];

  const tabButtons = (
    <div className="tab-buttons-container">
      {tabButtonLabels.map((label, index) => (
        <button
          key={index}
          className={`tab-button ${tab === label && "selected"}`}
          onClick={() => onTabButtonClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const logs = tab === "HMI" ? hmiLogs : hmiLogs;

  const logComponents = logs.map((log, index) => (
    <div
      key={index}
      className={`log-component ${log.type} ${
        log.message === "Connected to MQTT broker" && "connect"
      }`}
    >
      {log.message}
    </div>
  ));

  return (
    <div className="dev-window-container">
      <div className={`dev-window ${windowOpen && "active"}`}>
        <div className="dev-buttons-container">
          {tabButtons}
          <button
            className="close-window-button"
            onClick={onCloseWindowButtonClick}
          >
            x
          </button>
        </div>
        <div className="log-container">{logComponents}</div>
      </div>
      <div>
        <button
          className="open-window-button button"
          onClick={onOpenWindowButtonClick}
        >
          Dev Logs
        </button>
      </div>
    </div>
  );
}

export default DeveloperWindow;
