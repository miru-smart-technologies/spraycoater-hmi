import { MqttClient } from './mqtt-client.ts';

const url = 'mqtt://192.168.7.2:1883';

const client = new MqttClient(url);

client.subscribe('*', RegExp(".*"), (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message}`);
})

export default client;