const express = require('express');
const debug = require('debug')('easy-chart:api');
const moment = require('moment');
const userStats = require('../models/dataEntry');

const router = express.Router();

/** GET home page. */
router.get('/', async (req, res) => {
  res.send(`Testing default endpoint.`);
});

/** Retrieve data from a given date. */
router.get('/data', async (req, res, next) => {
  try {
    const startDate = moment(req.query.from, 'YYYY-MM-DD').startOf('day');
    const endDate = moment(req.query.to, 'YYYY-MM-DD').startOf('day');
    debug(`start date as moment: ${startDate}`);
    debug(`end date as moment: ${endDate}`);
    const endDatePlusOne = endDate.clone().add(1, 'day');

    const data = await userStats.find({
      created_at: {
        $gte: startDate,
        $lt: endDatePlusOne,
      },
    });
    debug(data);

    res.send(data);
  } catch (error) {
    debug(`Caught error in GET: ${error}`);
    res.status(400);
    next(error);
  }
});

/** Retrieve data from a given user. */
router.get('/data/users/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userData = await userStats.find({ 'user.firstName': userId });
    debug(userData);
    res.send('testing');
  } catch (error) {
    debug(`Caught error retrieving user data: ${error}`);
    res.status(400);
    next(error);
  }
});

/** Create and save document using request body. */
router.post('/data', async (req, res, next) => {
  try {
    const { body } = req;
    const postedData = await userStats.create(body);
    debug(`Data Entered: `, body);
    res.status(201).send({ data: postedData });
  } catch (error) {
    res.status(422);
    next(error);
  }
});

router.put('/data/:id', async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    debug(`Updating id: ${id}, with data: `, body);
    const updatedData = await userStats.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    debug(`Updated data returned: `, updatedData);
    res.status(200).send(updatedData);
  } catch (error) {
    debug(`Caught error in put route: ${error}`);
    res.status(400);
    next(error);
  }
});

router.delete('/data/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedData = await userStats.findByIdAndDelete({ _id: id });
    debug(`Deleted data: `, deletedData);
    res.status(200).send(deletedData);
  } catch (error) {
    debug(`Caught error in delete route: ${error}`);
    res.status(400);
    next(error);
  }
});

module.exports = router;
