import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';
import { singOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(singOutRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('[Auth-Service]: Listening on Port: 3000');
});
