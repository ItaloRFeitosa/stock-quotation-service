const { errorOf } = require("#core/error");

const UserAlreadyExists = errorOf(
  "Auth.UserAlreadyExists",
  (email) => `user with email: ${email} already have an account`
);

module.exports = { UserAlreadyExists };
