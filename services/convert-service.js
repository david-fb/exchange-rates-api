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
      ...response,
    };
  }

  calculateExchangeRate(rates, from, to, amount = 1) {
    amount = Number(amount);
    from = from.toUpperCase();
    to = to.toUpperCase();

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

    const unitFrom = this.#formarDecimals(result / amount);
    const unitTo = this.#formarDecimals(amount / result);

    return {
      from,
      unitTo,
      to,
      unitFrom,
      result: this.#formarDecimals(result),
    };
  }

  #formarDecimals(number) {
    if (number.toFixed(0) === '0') {
      return Number(number.toFixed(5));
    } else {
      return Number(number.toFixed(2));
    }
  }
}

module.exports = ConvertService;
