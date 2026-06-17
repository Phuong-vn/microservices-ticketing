import { natsWrapper } from './natsWrapper.ts';
import { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } from './config.ts';

await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL)
natsWrapper.client.on('close', () => {
  console.log('exit nats!');
  process.exit();
});
process.on('SIGINT', () => natsWrapper.client.close());
process.on('SIGTERM', () => natsWrapper.client.close());
