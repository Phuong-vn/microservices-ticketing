import nats from 'node-nats-streaming';
import { randomUUID } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomUUID(), {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  const data = JSON.stringify({
    id: '1',
    title: 'title',
    price: '20'
  });

  stan.publish('ticket:created', data, (err, guid) => {
    if (err) {
      console.log('publish failed: ' + err)
    } else {
      console.log('published message with guid: ' + guid + ' and data: ' + data)
    }
  });
});
