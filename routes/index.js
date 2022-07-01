const express = require('express');
const CurrenciesRouter = require('./currencies-router');
const LatestRouter = require('./latest-router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/currencies', CurrenciesRouter);
  router.use('/latest', LatestRouter);
}

module.exports = routerApi;
