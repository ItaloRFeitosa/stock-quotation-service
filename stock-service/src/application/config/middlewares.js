const crypto = require("crypto")
const express = require('express');
const logger = require('morgan');

function setupConfigMiddlewares(app) {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use((req, _, next) => {
    req.traceId = crypto.randomUUID()

    next()
  })
}

module.exports = {
  setupConfigMiddlewares
}
