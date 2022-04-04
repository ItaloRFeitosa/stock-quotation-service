const crypto = require("crypto");

const UserPassword = () => {
  return crypto.randomBytes(16).toString("hex");
};

module.exports = { UserPassword };
