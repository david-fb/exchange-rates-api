require('dotenv').config();
const config = {
  port: process.env.PORT || 3000,
  appID: process.env.APP_ID,
  API: process.env.EXCHANGE_RATES_PUBLIC_API,
};

module.exports = { config };
