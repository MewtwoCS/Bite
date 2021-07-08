/* eslint-disable no-console */
const sock = {};

const users = [];
const votes = [];

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

sock.init = (PORT) => {
  const io = require('socket.io')(PORT, {
    cors: {
      origin: ['http://localhost:8080'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`SOCKET.IO --> ${socket.id}: connected`);

    socket.on('create', (clientId, username, room) => {
      users.push({
        clientId,
        username,
        room,
        hasVoted: false,
      });
      socket.join(room);
      io.to(room).emit('roomData', users);
    });

    socket.on('start-game', (room) => {
      io.to(room).emit('begin-game');
    });

    socket.on('submit-vote', (room, id, voteArr) => {
      if (votes.length === 0) votes.push(...voteArr);
      else {
        for (let i = 0; i < voteArr.length; i++) {
          votes[i] += voteArr[i];
        }
      }

      const voter = users.find((user) => {
        if (user.clientId === id) {
          user.hasVoted = true;
          return user;
        }
        return null;
      });

      const participants = getUsersInRoom(room);
      const voters = participants.filter((user) => user.hasVoted);
      if (voters.length === participants.length) {
        io.to(room).emit('all-votes-in', votes);
      } else {
        io.to(room).emit('submitted', voter);
      }
    });

    // socket.on('disconnect', () => {
    //   io.to(user.room).emit('roomData', {
    //     room: user.room,
    //     users: getUsersInRoom(user.room),
    //   });
    // });
  });
};

module.exports = sock;
