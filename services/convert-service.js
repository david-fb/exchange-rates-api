const boom = require('@hapi/boom');
const LatestService = require('./latest-service');
const latestService = new LatestService();

class ConvertService {
  async convert(amount, from, to) {
    const query = from + ',' + to;
    const { timestamp, rates } = await latestService.filter(query);

    let response = this.calculateExchangeRate(rates, from, to, amount);

    return {
      timestamp,
      amount,
      from,
      to,
      ...response,
    };
  }

  calculateExchangeRate(rates, from, to, amount = 1) {
    amount = Number(amount);
    if (Number.isNaN(amount)) {
      throw boom.badData('amount must be of type number');
    }

    if (!rates[from] || !rates[to]) {
      throw boom.badData('exchange rate type not supported');
    }

    let result = 0;

    if (to === 'USD') {
      result = amount / rates[from];
    } else if (from === 'USD') {
      result = amount * rates[to];
    } else {
      let fromUSDValue = amount / rates[from];
      result = fromUSDValue * rates[to];
    }

    const unitFrom = Number((result / amount).toFixed(5));
    const unitTo = Number((amount / result).toFixed(5));

    return {
      unitTo,
      unitFrom,
      result: Number(result.toFixed(2)),
    };
  }
}

module.exports = ConvertService;
