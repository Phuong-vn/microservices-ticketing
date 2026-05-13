import nats from 'node-nats-streaming';
import type { Message } from 'node-nats-streaming';
import { randomUUID } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomUUID(), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('listener connected');

  const opts = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('durable-name');

  const subscription = stan.subscribe('ticket:created', 'my-queue-group', opts);
  subscription.on('message', (msg: Message) => {
    console.log(msg.getSequence());
    console.log(msg.getData());
    msg.ack();
  });
});

stan.on('close', () => {
  process.exit();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
