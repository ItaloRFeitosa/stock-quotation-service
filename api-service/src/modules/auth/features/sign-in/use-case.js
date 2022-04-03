const { SignInError } = require("./errors");

const SignInUseCase = ({ userRepository, cryptoProvider, jwtProvider }) => ({
  perform: async ({ email, password }) => {
    const userFound = await userRepository.findByEmail(email);

    if (!userFound) {
      return SignInError.error();
    }

    const isPasswordMatched = await cryptoProvider.checkPassword(
      userFound,
      password
    );

    if (!isPasswordMatched) {
      return SignInError.error();
    }

    return jwtProvider.signUser(userFound);
  },
});

module.exports = {
  SignInUseCase,
};
