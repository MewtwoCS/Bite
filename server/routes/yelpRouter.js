const express = require('express');
const router = express.Router();

const yelpController = require('../controllers/yelpController');

router.get('/', yelpController.getRestaurants, (req, res) => {
  res.status(200).json(res.locals.kyung);
});

module.exports = router;
