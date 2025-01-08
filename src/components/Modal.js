import "./Modal.css";
import { useMqttConnectionState } from "../hooks/useMQTTConnectionState";

function Modal() {
  const connectionState = useMqttConnectionState();

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
        <div>
          {connectionState === "disconnected" && (
            <p>Preparing to reconnect...</p>
          )}
          {connectionState === "reconnecting" && (
            <p>Currently attempting to reconnect...</p>
          )}
          {connectionState === "error" && <p>Check logs for error details.</p>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
