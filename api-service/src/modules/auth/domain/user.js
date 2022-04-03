const { UserPassword } = require("./user-password");

// TODO: turn in a rich domain model
const User = ({ email, role, password }) => Object.freeze({
  email,
  role,
  password: password || UserPassword()
})

module.exports = { User }
