import mongoose from 'mongoose';
import { app } from './app.ts';
import { natsWrapper } from './natsWrapper.ts';
import { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } from './config.ts';
import { OrderCreatedListener, OrderCancelledListener } from './nats/listener.ts';

const port = 3000;

await mongoose.connect('mongodb://ticket-mongo-srv:27017');

await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL)
natsWrapper.client.on('close', () => {
  console.log('exit nats!');
  process.exit();
});
process.on('SIGINT', () => natsWrapper.client.close());
process.on('SIGTERM', () => natsWrapper.client.close());

new OrderCreatedListener(natsWrapper.client).listen();
new OrderCancelledListener(natsWrapper.client).listen();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
