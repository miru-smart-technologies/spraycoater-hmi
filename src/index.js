import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Buffer } from "buffer";
import { ConnectionProvider } from "./context/MQTTConnectionContext";
import { LogProvider } from "./context/LogContext";

window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LogProvider>
    <ConnectionProvider>
      <App />
    </ConnectionProvider>
  </LogProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
