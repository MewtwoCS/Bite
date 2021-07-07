/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const db = require('../models/FoodPlaceModel');

const saltRounds = 10;

const userController = {};

userController.bcryptPassword = (req, res, next) => {
  console.log('req.body', req.body);

  // deconstructs the passwod from req.body to bcrypt
  const { password } = req.body;
  // console.log('hitting bcrypt controller', password)
  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      res.locals.password = hash;
      return next();
    })
    .catch((err) => next({ log: `Error in userController.bcrypt: ${err}` }));
};

userController.addNewUser = (req, res, next) => {
  console.log('hitting addNewUser controller');

  // deconstructs username and password
  const { password } = res.locals;
  const { username } = req.body;
  console.log('user', username);
  console.log('pass', password);
  // create params array to reference in query
  const params = [username, password];
  const query = `
  INSERT INTO users(username, password)
  VALUES ($1, $2);`;

  // query into table
  db.query(query, params)
    .then(() => {
      console.log('inside query');
      return next();
    })
    .catch((err) => next({ log: `Error in userController.addNewUser: ${err}` }));
};

userController.loginCheck = (req, res, next) => {
  // take username and password from req.body
  const { username, password } = req.body;
  const query = `
    SELECT password
    FROM users
    WHERE username = '${username}'`;

  db.query(query)
    .then((result) => {
      if (!result.rows.length) {
        // console.log('user does not exist')
        res.locals.user = false;
        return next({ log: 'Incorrect username/password', message: 'Incorrect username/password' });
      }
      bcrypt.compare(password, result.rows[0].password, (err, result) => {
        if (err) return next({ log: `Error in userController.loginCheck: ${err}` });
        if (!result) return next({ log: 'Incorrect username/password', message: 'Incorrect username/password' });
        return next();
      });
    })
    .catch((err) => next({ log: `Error in userController.loginCheck: ${err}`, message: 'Incorrect username/password' }));
};

module.exports = userController;
