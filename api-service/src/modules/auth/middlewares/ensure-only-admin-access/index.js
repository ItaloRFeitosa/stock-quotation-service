const { EnsureOnlyAdminAccessMiddleware } = require("./middleware");

const ensureOnlyAdminAccess = EnsureOnlyAdminAccessMiddleware()

module.exports = { ensureOnlyAdminAccess }
