import React from "react";
import "./App.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import MovementControls from "./components/MovementControls";
import Dropdown from "./components/dropdown";
import Modal from "./components/Modal";
import PathData from "./components/PathData";
import DeveloperWindow from "./components/DeveloperWindow";

function App() {
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
