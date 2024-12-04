import mqtt, { MqttClient } from "mqtt"

const url = 'mqtt://192.168.7.2:1883';

// Connect to the MQTT broker
const client = mqtt.connect(url);

// Subscribe to a topic
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('Run', (err) => {
    if (!err) {
      console.log('Subscribed to Run');
    } else {
      console.error('Failed to subscribe:', err);
    }
  });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message.toString()}`);
});

// Publish a message to a topic
client.on('connect', () => {
  client.publish('Ready', "True", (err) => {
    if (!err) {
      console.log('Message published');
    } else {
      console.error('Failed to publish message:', err);
    }
  });
});

// Handle errors
client.on('error', (err) => {
  console.error('MQTT error:', err);
});


export default client;