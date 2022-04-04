const request = require("supertest");
const app = require("#application/app");

const stockRoutes = {
  getQuote: async (params, token) => {
    const query = new URLSearchParams(params)
    return await request(app)
      .get(`/v1/stock/quotes?${query.toString()}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
  },

  getHistory: async ( token) => {
    return await request(app)
      .get('/v1/stock/history')
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
  },

  getMostRequested: async (token) => {
    return await request(app)
      .get('/v1/stock/stats')
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
  },
};

module.exports = { stockRoutes };
