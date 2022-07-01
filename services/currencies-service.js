const { config } = require('../config');
const axios = require('axios');

class CurrenciesService {
  async currencies() {
    const { data } = await axios(
      `${config.API}/currencies.json?app_id=${config.appID}`
    );
    return data;
  }

  async currenciesAndAlternative() {
    const { data } = await axios(
      `${config.API}/currencies.json?show_alternative=true&app_id=${config.appID}`
    );
    return data;
  }
}

module.exports = CurrenciesService;
