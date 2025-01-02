import { MqttClient } from './mqtt-client.ts';

const env = 'localhost';

const protocol = 'ws';
const localhost = 'localhost';
const vention = '192.168.7.2';
const port = '9001'
const url = `${protocol}://${env === 'vention' ? vention : localhost}:${port}`;

const client = new MqttClient(url);

const subscribeToTopics = () => {
    client.subscribe('#', RegExp(".*"), (topic, message) => {
        console.log(`Received message on topic ${topic}: ${message}`);
    });
    console.log("Subscribed to all topics");
};

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    // subscribeToTopics();
});

client.on('reconnect', () => {
    console.log('Reconnecting to MQTT broker');
});

client.on('close', () => {
    console.log('Disconnected from MQTT broker');
});

client.on('error', (error) => {
    console.error(`MQTT client error: ${error}`);
});

// client.publish('websocket', 'Hello from the client!');

export default client;