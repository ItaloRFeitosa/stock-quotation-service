const app = require('express')();

const { setupErrorMiddleware } = require('./config/error');
const { setupConfigMiddlewares } = require('./config/middlewares');
const { setupRoutesV1 } = require('./routes/v1');

setupConfigMiddlewares(app)

setupRoutesV1(app)

setupErrorMiddleware(app)

module.exports = app;
