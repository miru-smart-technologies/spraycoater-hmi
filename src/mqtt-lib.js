const { MqttClient } = require('./mqtt-client');

const url = 'mqtt://192.168.7.2:1883';

const client = new MqttClient(url, () => {
  client.subscribe('devices/io-expander/+/digital-input/Run', /Run/, (topic, message) => {
    console.log('Received message on Run:', message);
  });

  client.subscribe('Ready', /Ready/, (topic, message) => {
    console.log('Received message on Ready:', message);
  });

  client.subscribe('Finished', /Finished/, (topic, message) => {
    console.log('Received message on Finished:', message);
  });
});

client.on('message', (topic, message) => {
    console.log('Received message:', message.toString());
  }
);

module.exports = client;