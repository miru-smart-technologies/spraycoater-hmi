import "./ProgressDisplay.css";

function ProgressDisplay({ icon, label, current, total }) {
  return (
    <div className="progress-display">
      <div className="progress-container">
        <span className="current">{current ?? "--"}</span>
        <span className="slash">/</span>
        <span className="total">{total ?? "--"}</span>
      </div>
      <div className="label-container">
        <span>{icon}</span>
        <span>Current {label}</span>
      </div>
    </div>
  );
}

export default ProgressDisplay;
