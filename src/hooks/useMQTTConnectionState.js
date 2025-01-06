import { useEffect, useState } from "react";
import client from "../mqtt-lib";

export const useMqttConnectionState = () => {
  const [connectionState, setConnectionState] = useState(
    client.getConnectionState()
  );

  // state can either be "disconnected", "reconnecting", "connected", or "error"
  useEffect(() => {
    const handleStateChange = (state) => {
      setConnectionState(state);
    };

    client.setOnStateChangeCallback(handleStateChange);

    return () => {
      client.setOnStateChangeCallback(() => {});
    };
  }, []);

  return connectionState;
};
