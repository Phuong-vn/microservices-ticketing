import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user.ts';
import { signinRouter } from './routes/signin.ts';
import { signoutRouter } from './routes/signout.ts';
import { signupRouter } from './routes/signup.ts';
import { NotFoundError } from './errors/index.ts';
import { errorHandler } from './middleware/error-handler.ts';
import { COOKIE_NAME, COOKIE_KEY, JWT_KEY } from './config.ts';

const { json } = bodyParser;
const app = express();
app.set('trust proxy', true);
app.use((_req, _res, next) => {
  if (!COOKIE_KEY || !JWT_KEY) {
    throw new Error('No key available');
  }
  next();
});
app.use(json());
app.use(
  cookieSession({
    name: COOKIE_NAME,
    signed: false,
    secure: true,
    keys: [COOKIE_KEY!],
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

export { app };
