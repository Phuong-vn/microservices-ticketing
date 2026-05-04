import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user.ts';
import { signinRouter } from './routes/signin.ts';
import { signoutRouter } from './routes/signout.ts';
import { signupRouter } from './routes/signup.ts';
import { NotFoundError } from './errors/index.ts';
import { errorHandler } from './middleware/error-handler.ts';

const { json } = bodyParser;
const port = 3000;
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    name: 'ticketing_jwt',
    signed: false,
    secure: true,
    keys: ['cookie_key'],
  }),
);
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
