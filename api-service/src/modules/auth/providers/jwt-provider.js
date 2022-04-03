const { isError } = require("#core/error");
const { sign, verifyAndDecode } = require("#external/security/jwt/index");

const JwtProvider = () => ({
  signUser: (user) => {
    const { id, role } = user
    return sign({ user: { id, role }})
  },
  verifyAndDecodeUser: async (jwt) => {
    const decodedOrError = await verifyAndDecode(jwt).catch(err => err)
    if(isError(decodedOrError)){
      return decodedOrError
    }

    return decodedOrError.user
  },
});

module.exports = { JwtProvider };
