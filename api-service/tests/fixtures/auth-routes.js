const request = require("supertest");
const app = require("#application/app");

const authRoutes = {
  signIn: async (params) => {
    return await request(app)
      .post("/v1/auth/sign-in")
      .send(params)
      .set("Accept", "application/json");
  },

  signUp: async (params) => {
    return await request(app)
      .post("/v1/auth/sign-up")
      .send(params)
      .set("Accept", "application/json");
  },
};

module.exports = { authRoutes };
