import React, { useState, useEffect } from "react";
import client from "../mqtt-lib";
import "./dropdown.css";

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState({});

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("Selected:", event.target.value);
    client.publish("HMI/GCode/Select", event.target.value);
  };

  useEffect(() => {
    const handleAddOptionMessage = (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message}`);

      const messageToJSON = message.replace(/(\d+):/g, '"$1":');

      const newOptions = JSON.parse(messageToJSON);

      setOptions((prevOptions) => ({
        ...prevOptions,
        ...newOptions,
      }));
    };

    client.subscribe(
      "HMI/GCode/Add",
      /^HMI\/GCode\/Add$/,
      handleAddOptionMessage
    );

    return () => {
      client.unsubscribe("Add", handleAddOptionMessage);
    };
  }, []);

  return (
    <div className="dropdown">
      <label htmlFor="gcode-select">Select GCODE:</label>
      <select id="gcode-select" value={selectedOption} onChange={handleChange}>
        <option value="" disabled>
          Select an option
        </option>
        {Object.values(options).map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
}

export default Dropdown;
