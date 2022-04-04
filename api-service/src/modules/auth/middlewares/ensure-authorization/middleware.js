const { Unauthorized } = require("#core/http/response");
const { isError } = require("#core/error");
const { EnsureAuthorizationError } = require("./errors");

const EnsureAuthorizationMiddleware = ({ jwtProvider }) => ({
  handle: async (request) => {
    const auth = request.headers["Authorization"] || request.headers["authorization"];

    if (!auth) {
      return Unauthorized(EnsureAuthorizationError.error("missing authorization header"));
    }

    const [bearer, token] = auth.split(" ");

    const isWrongFormat = !bearer || bearer != "Bearer" || !token;

    if (isWrongFormat) {
      return Unauthorized(EnsureAuthorizationError.error("should be format 'Bearer {{token}}'"));
    }

    const userOrError = await jwtProvider.verifyAndDecodeUser(token);

    if (isError(userOrError)) {
      return Unauthorized(EnsureAuthorizationError.error("invalid token"));
    }

    const hasUserInfo = !!userOrError.id && !!userOrError.role;

    if (!hasUserInfo) {
      return Unauthorized(EnsureAuthorizationError.error("invalid token"));
    }

    request.user = userOrError;
  },
});

module.exports = { EnsureAuthorizationMiddleware };
