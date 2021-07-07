const socket = {};

socket.init = (PORT) => {
  const io = require('socket.io')(5001, {
    cors: {
      origin: ['http://localhost:8080'],
    },
  });

  io.on('connection', (socket) => {
    console.log('SOCKET.IO --> ' + socket.id + ': connected');
  });
};

module.exports = socket;
