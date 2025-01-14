import "./DeveloperWindow.css";
import { useEffect, useState, useRef } from "react";
import { useLogs } from "../context/LogContext";

function DeveloperWindow() {
  const [windowOpen, setWindowOpen] = useState(false);
  const [tab, setTab] = useState("HMI");
  const { hmiLogs, stateMachineLogs } = useLogs();
  const logContainerRef = useRef(null);

  const onOpenWindowButtonClick = () => {
    if (!windowOpen) {
    }
    setWindowOpen(true);
  };

  const onCloseWindowButtonClick = () => {
    setWindowOpen(false);
  };

  const onTabButtonClick = (label) => {
    setTab(label);
  };

  const tabButtonLabels = ["HMI", "State Machine"];

  const tabButtons = (
    <div className="tab-buttons-container">
      {tabButtonLabels.map((label, index) => (
        <div
          key={index}
          className={`tab-button ${tab === label && "selected"}`}
          onClick={() => onTabButtonClick(label)}
        >
          {label}
        </div>
      ))}
    </div>
  );

  const logs = tab === "HMI" ? hmiLogs : stateMachineLogs;

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

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="dev-window-container">
      <div className={`dev-window grey-border ${windowOpen && "active"}`}>
        <div className="dev-buttons-container">
          {tabButtons}
          <button
            className="close-window-button"
            onClick={onCloseWindowButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="log-container" ref={logContainerRef}>
          {logComponents}
        </div>
      </div>
      <div>
        <div className="open-window-button" onClick={onOpenWindowButtonClick}>
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
            className="lucide lucide-terminal"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" x2="20" y1="19" y2="19" />
          </svg>
          <span>Dev Logs</span>
        </div>
      </div>
    </div>
  );
}

export default DeveloperWindow;
