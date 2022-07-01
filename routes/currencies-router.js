const express = require('express');

const router = express.Router();
const CurrenciesService = require('../services/currencies-service');
const service = new CurrenciesService();

router.get('/', async (req, res, next) => {
  try {
    let showAlternative = req.query.show_alternative;
    if (showAlternative === 'true') {
      const currenciesAndAlternative = await service.currenciesAndAlternative();
      return res.json(currenciesAndAlternative);
    }
    const currencies = await service.currencies();
    res.json(currencies);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
