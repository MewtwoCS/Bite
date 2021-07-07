// import database file
const db = require('../model/FoodPlaceModel');

// object that we add methods to
const foodPlaceController = {};

// add food place
foodPlaceController.postFoodPlace = (req, res, next) => {
    // client sends item
    const { foodPlace } = req.body;
    console.log('req.body =====', req.body);
    // query 
    // return created row - res.locals is set to data that's returned
    const query = 'INSERT INTO "User" (user_id, participantsId, historyId) VALUES (value1, value2, ...) RETURNING *';

    const parameters = [foodPlace];
  
    // pass in query and parameters
    // promise
    db.query(query, parameters)
      .then((data) => {
        res.locals.results = data.rows;
        return next();
      }).catch((err) => next(err));
  };






modeul.exports = FoodPlaceController;




