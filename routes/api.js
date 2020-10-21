const express = require('express');
const debug = require('debug')('easy-chart:api');
const moment = require('moment');
const DataEntries = require('../models/dataEntry');

const router = express.Router();

/** GET home page. */
router.get('/', async (req, res) => {
  res.send(`Testing default endpoint.`);
});

/** Retrieve data from a given date. */
router.get('/data/:date', async (req, res, next) => {
  try {
    const { date = moment() } = req.params;
    const startDate = moment(date, 'YYYY-MM-DD').startOf('day');
    const endDate = startDate.clone().endOf('day');
    // const endDate = moment(req.query.to, 'YYYY-MM-DD').startOf('day');
    debug(`start date as moment: ${startDate}`);
    debug(`end date as moment: ${endDate}`);
    // const endDatePlusOne = endDate.clone().add(1, 'day');

    const data = await DataEntries.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
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
router.post('/data', async (req, res, next) => {
  try {
    const { body } = req;
    const postedData = await DataEntries.create(body);
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
    const updatedData = await DataEntries.findByIdAndUpdate({ _id: id }, body, {
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
    const deletedData = await DataEntries.findByIdAndDelete({ _id: id });
    debug(`Deleted data: `, deletedData);
    res.status(200).send(deletedData);
  } catch (error) {
    debug(`Caught error in delete route: ${error}`);
    res.status(400);
    next(error);
  }
});

module.exports = router;
