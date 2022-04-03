const { NotFound, Ok, UnprocessedEntity } = require("#core/http/response")
const { ValidationError } = require("#core/validation")
const { StockQuoteNotFound } = require("./errors")

const StockController = ({ service }) => ({
  getQuote: async ({ query }) => {
    if(!query.symbol){
      return UnprocessedEntity(ValidationError.error("query.symbol is required"))
    }
    const quoteOrError = await service.getQuote(query.symbol)
    if(StockQuoteNotFound.isSameOf(quoteOrError)){
      return NotFound(quoteOrError)
    }

    return Ok(quoteOrError)
  }
})

module.exports = { StockController }
