const { Router } = require("express");
const { setupSwagger } = require("../../config/swagger");
const { setupAuthRoutes } = require("./auth");
const { setupStockRoutes } = require("./stock");

function setupRoutesV1(app) {
  const router = Router();
  setupAuthRoutes(router);
  setupStockRoutes(router);

  router.get("/health-check", (_, res) =>
    res.status(200).json({ message: "app is running" })
  );

  setupSwagger(router)
  app.use("/v1", router);
}

module.exports = {
  setupRoutesV1,
};
