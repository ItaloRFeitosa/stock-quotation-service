const axios = require("axios");

const stockServiceUrl =
  process.env.STOCK_SERVICE_URL || "http://localhost:3002";

const httpClient = axios.create({
  baseURL: stockServiceUrl,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  validateStatus: (status) => status < 500 // only throw error to status codes >= 500
});

module.exports = { httpClient }
