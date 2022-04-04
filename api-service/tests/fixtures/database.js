const {
  createConnection,
  isConnected,
  disconnect,
} = require("#external/database/mongoose/connection");
const { User } = require("#external/database/mongoose/models/auth/user");
const { QuoteRecord } = require("#external/database/mongoose/models/stock/quote-record");
const { StockStats } = require("#external/database/mongoose/models/stock/stock-stats");
const { hash } = require("#external/security/bcrypt");

const Database = () => {
  return {
    connect: async () => !isConnected() && (await createConnection()),
    addUser: async ({ email, password, role }) => {
      const userDoc = await User.create({
        email,
        role,
        password: await hash(password),
      });

      return userDoc.toObject();
    },
    existsUser: (email) => User.exists({ email }),
    teardown: async () => {
      await QuoteRecord.deleteMany({})
      await StockStats.deleteMany({})
      await User.deleteMany({});
      await disconnect();
    },
  };
};

module.exports = { Database };
