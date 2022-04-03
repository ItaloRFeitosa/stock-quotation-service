const { Router } = require("express");
const { adaptController } = require("../../config/express-adapter");
const { authModule } = require("#modules/auth/module");

function setupAuthRoutes(app) {
  const router = Router();

  router.post("/sign-in", adaptController(authModule.signIn));

  router.post("/sign-up", adaptController(authModule.signUp));

  app.use("/auth", router);
}

module.exports = {
  setupAuthRoutes,
};
