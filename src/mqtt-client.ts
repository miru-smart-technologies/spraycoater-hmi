import mqtt from "mqtt"
import {
  IClientOptions,
  IClientPublishOptions,
  MqttClient as MQTTClientType,
} from "mqtt";

const MQTT_TIMEOUT_SECONDS = 3;
const MQTT_TIMEOUT_MS = MQTT_TIMEOUT_SECONDS * 1000;

const KEEP_ALIVE_SECONDS = 5;
const RECONNECT_INTERVAL_MS = 1 * 1000;

function getClientId(): string {
  return "pendant_" + Math.random().toString(16).substr(2, 8);
}

export interface Callback {
  (topic: string, message: string): void;
}

interface Subscription {
  pattern: RegExp;
  callback: Callback;
}

class MqttClient {
  private mqttClient?: MQTTClientType;
  private subscriptions: Subscription[] = [];

  constructor(url: string, connectCallback?: () => void) {
    this.connect(url, connectCallback);
  }

  connect(url: string, connectCallback?: () => void): void {
    const options: IClientOptions = {
      connectTimeout: MQTT_TIMEOUT_MS,
      clientId: getClientId(),
      reconnectPeriod: 0,
      keepalive: KEEP_ALIVE_SECONDS,
    };

    this.mqttClient = mqtt.connect(url, options);

    this.mqttClient.on("connect", () => {
      connectCallback?.();
    });

    this.mqttClient.on("close", () => {
      console.warn("MQTT connection closed");
      this.mqttClient?.end(true, {}, () => {
        console.log("MQTT connection ended");
        this.mqttClient = undefined;
        setTimeout(
          () => this.connect(url, connectCallback),
          RECONNECT_INTERVAL_MS
        );
      });
    });

    this.mqttClient.on("error", (error: Error) => {
      console.error("Error encountered in mqtt client: ", error);
    });

    this.mqttClient.on("message", (topic: string, message: Buffer) => {
      this.subscriptions.forEach((sub) => {
        if (sub.pattern.test(topic)) {
          sub.callback(topic, message.toString());
        }
      });
    });
  }

  subscribe(topic: string, regex: RegExp, cb: Callback): void {
    this.subscriptions.push({ pattern: regex, callback: cb });
    this.mqttClient?.subscribe(topic, (err: Error) => {
      if (err) {
        this.subscriptions = this.subscriptions.filter(
          (sub) => sub.pattern !== regex || sub.callback !== cb
        );
        console.error("Unable to subscribe to MQTT broker with error: ", err);
      }
    });
  }

  unsubscribe(topic: string, regex: RegExp, cb: Callback): void {
    this.subscriptions = this.subscriptions.filter(
      (sub) => sub.pattern !== regex || sub.callback !== cb
    );
    const sameTopicSubscriptions = this.subscriptions.filter(
      (sub) => String(sub.pattern) === String(regex)
    );
    if (sameTopicSubscriptions.length <= 0) {
      this.mqttClient?.unsubscribe(topic);
    }
  }

  publish(topic: string, message: string, retain = false): void {
    const options: IClientPublishOptions = { retain };
    this.mqttClient?.publish(topic, message, options);
  }
}

export { MqttClient };
