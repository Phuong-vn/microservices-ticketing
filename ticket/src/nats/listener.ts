import { Listener, Subject, NotFoundError } from '@doffy-gittix/common';
import type { Data } from '@doffy-gittix/common';
import { Message } from 'node-nats-streaming';
import { QUEUE_GROUP_NAME } from '../config.ts';
import { Ticket } from '../models/index.ts';
import { TicketUpdatedPublisher } from './publisher.ts';

export class OrderCreatedListener extends Listener<Subject.OrderCreated> {
  readonly subject = Subject.OrderCreated;
  queueGroupName = QUEUE_GROUP_NAME;
  onMessage = async (data: Data[Subject.OrderCreated], msg: Message) => {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    ticket.orderId = data.id;
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket._id.toString(),
      title: ticket.title,
      price: Number(ticket.price),
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });
    msg.ack();
  };
}

export class OrderCancelledListener extends Listener<Subject.OrderCancelled> {
  readonly subject = Subject.OrderCancelled;
  queueGroupName = QUEUE_GROUP_NAME;
  onMessage = async (data: Data[Subject.OrderCancelled], msg: Message) => {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    ticket.orderId = undefined;
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket._id.toString(),
      title: ticket.title,
      price: Number(ticket.price),
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });
    msg.ack();
  };
}
