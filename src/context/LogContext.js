import React, { createContext, useContext, useState, useEffect } from "react";
import { logMessages } from "../helper/logManager";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [hmiLogs, setHmiLogs] = useState([]);
  const [stateMachineLogs, setStateMachineLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (logMessages.length > hmiLogs.length) {
        setHmiLogs([...logMessages]);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [logMessages]);

  return (
    <LogContext.Provider
      value={{ hmiLogs, stateMachineLogs, setStateMachineLogs }}
    >
      {children}
    </LogContext.Provider>
  );
};

export const useLogs = () => useContext(LogContext);
