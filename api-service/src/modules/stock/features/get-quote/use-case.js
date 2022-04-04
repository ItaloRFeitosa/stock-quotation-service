const { QuoteRecord } = require("#modules/stock/domain/quote-record")
const { QuoteNotFound } = require("./errors")

const GetQuoteUseCase = ({ stockProvider, stockRepository }) => ({
  perform: async ({ traceId, userId, symbol }) => {
    const quoteFound = await stockProvider.getQuote({ traceId, symbol })

    if(!quoteFound){
      return QuoteNotFound.error(symbol)
    }

    const newQuoteRecord = QuoteRecord({ ...quoteFound, userId })

    await stockRepository.saveQuoteRecord(newQuoteRecord)

    return quoteFound
  }
})

module.exports = { GetQuoteUseCase }
