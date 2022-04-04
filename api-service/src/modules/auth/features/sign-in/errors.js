const { errorOf } = require("#core/error");

const SignInError = errorOf(
  "Auth.SignInError",
  () => "wrong email or password"
);

module.exports = { SignInError };
