const express = require('express');
const router = express.Router();
const HistoricalService = require('../services/historical-service');
const service = new HistoricalService();

router.get('/:date/:symbol1/:symbol2', async (req, res, next) => {
  try {
    const { date, symbol1, symbol2 } = req.params;
    const response = await service.from(date, symbol1, symbol2);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
