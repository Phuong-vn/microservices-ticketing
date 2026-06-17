import {
  Subject,
  Listener,
  NotFoundError,
  OrderStatus,
} from '@doffy-gittix/common';
import type { Data } from '@doffy-gittix/common';
import type { Message } from 'node-nats-streaming';
import { QUEUE_GROUP_NAME } from '../config.ts';
import { Order, Ticket } from '../models/index.ts';
import { OrderCancelledPublisher } from './publisher.ts';

export class TicketCreatedListener extends Listener<Subject.TicketCreated> {
  readonly subject = Subject.TicketCreated;
  queueGroupName = QUEUE_GROUP_NAME;
  onMessage = async (data: Data[Subject.TicketCreated], msg: Message) => {
    const { id, title, price } = data;
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();
    msg.ack();
  };
}

export class TicketUpdatedListener extends Listener<Subject.TicketUpdated> {
  readonly subject = Subject.TicketUpdated;
  queueGroupName = QUEUE_GROUP_NAME;
  onMessage = async (data: Data[Subject.TicketUpdated], msg: Message) => {
    const ticket = await Ticket.findByEventData(data);
    if (!ticket) {
      throw new NotFoundError();
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  };
}

export class ExpirationCompleteListener extends Listener<Subject.ExpirationComplete> {
  readonly subject = Subject.ExpirationComplete;
  queueGroupName = QUEUE_GROUP_NAME;
  onMessage = async (data: Data[Subject.ExpirationComplete], msg: Message) => {
    const order = await Order.findById(data.id).populate('ticket');
    if (!order) {
      throw new NotFoundError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket._id.toString(),
      },
    });
    msg.ack();
  };
}
