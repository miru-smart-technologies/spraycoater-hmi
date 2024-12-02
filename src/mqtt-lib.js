const mqtt = require('mqtt')

const url = 'mqtt://192.168.7.2:1883'

// Create an MQTT client instance
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000
}
const client  = mqtt.connect(url, options)
client.on('connect', function () {
  console.log('Connected')
  // Subscribe to a topic
  client.subscribe('devices/io-expander/+/digital-input/Run', function (err) {
    if (err) {
      console.error('Subscription error:', err)
    }
  })
  client.subscribe('Ready', function (err) {
    if (err) {
      console.error('Subscription error:', err)
    }
  })
  client.subscribe('Finished', function (err) {
    if (err) {
      console.error('Subscription error:', err)
    }
  })

})

// Receive messages
client.on('message', function (topic, message) {
  // message is Buffer
  console.log('Received message:', topic, message.toString())
  client.end()
})