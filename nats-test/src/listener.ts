import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/listener.ts';
import { randomUUID } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomUUID(), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('listener connected');
  new TicketCreatedListener(stan).listen();
});

stan.on('close', () => {
  process.exit();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
