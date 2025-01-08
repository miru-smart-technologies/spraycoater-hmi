import client from "../mqtt-lib";
import React, { useState, useEffect } from "react";

function PathData() {
  const [totalLayers, setTotalLayers] = useState(0);
  const [totalPasses, setTotalPasses] = useState(0);
  const [currLayer, setCurrLayer] = useState(0);
  const [currPass, setCurrPass] = useState(0);

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
    <div>
      <div>Total layers: {totalLayers}</div>
      <div>Total passes: {totalPasses}</div>
      <div>Current layer: {currLayer}</div>
      <div>Current pass: {currPass}</div>
    </div>
  );
}

export default PathData;
