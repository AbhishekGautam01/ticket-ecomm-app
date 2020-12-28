import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
  res.send({})
})

app.listen(3000, () => {
  console.log('[Auth-Service]: Listening on Port: 3000');
});
