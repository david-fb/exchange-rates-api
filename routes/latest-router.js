const express = require('express');
const router = express.Router();
const LatestService = require('../services/latest-service');
const service = new LatestService();

router.get('/', async (req, res, next) => {
  try {
    let symbols = req.query.symbols;
    if (symbols) {
      const data = await service.filter(symbols);
      return res.json(data);
    }
    const data = await service.all();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
