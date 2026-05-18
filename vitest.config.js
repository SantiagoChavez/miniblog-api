const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  test: {
    globals: true,
    environment: 'node'
  }
};