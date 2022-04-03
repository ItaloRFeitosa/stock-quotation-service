const { httpClient } = require("#external/stock-service/http-client")
const { QuoteRecord } = require("../domain/quote-record")

const StockProvider = () => {
  return {
    getQuote: async ({symbol, traceId}) => {
      const response = await httpClient.get(`/quote?symbol=${symbol}`, { headers: { "trace-id": traceId}})

      if(response.status >= 400){
        return null
      }

      return QuoteRecord(response.data)
    }
  }
}

module.exports = { StockProvider }
