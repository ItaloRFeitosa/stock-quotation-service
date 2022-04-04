const { User } = require("#modules/auth/domain/user");
const { UserAlreadyExists } = require("./errors");

const SignUpUseCase = ({ userRepository, cryptoProvider }) => ({
  perform: async ({ email, role }) => {
    const userAlreadyExists = await userRepository.exists(email);
    if (userAlreadyExists) {
      return UserAlreadyExists.error(email);
    }

    const newUser = User({ email, role })

    const userWithHashedPassword = await cryptoProvider.hashPassword(newUser);

    await userRepository.create(userWithHashedPassword);

    return newUser;
  },
});

module.exports = { SignUpUseCase };
