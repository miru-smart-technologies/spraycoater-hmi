import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import MovementControls from "./components/MovementControls";
import Dropdown from "./components/dropdown";
import Modal from "./components/Modal";
import PathData from "./components/PathData";
import DeveloperWindow from "./components/DeveloperWindow";
import { useLogs } from "./context/LogContext";
import client from "./mqtt-lib";

function App() {
  const { setStateMachineLogs } = useLogs();

  useEffect(() => {
    const handleLogMessage = (topic, message) => {
      setStateMachineLogs((prev) => [
        ...prev,
        { message: message, type: "log" },
      ]);
    };

    client.subscribe(
      "HMI/Vention/Logs",
      /^HMI\/Vention\/Logs$/,
      handleLogMessage
    );

    return () => {
      client.unsubscribe("HMI/Vention/Logs", handleLogMessage);
    };
  }, []);

  return (
    <div className="app">
      <div className="main-container">
        <Header />
        <div className="content">
          <Dropdown />
          <Controls />
          <MovementControls />
        </div>
        <PathData />
        <DeveloperWindow />
      </div>
      <Modal />
    </div>
  );
}

export default App;
