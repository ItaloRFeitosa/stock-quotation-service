const quoteJsonSchema = {
  properties: {
    symbol: { type: "string" },
    open: { type: "number" },
    high: { type: "number" },
    low: { type: "number" },
    close: { type: "number" },
    name: { type: "string" },
  },
  required: [
    "symbol",
    "open",
    "high",
    "low",
    "close",
    "name",
  ],
};

const quoteHistoryJsonSchema = {
  properties: {
    cursor: {
      type: ["string", "null"]
    },
    count: {
      type: "number"
    },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ...quoteJsonSchema.properties,
          createdAt: {
            type: "string",
            format: "date-time"
          },
          id: {
            type: "string"
          }
        },
        required: [...quoteJsonSchema.required, "createdAt", "id"]
      }
    }
  },
  required: ["data", "count", "cursor"]
}

module.exports = { quoteJsonSchema, quoteHistoryJsonSchema }
