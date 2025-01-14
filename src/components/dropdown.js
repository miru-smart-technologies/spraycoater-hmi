import React, { useState, useEffect } from "react";
import client from "../mqtt-lib";
import "./dropdown.css";

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState({});

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("Selected GCode key:", event.target.value);
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
      <label htmlFor="gcode-select">GCode File</label>
      <select id="gcode-select" value={selectedOption} onChange={handleChange}>
        <option value="" disabled>
          Select an option
        </option>
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      {/* {selectedOption && <p>You selected: {selectedOption}</p>} */}
    </div>
  );
}

export default Dropdown;
