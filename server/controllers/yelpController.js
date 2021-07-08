const axios = require('axios');
require('dotenv').config();

const yelpApi =
  'https://api.yelp.com/v3/businesses/search?location=Koreatown&limit=10';
const Authorization = `Bearer ${process.env.API_KEY}`;

const yelpController = {};

yelpController.getRestaurants = (req, res, next) => {
  axios
    .get(`${yelpApi}`, {
      headers: {
        Authorization: Authorization,
      },
    })
    .then((response) => {
      res.locals.kyung = response.data.businesses;
      return next();
    });
};

module.exports = yelpController;
