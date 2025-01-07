import React, { createContext, useContext, useState, useEffect } from "react";
import { logMessages } from "../helper/logManager";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (logMessages.length > logs.length) {
        setLogs([...logMessages]);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [logs]);

  return <LogContext.Provider value={logs}>{children}</LogContext.Provider>;
};

export const useLogs = () => useContext(LogContext);
