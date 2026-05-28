import type { Stan, Message } from 'node-nats-streaming';

enum Subject {
  TicketCreated = 'ticket:created',
  OrderUpdated = 'order:updated',
}

type Data = {
  [Subject.TicketCreated]: {
    id: string;
    title: string;
    price: string;
  },
  [Subject.OrderUpdated]: {
    id: string,
    userId: string,
    ticketId: string,
  },
}

const QUEUE_GROUP_NAME = 'payments-service';

abstract class Listener<T extends Subject> {
  private client: Stan;
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

export class TicketCreatedListener extends Listener<Subject.TicketCreated> {
  readonly subject = Subject.TicketCreated;
  queueGroupName = QUEUE_GROUP_NAME;
  onMessage = (data: Data[Subject.TicketCreated], msg: Message) => {
    console.log(data);
    msg.ack();
  };
}

export class OrderUpdatedListener extends Listener<Subject.OrderUpdated> {
  readonly subject = Subject.OrderUpdated;
  queueGroupName = QUEUE_GROUP_NAME;
  onMessage = (data: Data[Subject.OrderUpdated], msg: Message) => {
    console.log(data);
    msg.ack();
  };
}
