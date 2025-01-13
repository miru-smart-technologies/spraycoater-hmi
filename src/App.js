import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Dropdown from "./components/dropdown";
import Modal from "./components/Modal";
import DeveloperWindow from "./components/DeveloperWindow";
import { useLogs } from "./context/LogContext";
import client from "./mqtt-lib";
import PathData from "./components/pathData/PathData";

function App() {
  const { setStateMachineLogs } = useLogs();

  useEffect(() => {
    const handleLogMessage = (topic, message) => {
      setStateMachineLogs((prev) => [
        ...prev,
        { message: message, type: "log" },
      ]);
    };

    client.subscribe("HMI/Logs", /^HMI\/Logs$/, handleLogMessage);

    return () => {
      client.unsubscribe("HMI/Logs", handleLogMessage);
    };
  }, []);

  return (
    <div className="app">
      <div className="main-container">
        {/* <Header /> */}
        <div className="gcode-container">
          <Dropdown />
          <PathData />
        </div>
        <DeveloperWindow />
      </div>
      <Modal />
    </div>
  );
}

export default App;
