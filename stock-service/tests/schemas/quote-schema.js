const quoteJsonSchema = {
  properties: {
    symbol: { type: "string" },
    date: { type: "string" },
    time: { type: ["string", "number"] },
    open: { type: "number" },
    high: { type: "number" },
    low: { type: "number" },
    close: { type: "number" },
    volume: { type: "number" },
    name: { type: "string" },
  },
  required: [
    "symbol",
    "date",
    "time",
    "open",
    "high",
    "low",
    "close",
    "volume",
    "name",
  ],
};

module.exports = { quoteJsonSchema }
