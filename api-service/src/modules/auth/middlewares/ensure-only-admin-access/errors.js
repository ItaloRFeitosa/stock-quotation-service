const { errorOf } = require("#core/error");

const OnlyAdminError = errorOf("Auth.OnlyAdminError")

module.exports = { OnlyAdminError }
