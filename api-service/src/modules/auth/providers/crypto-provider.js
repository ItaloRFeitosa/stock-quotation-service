const { hash, compare } = require("#external/security/bcrypt");
const { User } = require("../domain/user");

const CryptoProvider = () => ({
  hashPassword: async (user) => {
    return User({ ...user, password: await hash(user.password) });
  },

  checkPassword: (user, password) => {
    return compare(password, user.password);
  },
});

module.exports = { CryptoProvider };
