const { User } = require("#external/database/mongoose/models/auth/user");

const UserRepository = () => {
  return {
    create: async (user) => {
      const userDoc = await User.create(user);
      if(!userDoc){
        return null
      }
      return userDoc.toObject();
    },
    findByEmail: async (email) => {
      const userDoc = await User.findOne({ email }, {});
      if(!userDoc){
        return null
      }
      return userDoc.toObject();
    },
    exists: async (email) => User.exists({ email }),
  };
};

module.exports = { UserRepository };
