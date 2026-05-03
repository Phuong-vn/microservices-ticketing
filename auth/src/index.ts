import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { currentUserRouter } from './routes/current-user.ts';
import { signinRouter } from './routes/signin.ts';
import { signoutRouter } from './routes/signout.ts';
import { signupRouter } from './routes/signup.ts';
import { NotFoundError } from './errors/index.ts';
import { errorHandler } from './middleware/error-handler.ts';

const app = express();
const port = 3000;
const { json } = bodyParser;

app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*any', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

await mongoose.connect('mongodb://auth-mongo-srv:27017');
console.log('connected to mongodb');

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
