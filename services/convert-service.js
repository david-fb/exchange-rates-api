const boom = require('@hapi/boom');
const LatestService = require('./latest-service');
const latestService = new LatestService();

class ConvertService {
  async convert(amount, from, to) {
    amount = Number(amount);
    if (Number.isNaN(amount)) {
      throw boom.badData('amount must be of type number');
    }
    const query = from + ',' + to;
    const { timestamp, rates } = await latestService.filter(query);

    if (!rates[from] || !rates[to]) {
      throw boom.badData('exchange rate type not supported');
    }

    let response = 0;
    if (to === 'USD') {
      response = amount / rates[from];
    } else if (from === 'USD') {
      response = amount * rates[to];
    } else {
      let fromUSDValue = amount / rates[from];
      response = fromUSDValue * rates[to];
    }

    const unit = Number((response / amount).toFixed(5));

    return {
      timestamp,
      unit,
      amount,
      from,
      to,
      response: Number(response.toFixed(2)),
    };
  }
}

module.exports = ConvertService;
