const { StockModule } = require("#stock/module")
const { adaptController } = require("./config/express-adapter")

const setupRoutes = (app) => {
  app.get("/quote", adaptController(StockModule.getQuote) )
  app.get("/health-check", (_, res) => res.status(200).json({message: "app is running"}) )
}

module.exports = { setupRoutes }
