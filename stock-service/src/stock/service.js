const { StockQuoteNotFound } = require("./errors")

const StockService = ({ stockProvider }) => ({
  getQuote: async (symbol) => {
    const foundQuote = await stockProvider.fetchQuote(symbol)

    if(!foundQuote){
      return StockQuoteNotFound.error(symbol)
    }

    return foundQuote
  }
})

module.exports = { StockService }
