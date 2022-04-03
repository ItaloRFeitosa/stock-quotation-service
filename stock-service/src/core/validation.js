const { errorOf } = require("./error");

const ValidationError = errorOf("ValidationError");

module.exports = { ValidationError };
