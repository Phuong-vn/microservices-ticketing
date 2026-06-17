import { Listener, Subject } from '@doffy-gittix/common';
import type { Data } from '@doffy-gittix/common';
import type { Message } from 'node-nats-streaming';
import { QUEUE_GROUP_NAME } from '../config.ts';
import { expirationQueue } from '../queue.ts';

export class OrderCreatedListener extends Listener<Subject.OrderCreated> {
  readonly subject = Subject.OrderCreated;
  queueGroupName = QUEUE_GROUP_NAME;
  onMessage = async (data: Data[Subject.OrderCreated], msg: Message) => {
    const delay = new Date(data.expiredAt).getTime() - performance.now();
    await expirationQueue.add({ orderId: data.id }, { delay });
    msg.ack();
  };
}
