import Queue from 'bull';
import { REDIS_HOST } from './config.ts';
import { ExpirationCompletePublisher } from './nats/publisher.ts';
import { natsWrapper } from './natsWrapper.ts';

const expirationQueue = new Queue<{ orderId: string }>('order:expiration', {
  redis: {
    host: REDIS_HOST
  }
});

expirationQueue.process((job) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    id: job.data.orderId
  });
});

export { expirationQueue }
