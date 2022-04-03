const { StockProvider } = require("../../providers/stock-provider");
const { StockRepository } = require("../../repositories/stock-repository");
const { GetQuoteController } = require("./controller");
const { GetQuoteUseCase } = require("./use-case");
const { GetQuoteValidation } = require("./validation");

const getQuote = GetQuoteController({
  usecase: GetQuoteUseCase({
    stockRepository: StockRepository(),
    stockProvider: StockProvider(),
  }),
  validation: GetQuoteValidation(),
});

module.exports = { getQuote };
