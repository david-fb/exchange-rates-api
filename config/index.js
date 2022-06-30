require('dotenv').config();
const config = {
  port: process.env.PORT || 3000,
  appID: process.env.APP_ID,
};

module.exports = { config };
