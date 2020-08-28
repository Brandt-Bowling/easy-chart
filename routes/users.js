const express = require('express');
const debug = require('debug')('easy-chart:users');
const router = express.Router();
const Users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/** Retrieve data from a given user. */
router.get('/users/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Users.findById(userId);
    debug(user);
    res.send(user);
  } catch (error) {
    debug(`Caught error retrieving user data: ${error}`);
    res.status(400);
    next(error);
  }
});

/** Create a User */
router.post('/users', async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    debug(`User created: `, user);
    res.status(201).send(user);
  } catch (error) {
    res.status(422);
    next(error);
  }
});

module.exports = router;
