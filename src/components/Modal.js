import "./Modal.css";
import { useMqttConnectionState } from "../hooks/useMQTTConnectionState";
import { useEffect } from "react";
import { useConnectionContext } from "../context/MQTTConnectionContext";

function Modal() {
  const connectionState = useMqttConnectionState();
  const { setConnected } = useConnectionContext();

  useEffect(() => {
    if (connectionState === "connected") {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [connectionState]);

  return (
    <div className={`modal ${connectionState !== "connected" && "active"}`}>
      <div className="modal-backdrop" />
      <div className="modal-container">
        <div className="modal-header">
          {connectionState !== "error" ? (
            <span>Disconnected from Broker.</span>
          ) : (
            <span>Uh oh! An error occurred.</span>
          )}
        </div>
        {connectionState === "disconnected" && (
          <div>Preparing to reconnect...</div>
        )}
        {connectionState === "reconnecting" && (
          <div>Currently attempting to reconnect...</div>
        )}
        {connectionState === "error" && (
          <div>Check logs for error details.</div>
        )}
      </div>
    </div>
  );
}

export default Modal;
