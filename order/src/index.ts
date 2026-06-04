import mongoose from 'mongoose';
import { app } from './app.ts';
import { natsWrapper } from './natsWrapper.ts';
import { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } from './config.ts';

const port = 3000;

await mongoose.connect('mongodb://order-mongo-srv:27017');

await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL)
natsWrapper.client.on('close', () => {
  console.log('exit nats!');
  process.exit();
});
process.on('SIGINT', () => natsWrapper.client.close());
process.on('SIGTERM', () => natsWrapper.client.close());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
