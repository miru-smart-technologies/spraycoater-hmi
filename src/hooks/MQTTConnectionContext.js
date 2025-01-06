// For some reason useMqttConnectionState() and client.getConnectionStatus doesn't work properly in the Header.js component
// I'm not sure why, but it seems to work properly in Modal.js, which is why I made this context:
// so I can update the context in Modal.js whenever the connection state changes and use the context in Header.js
// It's weird, I know.
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
