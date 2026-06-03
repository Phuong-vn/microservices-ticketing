import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import { app } from './app.ts';
import { natsWrapper } from './natsWrapper.ts';

const port = 3000;

await mongoose.connect('mongodb://ticket-mongo-srv:27017');
await natsWrapper.connect('ticketing', randomUUID(), 'http://nats-srv:4222')
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
