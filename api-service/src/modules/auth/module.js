const { signIn } = require("./features/sign-in");
const { signUp } = require("./features/sign-up");

const authModule = {
  signIn,
  signUp,
};

module.exports = { authModule };
