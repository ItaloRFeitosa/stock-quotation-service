const { CryptoProvider } = require("#modules/auth/providers/crypto-provider");
const { UserRepository } = require("#modules/auth/repositories/user-repository");
const { SignUpController } = require("./controller");
const { SignUpUseCase } = require("./use-case");
const { SignUpValidation } = require("./validation");

const signUp = SignUpController({
  usecase: SignUpUseCase({
    userRepository: UserRepository(),
    cryptoProvider: CryptoProvider(),
  }),
  validation: SignUpValidation(),
});

module.exports = { signUp };
