const { StockRepository } = require("../../repositories/stock-repository");
const { GetMostRequestedStocksController } = require("./controller");
const { GetMostRequestedStocksUseCase } = require("./use-case");

const getMostRequestedStocks = GetMostRequestedStocksController({
  usecase: GetMostRequestedStocksUseCase({
    stockRepository: StockRepository(),
  }),
});

module.exports = { getMostRequestedStocks };
