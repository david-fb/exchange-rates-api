const express = require('express');
const CurrenciesRouter = require('./currencies-router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/currencies', CurrenciesRouter);
}

module.exports = routerApi;
