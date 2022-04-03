const { Router } = require("express");
const { adaptMiddleware, adaptController } = require("../../config/express-adapter");
const { ensureAuthorization } = require("#modules/auth/middlewares/ensure-authorization/index");
const { ensureOnlyAdminAccess } = require("#modules/auth/middlewares/ensure-only-admin-access/index");
const { stockModule } = require("#modules/stock/module");

function setupStockRoutes(app) {
  const router = Router();

  router.use(adaptMiddleware(ensureAuthorization))

  router.get("/quotes", adaptController(stockModule.getQuote));
  router.get("/history", adaptController(stockModule.getUserQuoteHistory));
  router.get("/stats", adaptMiddleware(ensureOnlyAdminAccess), adaptController(stockModule.getMostRequestedStocks));

  app.use("/stock", router);
}

module.exports = {
  setupStockRoutes,
};
