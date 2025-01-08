import React, { useState, useEffect } from "react";
import client from "../mqtt-lib";

function Dropdown() {
  // State to store the selected option
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ]);

  // Handle change event
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("Selected:", event.target.value); // Debugging
    client.publish("HMI/GCode/Select", event.target.value);
  };

  useEffect(() => {
    const handleAddOptionMessage = (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message}`);
      setOptions((prevOptions) => [...prevOptions, message]);
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
        {options.map((option, index) => (
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
