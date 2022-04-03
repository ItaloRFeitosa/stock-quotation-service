const { errorOf } = require("#core/error");

const EnsureAuthorizationError = errorOf("Auth.EnsureAuthorizationError")

module.exports = { EnsureAuthorizationError }
