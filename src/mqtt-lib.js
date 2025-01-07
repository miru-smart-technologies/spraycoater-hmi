import { MqttClient } from "./mqtt-client.ts";

const env = "localhost";

const protocol = "ws";
const localhost = "localhost";
const vention = "192.168.7.2";
const port = "9001";
const url = `${protocol}://${env === "vention" ? vention : localhost}:${port}`;

const client = new MqttClient(url);

const subscribeToTopics = () => {
  client.subscribe("#", RegExp(".*"), (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message}`);
  });
  console.log("Subscribed to all topics");
};

const refreshStateMachine = () => {
  client.publish("HMI/Refresh", "Refresh");
};

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  // subscribeToTopics();
  refreshStateMachine();
});

client.on("reconnect", () => {
  console.warn("Reconnecting to MQTT broker");
});

client.on("close", () => {
  console.warn("Disconnected from MQTT broker");
});

client.on("error", (error) => {
  console.error(`MQTT client error: ${error}`);
});

// client.publish('websocket', 'Hello from the client!');

export default client;
