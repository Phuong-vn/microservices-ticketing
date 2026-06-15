import { Subject, Listener, NotFoundError } from '@doffy-gittix/common';
import type { Data } from '@doffy-gittix/common';
import type { Message } from 'node-nats-streaming';
import { QUEUE_GROUP_NAME } from '../config.ts';
import { Ticket } from '../models/index.ts';

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
    const ticket = await Ticket.findById(data.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  };
}
