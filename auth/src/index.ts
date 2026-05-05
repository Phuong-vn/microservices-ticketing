import mongoose from 'mongoose';
import { app } from './app.ts';

const port = 3000;

await mongoose.connect('mongodb://auth-mongo-srv:27017');

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
