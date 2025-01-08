// For some reason useMqttConnectionState() and client.getConnectionStatus don't work properly in the Header.js component
// Not sure why but they seem to work properly in Modal.js, which what this context is for:
// the context is updated in Modal.js whenever the connection state changes, and is used in Header.js to keep track of the connection state
import { createContext, useContext, useState } from "react";

const ConnectionContext = createContext(undefined);

export const ConnectionProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  return (
    <ConnectionContext.Provider
      value={{
        connected,
        setConnected,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnectionContext = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error(
      "useConnectionContext must be used within a ConnectionProvider"
    );
  }
  return context;
};
