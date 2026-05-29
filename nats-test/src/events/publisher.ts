import type { Stan } from 'node-nats-streaming';
import { Subject } from './subject.ts';
import type { Data } from './subject.ts';

abstract class Publisher<T extends Subject> {
  private client: Stan;
  abstract subject: T;
  abstract onSuccess: (data: Data[T]) => void;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: Data[T]) {
    this.client.publish(this.subject, JSON.stringify(data), (err, guid) => {
      if (err) {
        console.log('publish failed: ' + err);
      } else {
        this.onSuccess(data);
      }
    });
  }
}

export class TicketCreatedPublisher extends Publisher<Subject.TicketCreated> {
  readonly subject = Subject.TicketCreated;
  onSuccess = (data: Data[Subject.TicketCreated]) => {
    console.log(`published message data: ${JSON.stringify(data)}`);
  };
}

export class OrderUpdatedPublisher extends Publisher<Subject.OrderUpdated> {
  readonly subject = Subject.OrderUpdated;
  onSuccess = (data: Data[Subject.OrderUpdated]) => {
    console.log(`published message data: ${JSON.stringify(data)}`);
  };
}
