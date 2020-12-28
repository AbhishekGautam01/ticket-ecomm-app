import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';
import { singOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // to make sure express is aware it is behind proxy ingress
app.use(json());
app.use(
  cookieSession({
    signed: false, //to disable encyption
    secure: process.env.NODE_ENV !== 'test', //for https
  })
);

app.use(currentUserRouter);
app.use(singOutRouter);
app.use(signUpRouter);
app.use(signInRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
