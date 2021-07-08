/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;
const socket = require('./socket/socket');
const userRouter = require('./routes/userRouter');
const yelpRouter = require('./routes/yelpRouter');
const roomRouter = require('./routes/roomRouter');

app.use('/build', express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRouter);
app.use('/yelp', yelpRouter);
app.use('/room', roomRouter);

app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    message: 'An error occurred',
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(500).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

socket.init(5001);
