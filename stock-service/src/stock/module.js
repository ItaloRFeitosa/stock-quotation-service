const { StockProvider } = require("#external/stock-provider/index");
const { StockController } = require("./controller");
const { StockService } = require("./service");

const StockModule = StockController({
  service: StockService({ stockProvider: StockProvider() }),
});

module.exports = { StockModule };
