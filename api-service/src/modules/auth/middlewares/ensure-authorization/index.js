const { JwtProvider } = require("../../providers/jwt-provider");
const { EnsureAuthorizationMiddleware } = require("./middleware");

const ensureAuthorization = EnsureAuthorizationMiddleware({ jwtProvider: JwtProvider()})

module.exports = { ensureAuthorization }
