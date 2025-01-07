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
        <div className="log-container" ref={logContainerRef}>
          {logComponents}
        </div>
      </div>
      <div>
        <div
          className="open-window-button button"
          onClick={onOpenWindowButtonClick}
        >
          Dev Logs
        </div>
      </div>
    </div>
  );
}

export default DeveloperWindow;
