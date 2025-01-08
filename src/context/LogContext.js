import React, { createContext, useContext, useState, useEffect } from "react";
import { logMessages, logEventTarget } from "../helper/logManager";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [hmiLogs, setHmiLogs] = useState([]);
  const [stateMachineLogs, setStateMachineLogs] = useState([]);

  useEffect(() => {
    const handleNewLog = () => {
      setHmiLogs([...logMessages]);
    };

    logEventTarget.addEventListener("newLog", handleNewLog);

    return () => {
      logEventTarget.removeEventListener("newLog", handleNewLog);
    };
  }, []);

  return (
    <LogContext.Provider
      value={{ hmiLogs, stateMachineLogs, setStateMachineLogs }}
    >
      {children}
    </LogContext.Provider>
  );
};

export const useLogs = () => useContext(LogContext);
