const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.static('dist'));

app.listen(PORT, () => console.log('Listening on PORT ' + PORT));
