const { errorOf } = require("#core/error");

const StockQuoteNotFound = errorOf(
  "StockQuoteNotFound",
  (symbol) => `stock quote with symbol='${symbol}' not found`
);

module.exports = { StockQuoteNotFound };
