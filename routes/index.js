const express = require('express');
const CurrenciesRouter = require('./currencies-router');
const LatestRouter = require('./latest-router');
const ConvertRouter = require('./convert-router');
const HistoricalRouter = require('./historical-router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/currencies', CurrenciesRouter);
  router.use('/latest', LatestRouter);
  router.use('/convert', ConvertRouter);
  router.use('/historical', HistoricalRouter);
}

module.exports = routerApi;
