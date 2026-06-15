import type { Stan } from 'node-nats-streaming';
import { Subject } from './subject.ts';
import type { Data } from './subject.ts';

export abstract class Publisher<T extends Subject> {
  protected client: Stan;
  abstract subject: T;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: Data[T]) {
    return new Promise<Data[T]>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  }
}
