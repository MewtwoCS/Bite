/* eslint-disable no-console */
const socket = {};

socket.init = (PORT) => {
  const io = require('socket.io')(PORT, {
    cors: {
      origin: ['http://localhost:8080'],
    },
  });

  io.on('connection', (socket) => {
    console.log('SOCKET.IO --> ' + socket.id + ': connected');
    socket.on('send-restaurants', (restaurants) => {
      console.log('restaurants', restaurants);
    });
  });
};

module.exports = socket;
