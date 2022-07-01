const { config } = require('../config');
const axios = require('axios');

class LatestService {
  async all() {
    const { data } = await axios(
      `${config.API}/latest.json?app_id=${config.appID}`
    );

    return this.#formatData(data);
  }

  async filter(query) {
    const { data } = await axios(
      `${config.API}/latest.json?app_id=${config.appID}&symbols=${query}`
    );

    return this.#formatData(data);
  }

  #formatData(data) {
    const { timestamp, base, rates } = data;
    const body = {
      timestamp,
      base,
      rates,
    };
    return body;
  }
}

module.exports = LatestService;
