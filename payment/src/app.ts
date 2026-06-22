import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@doffy-gittix/common';
import { COOKIE_NAME, COOKIE_KEY, JWT_KEY, STRIPE_KEY } from './config.ts';
import { createRouter } from './routes/create.ts';

const { json } = bodyParser;
const app = express();
app.set('trust proxy', true);
app.use((_req, _res, next) => {
  if (!COOKIE_KEY || !JWT_KEY || !STRIPE_KEY) {
    throw new Error('No key available');
  }
  next();
});
app.use(json());
app.use(
  cookieSession({
    name: COOKIE_NAME,
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    keys: [COOKIE_KEY!],
  }),
);
app.use(createRouter);
app.all('*any', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
