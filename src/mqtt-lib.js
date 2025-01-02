import { MqttClient } from './mqtt-client.ts';

// const url = 'mqtt://192.168.7.2:1883';
const url = 'mqtt://localhost:1884';

const client = new MqttClient(url);

client.subscribe('*', RegExp(".*"), (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message}`);
})
console.log("Subscribed to all topics");
client.publish('websocket', 'Hello from the client!');

export default client;