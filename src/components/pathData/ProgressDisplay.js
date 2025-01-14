import "./ProgressDisplay.css";

function ProgressDisplay({ icon, label, current, total, color }) {
  return (
    <div className="progress-display">
      <div className="progress-container">
        <span className={`current ${color}`}>{current ?? "--"}</span>
        <span className={`slash ${color}`}>/</span>
        <span className="total">{total ?? "--"}</span>
      </div>
      <div className="label-container">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default ProgressDisplay;
