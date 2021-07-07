const express = require('express');
const app = express();
const PORT = 5000;
const socket = require('./socket/socket');

app.use('/build', express.static('dist'));

app.listen(PORT, () => console.log('Listening on PORT ' + PORT));

socket.init(5001);
