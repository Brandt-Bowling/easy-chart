const express = require('express');
const debug = require('debug')('easy-chart:api');
const moment = require('moment');
const userStats = require('../models/dataEntry');

const router = express.Router();

/** GET home page. */
router.get('/', (req, res) => {
  res.send('Testing');
});

/** Retrieve data from a given date. */
router.get('/data', async (req, res, next) => {
  try {
    const date = moment.utc(req.query.date, 'YYYY-MM-DD').startOf('day');
    debug(`date as moment: ${date}`);
    const datePlusOne = date.clone().add(1, 'day');
    debug(`date plus one: ${datePlusOne}`);

    const data = await userStats.find({
      created_at: {
        $gte: date,
        $lt: datePlusOne,
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

/** Create and save document using request body. */
router.post('/data', (req, res, next) => {
  userStats
    .create(req.body)
    .then(document => {
      debug('Data Entered: ', req.body);
      res.send({ data: document });
    })
    .catch(err => {
      res.status(422);
      next(err);
    });
});

module.exports = router;
