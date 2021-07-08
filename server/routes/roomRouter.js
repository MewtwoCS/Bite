const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

const rooms = { name: {} };

router.post('/',
  (req, res) => {
    rooms[req.body.room] = req.body.room;
  });

module.exports = router;
