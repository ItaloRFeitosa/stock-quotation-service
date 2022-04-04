const errorResponseJsonSchema = (errorName) =>({
  properties: {
    error: {
      type: "object",
      properties: {
        name: {
          type: "string",
          const: errorName
        },
        reason: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["name", "reason"],
    },
  },
  required: ["error"],
});

module.exports = { errorResponseJsonSchema };
