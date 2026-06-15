import type { Stan, Message } from 'node-nats-streaming';
import { Subject } from './subject.ts';
import type { Data  } from './subject.ts';

export abstract class Listener<T extends Subject> {
  protected client: Stan;
  abstract subject: T;
  abstract queueGroupName: string;
  abstract onMessage: (data: Data[T], msg: Message) => void;
  protected ackWait: number = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return JSON.parse(typeof data === 'string' ? data : data.toString('utf-8'));
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions(),
    );
    return new Promise(() => {
      subscription.on('message', (msg: Message) => {
        console.log(
          `Message received from ${this.subject} / ${this.queueGroupName}`,
        );
        const parseData = this.parseMessage(msg);
        this.onMessage(parseData, msg);
      });
    });
  }
}
