import nats from 'node-nats-streaming';
import { randomUUID } from 'crypto';
import { TicketCreatedPublisher } from './events/publisher.ts';

console.clear();

const stan = nats.connect('ticketing', randomUUID(), {
  url: 'http://localhost:4222'
});

stan.on('connect', async () => {
  await new TicketCreatedPublisher(stan).publish({
    id: '1',
    title: 'title',
    price: '20'
  });
});
