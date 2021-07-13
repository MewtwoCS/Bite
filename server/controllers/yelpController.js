const axios = require('axios');
require('dotenv').config();

const Authorization = `Bearer ${process.env.API_KEY}`;

const yelpController = {};

yelpController.getRestaurants = (req, res, next) => {
	// console.log(req.params.location);
	const yelpApi = `https://api.yelp.com/v3/businesses/search?location=${req.params.location}&limit=10`;
	axios
		.get(`${yelpApi}`, {
			headers: {
				Authorization,
			},
		})
		.then((response) => {
			res.locals.kyung = response.data.businesses;
			return next();
		});
};

module.exports = yelpController;
