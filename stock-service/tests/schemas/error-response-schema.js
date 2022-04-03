const errorResponseJsonSchema = {
  properties: {
    error: {
      type: "object",
      properties: {
        name: {
          type: "string",
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
};

module.exports = { errorResponseJsonSchema };
