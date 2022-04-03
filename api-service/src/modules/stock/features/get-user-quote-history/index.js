const { StockRepository } = require("../../repositories/stock-repository");
const { GetUserQuoteHistoryController } = require("./controller");
const { GetUserQuoteHistoryUseCase } = require("./use-case");
const { GetUserQuoteHistoryValidation } = require("./validation");

const getUserQuoteHistory = GetUserQuoteHistoryController({
  usecase: GetUserQuoteHistoryUseCase({ stockRepository: StockRepository() }),
  validation: GetUserQuoteHistoryValidation(),
});

module.exports = { getUserQuoteHistory };
