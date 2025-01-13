import client from "../../mqtt-lib";
import React, { useState, useEffect } from "react";
import ProgressDisplay from "./ProgressDisplay";
import "./PathData.css";

const PATH_ICON_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-route"
  >
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </svg>
);

const LAYER_ICON_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-layers"
  >
    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
  </svg>
);

function PathData() {
  const [totalLayers, setTotalLayers] = useState(null);
  const [totalPasses, setTotalPasses] = useState(null);
  const [currLayer, setCurrLayer] = useState(null);
  const [currPass, setCurrPass] = useState(null);

  useEffect(() => {
    const handleTotalLayersMessage = (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message}`);
      setTotalLayers(message);
    };

    const handleTotalPassesMessage = (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message}`);
      setTotalPasses(message);
    };

    const handleCurrLayerMessage = (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message}`);
      setCurrLayer(message);
    };

    const handleCurrPassMessage = (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message}`);
      setCurrPass(message);
    };

    client.subscribe(
      "HMI/Layers/Total",
      /^HMI\/Layers\/Total$/,
      handleTotalLayersMessage
    );

    client.subscribe(
      "HMI/Passes/Total",
      /^HMI\/Passes\/Total$/,
      handleTotalPassesMessage
    );

    client.subscribe(
      "HMI/Layers/Current",
      /^HMI\/Layers\/Current$/,
      handleCurrLayerMessage
    );

    client.subscribe(
      "HMI/Passes/Current",
      /^HMI\/Passes\/Current$/,
      handleCurrPassMessage
    );

    return () => {
      client.unsubscribe("Layers/Total", handleTotalLayersMessage);
      client.unsubscribe("Passes/Total", handleTotalPassesMessage);
      client.unsubscribe("Layers/Current", handleCurrLayerMessage);
      client.unsubscribe("Passes/Current", handleCurrPassMessage);
    };
  }, []);

  return (
    <div className="path-data">
      <ProgressDisplay
        icon={PATH_ICON_SVG}
        label="Pass"
        current={currPass}
        total={totalPasses}
      />
      <ProgressDisplay
        icon={LAYER_ICON_SVG}
        label="Layer"
        current={currLayer}
        total={totalLayers}
      />
    </div>
  );
}

export default PathData;
