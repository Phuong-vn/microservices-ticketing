import {
  Listener,
  Subject,
  NotFoundError,
  OrderStatus,
} from '@doffy-gittix/common';
import type { Data } from '@doffy-gittix/common';
import { Message } from 'node-nats-streaming';
import { QUEUE_GROUP_NAME } from '../config.ts';
import { Order } from '../models/index.ts';

export class OrderCreatedListener extends Listener<Subject.OrderCreated> {
  readonly subject = Subject.OrderCreated;
  queueGroupName = QUEUE_GROUP_NAME;

  onMessage = async (data: Data[Subject.OrderCreated], msg: Message) => {
    const { id, userId, version, status, ticket } = data;
    const order = Order.build({
      id,
      userId,
      version,
      status,
      price: ticket.price,
    });
    await order.save();
    msg.ack();
  };
}

export class OrderCancelledListener extends Listener<Subject.OrderCancelled> {
  readonly subject = Subject.OrderCancelled;
  queueGroupName = QUEUE_GROUP_NAME;

  onMessage = async (data: Data[Subject.OrderCancelled], msg: Message) => {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });
    if (!order) {
      throw new NotFoundError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    msg.ack();
  };
}
