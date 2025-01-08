import "./Modal.css";
import { useMqttConnectionState } from "../hooks/useMQTTConnectionState";
import { useEffect } from "react";
import { useConnectionContext } from "../context/MQTTConnectionContext";

function Modal() {
  const connectionState = useMqttConnectionState();
  const { setConnected } = useConnectionContext();

  useEffect(() => {
    if (connectionState === "Connected") {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [connectionState]);

  return (
    <div className={`modal ${connectionState !== "Connected" && "active"}`}>
      <div className="modal-backdrop" />
      <div className="modal-container grey-border">
        <div className="header-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-exclamation-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
          </svg>
          <div className="modal-header">{connectionState}</div>
        </div>
        {connectionState === "Disconnected" && (
          <div className="modal-message">
            The connection has been closed. Preparing to reconnect...
          </div>
        )}
        {connectionState === "Reconnecting" && (
          <div className="modal-message">
            The connection has been closed. Currently attemping to reconnect...
          </div>
        )}
        {connectionState === "Error" && (
          <div className="modal-message">Check logs for error details.</div>
        )}
      </div>
    </div>
  );
}

export default Modal;
