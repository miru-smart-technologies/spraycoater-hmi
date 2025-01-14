import "./Indicator.css";

function Indicator({ icon, label, className }) {
  return (
    <div className={`indicator-container ${className}`}>
      <div>{icon}</div>
      <div>{label}</div>
    </div>
  );
}

export default Indicator;
