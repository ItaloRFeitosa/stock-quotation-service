const { CryptoProvider } = require("#modules/auth/providers/crypto-provider");
const { JwtProvider } = require("#modules/auth/providers/jwt-provider");
const { UserRepository } = require("#modules/auth/repositories/user-repository");
const { SignInController } = require("./controller");
const { SignInUseCase } = require("./use-case");
const { SignInValidation } = require("./validation");

const signIn = SignInController({
  usecase: SignInUseCase({
    userRepository: UserRepository(),
    cryptoProvider: CryptoProvider(),
    jwtProvider: JwtProvider(),
  }),
  validation: SignInValidation(),
});

module.exports = { signIn };
