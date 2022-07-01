const { config } = require('../config');
const axios = require('axios');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const boom = require('@hapi/boom');
const ConvertService = require('./convert-service');
const convertService = new ConvertService();

dayjs.extend(customParseFormat);

class HistoricalService {
  async from(date, symbol1, symbol2) {
    const symbols = symbol1 + ',' + symbol2;

    if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) {
      throw boom.badData(
        'Historical API queries require a valid date in the format `YYYY-MM-DD`'
      );
    }

    const { data } = await axios(
      `${config.API}/historical/${date}.json?app_id=${config.appID}&symbols=${symbols}`
    );

    const { timestamp, rates } = data;

    const response = convertService.calculateExchangeRate(
      rates,
      symbol1,
      symbol2
    );
    delete response.result;

    return {
      timestamp,
      symbols: [symbol1, symbol2],
      ...response,
    };
  }
}

module.exports = HistoricalService;
