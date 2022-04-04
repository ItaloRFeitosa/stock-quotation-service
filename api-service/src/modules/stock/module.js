const { getMostRequestedStocks } = require("./features/get-most-requested-stocks");
const { getQuote } = require("./features/get-quote");
const { getUserQuoteHistory } = require("./features/get-user-quote-history");

const stockModule = {
  getMostRequestedStocks,
  getQuote,
  getUserQuoteHistory
};

module.exports = { stockModule };
