const { Unauthorized, Forbidden } = require("#core/http/response");
const { isAdmin } = require("#modules/auth/domain/user-role");
const { OnlyAdminError } = require("./errors");

const EnsureOnlyAdminAccessMiddleware = () => ({
  handle: async (request) => {
    if(!request.user){
      return Unauthorized()
    }

    if(!isAdmin(request.user)){
      return Forbidden(OnlyAdminError.error("restricted to admin users"))
    }
  },
});

module.exports = { EnsureOnlyAdminAccessMiddleware };
