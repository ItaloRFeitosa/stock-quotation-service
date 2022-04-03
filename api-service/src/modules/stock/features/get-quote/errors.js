const { errorOf } = require("#core/error");

const QuoteNotFound = errorOf(
  "Stock.QuoteNotFound",
  (symbol) => `stock quote with symbol='${symbol}' not found`
);

module.exports = { QuoteNotFound }
