const express = require('express');
const router = express.Router();
const ConvertService = require('../services/convert-service');
const service = new ConvertService();

router.get('/:amount/:from/:to', async (req, res, next) => {
  try {
    let { amount, from, to } = req.params;
    const result = await service.convert(amount, from, to);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
