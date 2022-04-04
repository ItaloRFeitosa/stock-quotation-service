const app = require('express')();

const { setupErrorMiddleware } = require('./config/error');
const { setupConfigMiddlewares } = require('./config/middlewares');
const { setupSwagger } = require('./config/swagger');
const { setupRoutes } = require('./routes');

setupConfigMiddlewares(app)

setupRoutes(app)

setupSwagger(app)

setupErrorMiddleware(app)

module.exports = app;
